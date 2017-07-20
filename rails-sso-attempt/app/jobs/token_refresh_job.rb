class TokenRefreshJob < ApplicationJob
  queue_as :default
  after_perform do |job|
    self.class.set(wait: 15.minute).perform_later
  end

  def perform(*args)
    tester = HTTParty.post('https://login.eveonline.com/oauth/token',
      :body => {
        :grant_type => 'refresh_token',
        :refresh_token => 'ALz1si0ejaBWIHH6alDGYX4VfYBW6tWIOSVuKsayIz7C4EDVZ1gfXa3OiaOeq8_V0'
        },
      :headers => {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Authorization' => 'Basic  NTgwNzcwMzMwN2E2NDM3YmJlYTdkODgwZTU5MWVkNWE6MTdXRHVnUFdQM2xmZzZUNkswR2ZBYUZkVVh2V2pMSFZ6enBpbjI2Sg==',
        'Host' => 'login.eveonline.com'
        })
    puts tester.access_token
  end
end
