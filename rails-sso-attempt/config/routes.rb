Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/evedata', to: 'eve#token'
  post '/refresh', to: 'eve#token_refresh'
  get '/mapper', to: 'eve#chart_test'
end
