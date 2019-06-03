class CitySerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :state

  def id
    object.id&.to_s
  end
end