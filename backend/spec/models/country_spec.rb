require 'rails_helper'

RSpec.describe Country, type: :model do
  describe "Validations" do
    it "is valid with valid attributes" do
      country = build(:random_country)
      expect(country).to be_valid
    end

    it "is not valid without a name" do
      country = build(:random_country, name: nil)
      expect(country).to_not be_valid
    end

    it "is not valid without a unique name" do
      create(:country)
      country = build(:country)
      expect(country).to_not be_valid
    end
  end

  describe "Associations" do
    it "has many states" do
      should have_many(:states)
    end
  end
end
