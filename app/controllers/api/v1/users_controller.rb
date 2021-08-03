class Api::V1::UsersController < ApiController
  def index
    user = current_api_v1_user.
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
    show_user = user.as_json(only: [:id, :name, :user_id, :icon_image, :header_image]).merge(relationship_size)
    render json: show_user.to_json
  end

  def account
    if params[:account] && params[:account] == 'request'
      user = current_api_v1_user.to_json(only: [:name, :user_id, :email, :icon_image, :header_image])
      render json: user
    else
      render json: { status: 401, message: 'unauthorized' }
    end
  end
end
