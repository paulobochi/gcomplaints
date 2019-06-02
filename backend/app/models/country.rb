class Country
  include Mongoid::Document
  field :name, type: String

  has_many :states, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
