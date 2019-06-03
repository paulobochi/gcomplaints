FactoryBot.define do
  factory :state do
    country
    name { Faker::Address.unique.state }
  end
end