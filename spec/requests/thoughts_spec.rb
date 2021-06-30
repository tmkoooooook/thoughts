require 'rails_helper'

RSpec.describe "Thoghts", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/thoghts/show"
      expect(response).to have_http_status(:success)
    end
  end

end
