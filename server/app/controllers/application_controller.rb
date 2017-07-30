class ApplicationController < ActionController::API
  private

  def issue_token payload
    JWT.encode payload, hmac_secret, 'HS256'
  end

  def authorize_user!
    if !current_user
      render json: {error: 'error'}
    end
  end

  def current_user
    @current_user ||= User.find(token_user_id)
  end

  def token_user_id
    decoded_token.first['id']
  end

  def decoded_token
    if token
      begin
        JWT.decode token, hmac_secret, true, {:algorithm => 'HS256'}
      rescue JWT::DecodeError
      [{}]
      end
    else
      [{}]
    end
  end

  def token
    request.headers['Authorization']
  end

  def hmac_secret
    "a54e73cb56192425dd3cf6edc1e86129"
  end

end
