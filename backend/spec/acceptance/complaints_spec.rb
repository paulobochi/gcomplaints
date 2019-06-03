require 'acceptance_helper'

resource :Complaints do
  get "/complaints" do
    describe "Pagination" do
      before { create_list(:complaint, 10) }

      context "with default pagination" do
        example "List complaints" do
          do_request

          expect(status).to eq(200)
          expect(json["complaints"].length).to eq(10)
        end
      end

      context "with custom pagination" do
        parameter :page, "Page number"
        parameter :size, "Per page maximum records"

        example 'List complaints with page and size' do
          do_request(page: 1, size: 5)

          expect(status).to eq(200)
          expect(json["complaints"].length).to eq(5)
          expect(json["meta"]["current_page"]).to eq(1)
          expect(json["meta"]["page_size"]).to eq(5)
        end
      end
    end

    describe "Filtering" do
      let!(:br) { create(:country, name: "Brasil") }
      let!(:us) { create(:country, name: "Estados Unidos") }

      let!(:pr) { create(:state, name: "Paraná", country: br) }
      let!(:sp) { create(:state, name: "São Paulo", country: br) }
      let!(:ny) { create(:state, name: "Nova York", country: us) }

      let!(:city_igu) { create(:city, name: "Foz do Iguaçu", state: pr) }
      let!(:city_ctba) { create(:city, name: "Curitiba", state: pr) }
      let!(:city_sp) { create(:city, name: "São Paulo", state: sp) }
      let!(:city_ny) { create(:city, name: "Nova York", state: ny) }

      let!(:company1) { create(:company) }
      let!(:company2) { create(:company) }

      before {
        create_list(:complaint, 20, company: company1, city: city_igu )
        create_list(:complaint, 15, company: company1, city: city_ctba )
        create_list(:complaint, 10, company: company1, city: city_sp )
        create_list(:complaint, 5, company: company1, city: city_ny )
        create_list(:complaint, 10, company: company2, city: city_sp )
        create_list(:complaint, 5, company: company2, city: city_ny )
      }

      parameter :company_id, "Filter complaints by company"
      parameter :country_id, "Filter complaints by country"
      parameter :state_id, "Filter complaints by state"
      parameter :city_id, "Filter complaints by city"

      example "List complaints filtered by company" do
        do_request(company_id: company1.id)

        expect(status).to eq(200)
        expect(json["meta"]["total_count"]).to eq(50)
      end

      example "List complaints filtered by country" do
        do_request(country_id: br.id)

        expect(status).to eq(200)
        expect(json["meta"]["total_count"]).to eq(55)
      end

      example "List complaints filtered by state" do
        do_request(state_id: pr.id)

        expect(status).to eq(200)
        expect(json["meta"]["total_count"]).to eq(35)
      end

      example "List complaints filtered by city" do
        do_request(city_id: city_igu.id)

        expect(status).to eq(200)
        expect(json["meta"]["total_count"]).to eq(20)
      end
    end

    describe "Sorting" do
      before { create_list(:complaint, 10) }

      parameter :sort, "Sort complaints by name asc or desc"

      example "List complaints sorted by name asc" do
        do_request(sort: "name asc")

        expect(status).to eq(200)
      end
    end
  end

  post "/complaints" do
    parameter :title, "Complaint title"
    parameter :description, "Complaint description"
    parameter :company_id, "Company id"

    let!(:company) { create(:company) }

    context "with required attributes" do
      example 'Creating a complaint' do
        complaint = build(:complaint, company: company)
        do_request(complaint.attributes)

        expect(status).to eq(200)
        expect(json["title"]).to eq(complaint.title)
        expect(json["description"]).to eq(complaint.description)
        expect(json["company"]).to be_present
        expect(json["company"]["id"]).to eq(company.id)
        expect(json["id"]).to be_present
      end
    end

    context "without required attributes" do
      example 'Creating a complaint without title', document: false do
        complaint = build(:complaint, title: nil, company: company)
        do_request(complaint.attributes)

        expect(status).to eq(422)
      end

      example 'Creating a complaint without description', document: false do
        complaint = build(:complaint, description: nil, company: company)
        do_request(complaint.attributes)

        expect(status).to eq(422)
      end

      example 'Creating a complaint without company', document: false do
        complaint = build(:complaint, company: nil)
        do_request(complaint.attributes)

        expect(status).to eq(422)
      end
    end
  end

  get "/complaints/:id" do
    context "when complaint exists" do
      let!(:complaint) { create(:complaint) }

      example 'Getting complaint by id' do
        do_request(id: complaint.id)
        expect(status).to eq(200)
        expect(json).to include_json(ComplaintSerializer.new(complaint).attributes)
      end
    end

    context "when complaint not exists" do
      example 'Getting complaint by id', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end

  put "/complaints/:id" do
    parameter :title, "Complaint title"
    parameter :description, "Complaint description"
    parameter :company_id, "Company id"

    context "when complaint exists" do
      let!(:complaint) { create(:complaint) }
      let!(:company) { create(:company) }
      let(:id) { complaint.id }

      example 'Updating complaint' do
        complaint.title = "New Title"
        complaint.description = "New description of complaint"
        complaint.company = company
        do_request(complaint.attributes)
        expect(status).to eq(200)
        # expect(json).to include_json(ComplaintSerializer.new(complaintToUpdate).attributes)
      end
    end

    context "when complaint not exists" do
      example 'Updating complaint', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end

  delete "/complaints/:id" do
    context "when complaint exists" do
      let!(:complaint) { create(:complaint) }
      let(:id) { complaint.id }

      example 'Deleting complaint' do
        do_request

        expect(status).to eq(204)
      end
    end

    context "when complaint not exists" do
      example 'Deleting complaint', document: false do
        expect{ do_request(id: 1) }.to raise_exception(Mongoid::Errors::DocumentNotFound)
      end
    end
  end
end