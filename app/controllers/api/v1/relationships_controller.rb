class Api::V1::RelationshipsController < ApiController
  before_action :set_user, only: [:create, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :render_error_interest_user_not_found

  def create
    interesting = current_api_v1_user.interested_in(@user)
    if interesting.save
      render json: { message: ['interestsを登録しました'] }
    else
      render_error_create_relationship
    end
  end

  def destroy
    interesting = current_api_v1_user.uninterested_in(@user)
    if interesting.destroy
      render json: { message: ['interestsを解除しました'] }
    else
      render_error_destroy_relationship
    end
  end

  def interests
    user = User.find_by(user_id: params[:user_id])
    interests_json = user.interests.to_json(only: [:id, :user_id, :name, :icon_image])
    render json: interests_json
  end

  def interesters
    user = User.find_by(user_id: params[:user_id])
    interesters_json = user.interesters.to_json(only: [:id, :user_id, :name, :icon_image])
    render json: interesters_json
  end

  private

  def set_user
    @user = User.find(params[:relationship][:interest_id])
  end

  def render_error_interest_user_not_found
    render json: { errors: { full_messages: ['対象のユーザーが見つかりませんでした'] } }, status: :not_found
  end

  def render_error_create_relationship
    render json: { errors: { full_messages: ['interestsに登録できませんでした。時間をおいてもう一度お試しください'] } }, status: :internal_server_error
  end

  def render_error_destroy_relationship
    render json: { errors: { full_messages: ['interestsを削除できませんでした。時間をおいてもう一度お試しください'] } }, status: :internal_server_error
  end
end
