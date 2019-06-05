class Complaint
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  field :title, type: String
  field :description, type: String
  field :coordinates, type: Array

  belongs_to :company
  belongs_to :city

  validates :title, presence: true
  validates :description, presence: true

  reverse_geocoded_by :coordinates do |obj, results|
    if geo = results.first
      country = Country.find_or_create_by(name: geo.country)
      state = State.find_or_create_by(name: geo.state, country: country)
      obj.city = City.find_or_create_by(name: geo.city, state: state)
    end
  end

  before_validation :reverse_geocode,  if: ->(obj) { !obj.city.present? and obj.coordinates.present? }
end
