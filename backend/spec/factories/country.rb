FactoryBot.define do
  factory :country do
    name { "Brasil" }
  end

  factory :random_country, class: Country do
    name { Faker::Address.country }
  end
end