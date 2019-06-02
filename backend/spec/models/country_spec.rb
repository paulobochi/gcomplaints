require 'rails_helper'

RSpec.describe Country, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { validate_uniqueness_of(:name) }
  end

  describe "Associations" do
    it { should have_many(:states) }
  end
end
