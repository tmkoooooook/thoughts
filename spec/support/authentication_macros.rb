module AuthenticationMacros
  def login_user
    before do
      user = create(:user)
      sign_in user
    end
  end
end
