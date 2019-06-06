class ComplaintSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :state, :country, :created_at

  belongs_to :city
  belongs_to :company

  def state
    object.city&.state
  end

  def country
    object.city&.state&.country
  end
end