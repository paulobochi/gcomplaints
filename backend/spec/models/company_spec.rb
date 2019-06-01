require 'rails_helper'

RSpec.describe Company, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      company = build(:random_company)
      expect(company).to be_valid
    end

    it "is not valid without a name" do
      company = build(:random_company, name: nil)
      expect(company).to_not be_valid
    end

    it "is not valid without a unique name" do
      create(:company)
      company = build(:company)
      expect(company).to_not be_valid
    end
  end

  describe "Associations" do
    it "has many complaints" do
      should have_many(:complaints)
    end
  end
end
