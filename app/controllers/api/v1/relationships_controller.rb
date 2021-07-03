class Api::V1::RelationshipsController < ApiController
  before_action :set_user

  def create
    interesting = current_user.interested_in(@user)
    if interesting.save
      render json: { status: 200 }
    else
      render json: { status: 500, message: "something wrong…" }
    end
  end

  def destroy
    interesting = current_user.uninterested_in(@user)
    if interesting.destroy
      render json: { status: 200 }
    else
      render json: { status: 500, message: "something wrong…" }
    end
  end
  private

  def set_user
    @user = User.find(params[:relationship][:interest_id])
  end
end
