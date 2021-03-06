require 'rails_helper'

RSpec.describe Company, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe "Associations" do
    it { should have_many(:complaints).with_dependent(:destroy) }
  end
end
