require 'rails_helper'

RSpec.describe "Users", type: :request do
  login_user

  let!(:other_user) { create(:user,
    name: 'other user',
    email: 'other@example.com',
    password: 'otherpassword',
    encrypted_password: 'otherpassword',
    user_id: 'otheruserid') }

  describe "index" do
    it "returns http success" do
      get users_path
      expect(response).to have_http_status(200)
    end
  end

  describe "show" do
    it "returns http success" do
      get user_path(other_user)
      expect(response).to have_http_status(200)
    end
  end
end
