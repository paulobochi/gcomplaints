FactoryBot.define do
  factory :city do
    state
    name { Faker::Address.unique.city }
  end
end