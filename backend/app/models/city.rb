class City
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String

  belongs_to :state

  validates :name, presence: true, uniqueness: true
end
