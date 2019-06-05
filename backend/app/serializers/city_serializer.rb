class CitySerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :state
end