class StateSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :country

  def id
    object.id&.to_s
  end
end