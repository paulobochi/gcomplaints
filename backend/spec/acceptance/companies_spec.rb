require 'acceptance_helper'

resource :Companies do
  get "/companies" do
    describe "Pagination" do
      before { create_list(:company, 10) }

      context "with default pagination" do
        example "List companies" do
          do_request

          expect(status).to eq(200)
          expect(json["records"].length).to eq(10)
        end
      end

      context "with custom pagination" do
        parameter :page, "Page number"
        parameter :size, "Per page maximum records"

        example 'List companies with page and size' do
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
        create(:company, name: "Canonical")
        create(:company, name: "GitHub")
        create(:company, name: "Reclame Aqui")
      }

      parameter :q, "Filter company by name"

      example "List companies filtered by name" do
        do_request(q: "reclame")

        expect(status).to eq(200)
        expect(json["records"].length).to eq(1)
      end
    end

    describe "Sorting" do
      before { create_list(:company, 10) }

      parameter :sort, "Sort company by name asc or desc"

      example "List companies sorted by name asc" do
        do_request(sort: "name asc")

        expect(status).to eq(200)
      end
    end
  end

  post "/companies" do
    parameter :name, "Company name"

    context "with required attributes" do
      example 'Create a company' do
        company = build(:company)
        do_request(company.attributes)

        expect(status).to eq(200)
        expect(json["name"]).to eq(company[:name])
        expect(json["id"]).to be_present
      end
    end

    context "without required attributes" do
      example 'Create a company without name', document: false do
        do_request
        expect(status).to eq(422)
      end
    end

    context "with already taken name" do
      before { create(:company, name: "Company Test")}

      example 'Create a company with already taken name', document: false do
        company = build(:company, name: "Company Test")
        do_request(company.attributes)

        expect(status).to eq(422)
      end
    end
  end

  get "/companies/:id" do
    context "when company exists" do
      let!(:company) { create(:company) }

      example 'Get company by id' do
        do_request(id: company.id)
        expect(status).to eq(200)
        expect(json).to include_json(CompanySerializer.new(company).attributes.as_json)
      end
    end

    context "when company not exists" do
      example 'Get company by id', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end

  put "/companies/:id" do
    parameter :name, "Company name"

    context "when company exists" do
      let!(:company) { create(:company) }
      let(:id) { company.id }

      example 'Update company' do
        company.name = "New Company Name"
        do_request(company.attributes)

        expect(status).to eq(200)
        expect(json).to include_json(CompanySerializer.new(company).attributes.as_json)
      end
    end

    context "when company not exists" do
      example 'Update company', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end

  delete "/companies/:id" do
    context "when company exists" do
      let!(:company) { create(:company) }
      let(:id) { company.id }

      example 'Delete company' do
        do_request

        expect(status).to eq(204)
      end
    end

    context "when company not exists" do
      example 'Delete company', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end
end