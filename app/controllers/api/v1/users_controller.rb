class Api::V1::UsersController < ApiController
  def index
    user = current_api_v1_user.
      to_json(
        only: [:id, :name, :user_id],
        include: { relationships: { only: [:id, :interest_id] } }
      )
    if user
      render json: user
    else
      render_error_current_user_not_found
    end
  end

  def show
    user = User.
      find_by(user_id: params[:user_id])
    if user
      relationship_size = user.relationship_size
      show_user = user.as_json(only: [:id, :name, :user_id, :icon_image, :header_image]).merge(relationship_size)
      render json: show_user.to_json
    else
      render_error_user_not_found
    end
  end

  def account
    user = current_api_v1_user.to_json(only: [:name, :user_id, :email, :icon_image, :header_image])
    if user
      render json: user
    else
      render_error_current_user_not_found
    end
  end

  private

  def render_error_user_not_found
    render json: { errors: { full_messages: ['ユーザーがいません'] } }, status: :not_found
  end

  def render_error_current_user_not_found
    render json: { errors: { full_messages: ['ユーザー情報を読み込めませんでした'] } }, status: :internal_server_error
  end
end
