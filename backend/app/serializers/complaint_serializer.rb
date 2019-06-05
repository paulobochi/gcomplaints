class ComplaintSerializer < ActiveModel::Serializer
  attributes :id, :title, :description

  belongs_to :city
  belongs_to :company
end