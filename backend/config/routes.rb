Rails.application.routes.draw do
  mount Raddocs::App => "/api_docs"

  resources :companies
end
