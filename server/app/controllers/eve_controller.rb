class EveController < ApplicationController



  def token_refresh
    puts params['eve']['code']
    codes = HTTParty.post('https://login.eveonline.com/oauth/token',
      :body => {
        :grant_type => 'refresh_token',
        :refresh_token => params['eve']['code']
        },
      :headers => {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Authorization' => 'Basic  NTgwNzcwMzMwN2E2NDM3YmJlYTdkODgwZTU5MWVkNWE6MTdXRHVnUFdQM2xmZzZUNkswR2ZBYUZkVVh2V2pMSFZ6enBpbjI2Sg==',
        'Host' => 'login.eveonline.com'
        })
    puts codes
    render json: {
      access_token: codes['access_token']
    }
  end

  def path
    puts 'worked'
  end
end
