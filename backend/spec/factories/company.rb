FactoryBot.define do
  factory :company do
    name { "Company Test" }
  end

  factory :random_company, class: Company do
    name { Faker::Company.name }
  end
end