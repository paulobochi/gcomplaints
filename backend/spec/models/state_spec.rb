require 'rails_helper'

RSpec.describe State, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { validate_uniqueness_of(:name) }
  end

  describe "Associations" do
    it { should have_many(:cities) }
  end
end
