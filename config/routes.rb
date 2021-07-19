Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions'
  }
  devise_scope :user do
    get 'sign_in',  to: 'users/sessions#new'
    get 'sign_out', to: 'users/sessions#destroy'
  end

  root to: "homes#index"
  scope '/users' do
    get '/' , to: "users#index"
    get '/*path', to: "users#index"
  end

  namespace :api ,{ format: 'json' } do
    namespace :v1 do
      resources :thoughts,      only: [:index, :show, :create, :destroy]
      resources :users,         only: [:index, :show], param: :user_id do
        get 'account', on: :collection
      end
      resources :relationships, only: [:create, :destroy]
    end
  end
end
