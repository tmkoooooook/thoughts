class Api::V1::RelationshipsController < ApiController
  before_action :set_user, only: [:create, :destroy]

  def create
    interesting = current_api_v1_user.interested_in(@user)
    if interesting.save
      render json: { message: ['thoughtを投稿しました'] }
    else
      render_error_create_relationship
    end
  end

  def destroy
    interesting = current_api_v1_user.uninterested_in(@user)
    if interesting.destroy
      render json: { message: ['thoughtを削除しました'] }
    else
      render_error_destroy_relationship
    end
  end

  def interests
    user = User.find_by(user_id: params[:user_id])
    interests = user.interests
    render json: interests.to_json
  end

  def interesters
    user = User.find_by(user_id: params[:user_id])
    interesters = user.interesters
    render json: interesters.to_json
  end

  private

  def set_user
    @user = User.find(params[:relationship][:interest_id])
  end

  def render_error_create_relationship
    render json: { errors: { full_messages: ['interestsに登録できませんでした。時間をおいてもう一度お試しください'] } }, status: 500
  end

  def render_error_destroy_relationship
    render json: { errors: { full_messages: ['interestsを削除できませんでした。時間をおいてもう一度お試しください'] } }, status: 500
  end
end
