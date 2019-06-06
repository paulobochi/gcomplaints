require 'acceptance_helper'

resource :States do
  get "/states" do
    describe "Pagination" do
      before {
        create_list(:state, 10)
      }

      context "with default pagination" do
        example "List states" do
          do_request

          expect(status).to eq(200)
          expect(json["records"].length).to eq(10)
        end
      end

      context "with custom pagination" do
        parameter :page, "Page number"
        parameter :size, "Per page maximum records"

        example 'List states with page and size' do
          do_request(page: 1, size: 5)

          expect(status).to eq(200)
          expect(json["records"].length).to eq(5)
          expect(json["meta"]["current_page"]).to eq(1)
          expect(json["meta"]["page_size"]).to eq(5)
        end
      end
    end

    describe "Filtering" do
      let!(:br) { create(:country, name: "Brasil") }
      let!(:us) { create(:country, name: "Estados Unidos") }

      before {
        create(:state, name: "Paraná", country: br)
        create(:state, name: "São Paulo", country: br)
        create(:state, name: "Rio de Janeiro", country: br)
        create(:state, name: "Nova York", country: us)
        create(:state, name: "Florida", country: us)
      }

      parameter :q, "Filter state by name"
      parameter :country_id, "Filter state by country"

      example "List states filtered by name" do
        do_request(q: "paraná")

        expect(status).to eq(200)
        expect(json["records"].length).to eq(1)
      end

      example "List states filtered by country" do
        do_request(country_id: br.id)

        expect(status).to eq(200)
        expect(json["records"].length).to eq(3)
      end
    end

    describe "Sorting" do
      before {
        create_list(:state, 10)
      }

      parameter :sort, "Sort state by name asc or desc"

      example "List states sorted by name asc" do
        do_request(sort: "name asc")

        expect(status).to eq(200)
      end
    end
  end
end