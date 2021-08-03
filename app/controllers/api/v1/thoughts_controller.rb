class Api::V1::ThoughtsController < ApiController
  rescue_from ActiveRecord::RecordNotFound do
    render json: { error: '404 not found' }, status: :not_found
  end

  def index
    thoughts = Thought.
      where(user_id: [current_api_v1_user.id, *current_api_v1_user.interest_ids]).
      includes(:user).
      to_json(include: { user: { only: [:name, :user_id, :icon_image] } })
    render json: thoughts
  end

  def show
    user = User.find_by(user_id: params[:id])
    thoughts = Thought.
      where(user_id: user.id).
      includes(:user).
      to_json(include: { user: { only: [:name, :user_id, :icon_image] } })
    render json: thoughts
  end

  def create
    thought = Thought.new(thought_params)
    thought.shorted_text = thought.text.slice(...50)
    thought.user_id = current_api_v1_user.id
    if thought.save
      render json: { status: 200 }
    else
      render json: { status: 500, message: 'something wrong…' }
    end
  end

  def destroy
    thought = Thought.find(params[:id])
    if thought.destroy
      render json: { status: 200 }
    else
      render json: { status: 500, message: 'something wrong…' }
    end
  end

  private

  def thought_params
    params.require(:thought).permit(:title, :text, :shorted_text, :user_id)
  end
end
