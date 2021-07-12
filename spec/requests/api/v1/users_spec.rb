require 'rails_helper'

RSpec.describe 'Thoughts', type: :request do
  describe 'index' do
    login_user

    it 'returns http success' do
      get '/api/v1/users'
      expect(response).to have_http_status(200)
    end
  end
end
