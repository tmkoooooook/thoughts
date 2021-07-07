FactoryBot.define do
  factory :thought do
    title { "MyString" }
    text { "MyString" }
    shorted_text { "MyString" }

    association :user, factory: :user
  end
end
