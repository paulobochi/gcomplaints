class State
  include Mongoid::Document
  field :name, type: String

  has_many :cities

  validates :name, presence: true, uniqueness: true
end
