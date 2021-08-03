FactoryBot.define do
  factory :user do
    name { 'test user' }
    email { 'test@exaple.com' }
    password { 'password' }
    user_id { 'testuser0' }
    icon_image { { url: '/uploads/icon_image.png' } }
    header_image { {url: '/uploads/header_image.png' } }
    confirmed_at { Date.today }
  end
end
