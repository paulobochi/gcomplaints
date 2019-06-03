require 'acceptance_helper'

resource :Cities do
  get "/cities" do
    describe "Pagination" do
      before {
        create_list(:city, 10)
      }

      context "with default pagination" do
        example "List cities" do
          do_request

          expect(status).to eq(200)
          expect(json["cities"].length).to eq(10)
        end
      end

      context "with custom pagination" do
        parameter :page, "Page number"
        parameter :size, "Per page maximum records"

        example 'List cities with page and size' do
          do_request(page: 1, size: 5)

          expect(status).to eq(200)
          expect(json["cities"].length).to eq(5)
          expect(json["meta"]["current_page"]).to eq(1)
          expect(json["meta"]["page_size"]).to eq(5)
        end
      end
    end

    describe "Filtering" do
      let!(:pr) { create(:state, name: "Paraná") }
      let!(:sp) { create(:state, name: "São Paulo") }

      before {
        create(:city, name: "Foz do Iguaçu", state: pr)
        create(:city, name: "Cascavel", state: pr)
        create(:city, name: "Curitiba", state: pr)
        create(:city, name: "São Paulo", state: sp)
        create(:city, name: "Campinas", state: sp)
      }

      parameter :name, "Filter city by name"
      parameter :state_id, "Filter city by state"

      example "List cities filtered by name" do
        do_request(name: "foz")

        expect(status).to eq(200)
        expect(json["cities"].length).to eq(1)
      end

      example "List cities filtered by state" do
        do_request(state_id: pr.id)

        expect(status).to eq(200)
        expect(json["cities"].length).to eq(3)
      end
    end

    describe "Sorting" do
      before {
        create_list(:city, 10)
      }

      parameter :sort, "Sort cities by name asc or desc"

      example "List cities sorted by name asc" do
        do_request(sort: "name asc")

        expect(status).to eq(200)
      end
    end
  end
end