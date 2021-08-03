module SignInSpecHelper
  def sign_in(user)
    post '/api/v1/users/sign_in',
         params: { user_id: user[:user_id], password: 'password' },
         as: :json
    response.headers.slice('client', 'access-token', 'uid')
  end

  def sign_out(tokens)
    delete '/api/v1/users/sign_out', headers: tokens
  end
end
