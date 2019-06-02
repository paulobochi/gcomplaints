class State
  include Mongoid::Document
  field :name, type: String

  belongs_to :country
  has_many :cities, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
