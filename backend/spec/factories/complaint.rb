FactoryBot.define do
  factory :complaint do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    company
    city
  end
end