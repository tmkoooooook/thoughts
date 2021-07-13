class Api::V1::UsersController < ApiController
  def index
    render json: current_user.
      to_json(
        only: [:id, :name, :user_id],
        include: { relationships: { only: [:id, :interest_id] } }
      )
  end

  def show
    user = User.find_by(user_id: params[:userid])
    render json: user.
      to_json(
        only: [:id, :name, :user_id],
        include: { relationships: { only: [:id, :interest_id] } }
      )
  end
end
