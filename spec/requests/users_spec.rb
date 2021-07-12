require 'rails_helper'

RSpec.describe "Users", type: :request do
  login_user

  describe "GET /index" do
    it "returns http success" do
      get "/users"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns 302 redirect" do
      get "/users/show"
      expect(response).to have_http_status(302)
    end
  end
end
