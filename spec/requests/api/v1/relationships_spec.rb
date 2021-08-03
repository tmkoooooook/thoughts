require 'rails_helper'

RSpec.describe "Api::V1::Relationships", type: :request do
  let(:user) { create(:user) }
  let!(:interested_user) { create(:user,
    name: 'interested user',
    email: 'interested@example.com',
    password: 'interestedpassword',
    encrypted_password: 'interestedpassword',
    user_id: 'interesteduserid') }

  before do
    @auth_tokens = sign_in(user)
  end

  describe "create" do
    it 'succeeds to create' do
      params = { interest_id: interested_user.id }
      post '/api/v1/relationships', params: { relationship: params }, headers: @auth_tokens
      expect(response).to have_http_status(200)
    end
  end

  describe 'destroy' do
    before do
      create(:relationship, user_id: user.id, interest_id: interested_user.id)
    end

    it 'succeeds to destroy' do
      params = { interest_id: interested_user.id }
      delete "/api/v1/relationships/#{interested_user.id}", params: { relationship: params }, headers: @auth_tokens
      expect(response).to have_http_status(200)
    end
  end
end
