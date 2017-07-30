class UserController < ApplicationController
  def find_or_create
    codes = HTTParty.post('https://login.eveonline.com/oauth/token',
      :body => {
        :grant_type => 'authorization_code',
        :code => params['eve']['code']
        },
      :headers => {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Authorization' => "Basic NTgwNzcwMzMwN2E2NDM3YmJlYTdkODgwZTU5MWVkNWE6MTdXRHVnUFdQM2xmZzZUNkswR2ZBYUZkVVh2V2pMSFZ6enBpbjI2Sg==",
        'Host' => 'login.eveonline.com'
        })
    name_and_id = get_name(codes['access_token'])
    corp_id = get_corp(name_and_id['CharacterID'])
    user = User.find_by_eve_id(name_and_id['CharacterID'])
    if user
      user.update(refresh_token: codes['refresh_token'], corp_id: corp_id['corporation_id'])
    else
      user = User.create(username: name_and_id['CharacterName'], eve_id: name_and_id['CharacterID'], corp_id: corp_id['corporation_id'], refresh_token: codes['refresh_token'])
    end
    render json: {
      access_token: codes['access_token'],
      character_id: user.eve_id,
      character_name: user.username,
      corp_id: user.corp_id,
      jwt: issue_token({id: user.id})
    }
  end

  def get_name token
    HTTParty.get('https://login.eveonline.com/oauth/verify',
      :headers => {
        'User-Agent' => '',
        'Authorization' => "Bearer #{token}",
        'Host' => 'login.eveonline.com'
        })
  end

  def get_corp id
    HTTParty.get("https://esi.tech.ccp.is/latest/characters/#{id]}/")
  end
end
