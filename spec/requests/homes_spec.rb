require 'rails_helper'

RSpec.describe "Homes", type: :request do
  describe "index" do
    it "returns http success" do
      get "/"
      expect(response).to have_http_status(:success)
    end

    context 'when signed in' do
      login_user

      it 'redirect to users_path' do
        get '/'
        expect(response).to have_http_status(302)
      end
    end
  end

end
