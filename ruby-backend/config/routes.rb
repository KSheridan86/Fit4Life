Rails.application.routes.draw do
  get 'home/index'
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'home#index'
  # Defines the root path route ("/")
  # root "articles#index"
  resource :profile, only: [:new, :create, :edit, :update, :destroy]
  devise_scope :user do
    delete 'users', to: 'registrations#destroy'
  end

  namespace :api do
    resources :profiles, only: [:index, :show, :create, :update, :destroy]
  end
end
