Rails.application.routes.draw do
  mount Raddocs::App => "/api_docs"

  resources :countries, only: :index
  resources :companies
end
