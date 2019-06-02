class City
  include Mongoid::Document
  field :name, type: String

  belongs_to :state

  validates :name, presence: true, uniqueness: true
end
