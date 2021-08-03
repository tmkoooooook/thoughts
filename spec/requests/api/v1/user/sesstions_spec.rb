require 'rails_helper'

RSpec.describe "Api::V1::User::Sesstions", type: :request do
  let!(:user) { create(:user) }

  describe "sign_in" do
    context "correct user params" do
      it "returns success" do
        post '/api/v1/users/sign_in',
          params: { user_id: user[:user_id], password: 'password' },
          as: :json
        expect(response.status).to eq(200)
      end
    end

    context "wrong user params" do
      it "returns failure" do
        post '/api/v1/users/sign_in',
          params: { user_id: user[:user_id], password: 'wrong_password' },
          as: :json
        expect(response.status).to eq(401)
      end
    end
  end

  describe "sign_out" do
    before do
      post '/api/v1/users/sign_in',
        params: { user_id: user[:user_id], password: 'password' },
        as: :json
      @auth_tokens = @response.headers.slice('client', 'access-token', 'uid')
    end

    context "auth_tokens is correct" do
      it "can logout" do
        delete '/api/v1/users/sign_out', headers: @auth_tokens
        expect(response.status).to eq(200)
      end
    end

    context "auth_tokens is wrong" do
      it "cannot logout" do
        @auth_tokens[:uid] = 'wrong@example.com'
        delete '/api/v1/users/sign_out', headers: @auth_tokens
        expect(response.status).to eq(404)
      end
    end
  end
end
