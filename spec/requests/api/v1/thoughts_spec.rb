require 'rails_helper'

RSpec.describe "Thoughts", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/thoughts"
      expect(response).to have_http_status(:success)
    end


  end

end
