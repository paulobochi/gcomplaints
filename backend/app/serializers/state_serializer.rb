class StateSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :country
end