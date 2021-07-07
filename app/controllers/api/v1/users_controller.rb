class Api::V1::UsersController < ApiController
  def index
    render json: current_user.
      to_json(
        only: [:id, :name, :user_id],
        include: { relationships: { only: [:id, :interest_id] } }
      )
  end
end
