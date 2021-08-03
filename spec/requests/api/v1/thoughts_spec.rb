require 'rails_helper'

RSpec.describe 'Api::V1::Thoughts', type: :request do
  let(:user) { create(:user) }
  let!(:interested_user) { create(:user,
    name: 'interested user',
    email: 'interested@example.com',
    password: 'interestedpassword',
    encrypted_password: 'interestedpassword',
    user_id: 'interesteduserid') }
  let!(:other_user) { create(:user,
    name: 'other user',
    email: 'other@example.com',
    password: 'otherpassword',
    encrypted_password: 'otherpassword',
    user_id: 'otheruserid') }

  before do
    create(:thought, user: user)
    create(:thought, user: interested_user)
    create(:thought, user: other_user)
    create(:relationship, user_id: user.id, interest_id: interested_user.id)
    @auth_tokens = sign_in(user)
  end

  describe 'index' do
    it 'returns http success' do
      get '/api/v1/thoughts', headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'gets interest_users thoughts' do
      get '/api/v1/thoughts', headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 2
    end

    context 'when log_out' do
      it 'does not get thoughts' do
        sign_out(@auth_tokens)
        get '/api/v1/thoughts', headers: @auth_tokens
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'show' do
    it 'returns http success' do
      get "/api/v1/thoughts/#{other_user.user_id}", headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 1
    end

    context 'when log_out' do
      it 'does not get thoughts' do
        sign_out(@auth_tokens)
        get "/api/v1/thoughts/#{other_user.user_id}", headers: @auth_tokens
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'create' do
    it 'succeeds to create' do
      get '/api/v1/thoughts', headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 2

      params = { title: 'title', text: 'text' }
      post '/api/v1/thoughts', params: { thought: params }, headers: @auth_tokens
      expect(response).to have_http_status(200)

      get '/api/v1/thoughts', headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 3
    end

    context 'when log_out' do
      it 'fails to create' do
        sign_out(@auth_tokens)
        params = { title: 'title', text: 'text' }
        post '/api/v1/thoughts', params: { thought: params }, headers: @auth_tokens
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'destroy' do
    let!(:thought) { create(:thought, user: user) }

    it 'scceeds to destroy' do
      get '/api/v1/thoughts', headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 3

      delete "/api/v1/thoughts/#{thought.id}", headers: @auth_tokens
      expect(response).to have_http_status(200)

      get '/api/v1/thoughts', headers: @auth_tokens
      expect(JSON.parse(response.body).size).to eq 2
    end

    context 'when log_out' do
      it 'fails to destroy' do
        sign_out(@auth_tokens)
        delete "/api/v1/thoughts/#{thought.id}", headers: @auth_tokens
        expect(response).to have_http_status(401)
      end
    end
  end

end
