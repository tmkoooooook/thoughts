FactoryBot.define do
  factory :user do
    name { 'test user' }
    email { 'test@exaple.com' }
    password { 'password' }
    encrypted_password { 'password' }
    user_id { 'testuser0' }
  end
end
