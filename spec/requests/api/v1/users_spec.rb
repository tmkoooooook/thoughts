require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user,
    name: 'other user',
    email: 'other@example.com',
    password: 'otherpassword',
    encrypted_password: 'otherpassword',
    user_id: 'otheruserid') }

  before { sign_in user }

  describe 'index' do
    before { get '/api/v1/users' }

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'returns current user data with interests' do
      user_data = {
        "id" => user.id,
        "name" => 'test user',
        "relationships" => [],
        "user_id" => 'testuser0'
      }
      expect(JSON.parse(response.body)).to eq(user_data)
    end
  end

  describe 'show' do
    before { get "/api/v1/users/#{other_user.user_id}" }

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'returns show user data with relationships size' do
      user_data = {
        "id" => other_user.id,
        "interests_size" => 0,
        "interesters_size" => 0,
        "name" => 'other user',
        "user_id" => 'otheruserid'
      }
      expect(JSON.parse(response.body)).to eq(user_data)
    end
  end
end
