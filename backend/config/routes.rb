Rails.application.routes.draw do
  mount Raddocs::App => "/docs"

  resources :countries, only: :index
  resources :states, only: :index
  resources :cities, only: :index
  resources :companies
  resources :complaints
end
