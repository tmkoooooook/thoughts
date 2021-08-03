require 'rails_helper'

RSpec.describe "Api::V1::User::Registrations", type: :request do
  describe "sign_up" do
    before do
      @user = {
        name: 'test_user',
        email: 'testuser@example.com',
        user_id: 'testuserid',
        password: 'password'
      }
    end

    it "succeed to create user" do
      post '/api/v1/users', params: @user, as: :json
      expect(response).to have_http_status(200)
    end

    context "when any of user params is blank" do
      it "failure to create user" do
        @user[:email] = ''
        post '/api/v1/users', params: @user, as: :json
        expect(response).to have_http_status(422)
      end

      it "failure to create user" do
        @user[:name] = ''
        post '/api/v1/users', params: @user, as: :json
        expect(response).to have_http_status(422)
      end

      it "failure to create user" do
        @user[:user_id] = ''
        post '/api/v1/users', params: @user, as: :json
        expect(response).to have_http_status(422)
      end

      it "failure to create user" do
        @user[:password] = ''
        post '/api/v1/users', params: @user, as: :json
        expect(response).to have_http_status(422)
      end
    end
  end
end
