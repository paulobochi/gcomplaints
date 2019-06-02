require 'rails_helper'

RSpec.describe Complaint, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
  end

  describe "Associations" do
    it { should belong_to(:company) }
    it { should belong_to(:city) }
  end
end
