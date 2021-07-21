Rails.application.routes.draw do
  root to: "homes#index"
  resources :homes, only: [:index]
  get 'sign_in', to: "homes#index"
  get 'sign_up', to: "homes#index"

  scope '/users' do
    get '/' , to: "homes#index"
    get '/*path', to: "homes#index"
  end

  namespace :api ,{ format: 'json' } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', controllers: {
        registrations: 'api/1/user/registrations',
        sessions:      'api/v1/user/sessions'
      }

      resources :thoughts,      only: [:index, :show, :create, :destroy]
      resources :relationships, only: [:create, :destroy]
      resources :users,         only: [:index, :show], param: :user_id do
        get 'account', on: :collection
      end
    end
  end
end
