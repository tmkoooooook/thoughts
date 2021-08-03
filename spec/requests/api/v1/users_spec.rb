require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user,
    name: 'other user',
    email: 'other@example.com',
    password: 'otherpassword',
    encrypted_password: 'otherpassword',
    user_id: 'otheruserid') }

  before { @auth_tokens = sign_in(user) }

  describe 'index' do
    before { get '/api/v1/users', headers: @auth_tokens }

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
    before { get "/api/v1/users/#{other_user.user_id}", headers: @auth_tokens }

    it 'returns http success' do
      expect(response).to have_http_status(200)
    end

    it 'returns show user data with relationships size' do
      user_data = {
        "id" => other_user.id,
        "interests_size" => 0,
        "interesters_size" => 0,
        "name" => 'other user',
        "user_id" => 'otheruserid',
        "header_image" => { "url" => nil },
        "icon_image" => { "url"=> nil },
      }
      expect(JSON.parse(response.body)).to eq(user_data)
    end
  end

  describe "account" do
    before { get "/api/v1/users/account?account=request", headers: @auth_tokens }

    it "returns http success" do
      expect(response).to have_http_status(200)
    end

    it "returns user data" do
      user_data = {
        "email" => "test@exaple.com",
        "header_image" => { "url" => nil },
        "icon_image" => { "url" => nil },
        "name" => "test user",
        "user_id" => "testuser0",
      }
      expect(JSON.parse(response.body)).to eq(user_data)
    end
  end
end
