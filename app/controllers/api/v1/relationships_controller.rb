class Api::V1::RelationshipsController < ApiController
  before_action :set_user, only: [:create, :destroy]

  def create
    interesting = current_api_v1_user.interested_in(@user)
    if interesting.save
      render json: { status: 200 }
    else
      render json: { status: 500, message: 'something wrong…' }
    end
  end

  def destroy
    interesting = current_api_v1_user.uninterested_in(@user)
    if interesting.destroy
      render json: { status: 200 }
    else
      render json: { status: 500, message: 'something wrong…' }
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
end
