class EveController < ApplicationController
  def token
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
    name_and_id = HTTParty.get('https://login.eveonline.com/oauth/verify',
      :headers => {
        'User-Agent' => '',
        'Authorization' => "Bearer #{codes['access_token']}",
        'Host' => 'login.eveonline.com'
        })
    corp_id = HTTParty.get("https://esi.tech.ccp.is/latest/characters/#{name_and_id['CharacterID']}/")
    portrait = HTTParty.get("https://esi.tech.ccp.is/latest/characters/#{name_and_id['CharacterID']}/portrait/")
    render json: {
      access_token: codes['access_token'],
      refresh_token: codes['refresh_token'],
      character_id: name_and_id['CharacterID'],
      character_name: name_and_id['CharacterName'],
      corp_id: corp_id['corporation_id'],
      portrait: portrait['px128x128']
    }
  end

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

  def chart_test
    render json: {
      myGraph: {
        nodes: [{id:"n1", label:"Alice", size: '3'},{id:"n2", label:"Rabbit", size: '3'}],
        edges: [{id:"e1",source:"n1",target:"n2",label:"SEES"}]
      }
    }
  end
end
