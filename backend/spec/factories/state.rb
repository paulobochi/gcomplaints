FactoryBot.define do
  factory :state do
    country
    name { Faker::Address.unique.city }
  end
end