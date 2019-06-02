require 'rails_helper'

RSpec.describe City, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end

  describe "Associations" do
    it { should belong_to(:state) }
  end
end
