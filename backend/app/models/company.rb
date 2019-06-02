class Company
  include Mongoid::Document
  field :name, type: String

  has_many :complaints, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
