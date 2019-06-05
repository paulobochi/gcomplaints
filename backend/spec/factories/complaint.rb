FactoryBot.define do
  factory :complaint do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    coordinates { [-54.559549200000006, -25.5266104] }
    company
    city
  end
end