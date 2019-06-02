require 'rails_helper'

RSpec.describe State, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe "Associations" do
    it { should belong_to(:country) }
    it { should have_many(:cities).with_dependent(:destroy) }
  end
end
