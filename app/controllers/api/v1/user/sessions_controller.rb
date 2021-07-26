class Api::V1::User::SessionsController < DeviseTokenAuth::SessionsController
  protected

  def resource_params
    params.require(:session).permit(:user_id, :password)
  end
end
