class Complaint
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :description, type: String

  belongs_to :company
  belongs_to :city

  validates :title, presence: true
  validates :description, presence: true
end
