class Api::V1::UsersController < ApiController
  def index
    user = current_user.
      to_json(
        only: [:id, :name, :user_id],
        include: { relationships: { only: [:id, :interest_id] } }
      )
    render json: user
  end

  def show
    user = User.
      includes(:relationships, :reverse_of_relationships).
      find_by(user_id: params[:user_id])
    relationship_size = user.relationship_size
    show_user = user.as_json(only: [:id, :name, :user_id]).merge(relationship_size)
    render json: show_user.to_json
  end
end
