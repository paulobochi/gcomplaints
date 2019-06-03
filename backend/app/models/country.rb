class Country
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String

  has_many :states, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
