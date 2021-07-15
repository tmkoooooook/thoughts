require 'rails_helper'

RSpec.describe "Thoughts", type: :request do
  let(:user) { create(:user) }
  let(:thought) { create(:thought, user: user) }

  before do
    sign_in user
  end

  describe "new" do
    it "returns http success" do
      get mythought_path
      expect(response).to have_http_status(:success)
    end
  end

  describe "show" do
    it "returns http success" do
      get user_thought_path(user, thought )
      expect(response).to have_http_status(:success)
    end
  end
end
