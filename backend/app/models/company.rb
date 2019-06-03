class Company
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String

  has_many :complaints, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
