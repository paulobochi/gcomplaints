class Country
  include Mongoid::Document
  field :name, type: String

  # has_many :states

  validates :name, presence: true, uniqueness: true
end
