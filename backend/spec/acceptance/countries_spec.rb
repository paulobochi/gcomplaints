require 'acceptance_helper'

resource :Countries do
  get "/countries" do
    describe "Pagination" do
      before { create_list(:country, 10) }

      context "with default pagination" do
        example "List countries" do
          do_request

          expect(status).to eq(200)
          expect(json["records"].length).to eq(10)
        end
      end

      context "with custom pagination" do
        parameter :page, "Page number"
        parameter :size, "Per page maximum records"

        example 'List countries with page and size' do
          do_request(page: 1, size: 5)

          expect(status).to eq(200)
          expect(json["records"].length).to eq(5)
          expect(json["meta"]["current_page"]).to eq(1)
          expect(json["meta"]["page_size"]).to eq(5)
        end
      end
    end

    describe "Filtering" do
      before {
        create(:country, name: "Brasil")
        create(:country, name: "Estados Unidoss")
        create(:country, name: "Paraguai")
      }

      parameter :q, "Filter country by name"

      example "List countries filtered by name" do
        do_request(q: "brasil")

        expect(status).to eq(200)
        expect(json["records"].length).to eq(1)
      end
    end

    describe "Sorting" do
      before { create_list(:country, 10) }

      parameter :sort, "Sort country by name asc or desc"

      example "List countries sorted by name asc" do
        do_request(sort: "name asc")

        expect(status).to eq(200)
      end
    end
  end
end