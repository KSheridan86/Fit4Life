Rails.application.routes.draw do
  get 'home/index'
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'home#index'
  # Defines the root path route ("/")
  # root "articles#index"
  resource :profile, only: [:new, :create, :edit, :update, :destroy]
  resources :workouts, except: [:index, :show]
  devise_scope :user do
    delete 'users', to: 'registrations#destroy'
  end

  namespace :api do
    resources :profiles, only: [:index, :show, :create, :update, :destroy]
    resources :users, only: [:show]
    post 'login', to: 'sessions#create'
    post 'logout', to: 'sessions#destroy'
    get 'profile', to: 'profiles#show'
    get 'users', to: 'users#show'

    resources :users, only: [] do
      resources :workouts, except: [:index, :show]
    end
  end
end
