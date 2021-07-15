Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions'
  }
  devise_scope :user do
    get 'sign_in',  to: 'users/sessions#new'
    get 'sign_out', to: 'users/sessions#destroy'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "homes#index"
  resources :homes, only: [:index]
  resources :users, only: [:index, :show], param: :user_id do
    resources :thoughts, only:[:show]
  end

  scope '/users' do
    get 'mythought', to: 'thoughts#new'
  end

  namespace :api ,{ format: 'json' } do
    namespace :v1 do
      resources :thoughts,      only: [:index, :show, :create, :destroy]
      resources :users,         only: [:index, :show], param: :user_id
      resources :relationships, only: [:create, :destroy]
    end
  end
end
