class Api::V1::User::RegistrationsController < DeviseTokenAuth::RegistrationsController
  protected

  def sign_up_params
    params.require(:registration).permit(:name, :user_id, :email, :password)
  end

  def account_update_params
    params.require(:registration).permit(:name, :user_id, :email)
  end
end
