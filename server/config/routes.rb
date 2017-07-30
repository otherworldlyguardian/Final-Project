Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/grantcode', to: 'user#find_or_create'
  post '/refresh', to: 'eve#token_refresh'
end
