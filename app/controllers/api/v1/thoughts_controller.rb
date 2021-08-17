class Api::V1::ThoughtsController < ApiController
  rescue_from ActiveRecord::RecordNotFound do
    render json: { error: '404 not found' }, status: :not_found
  end

  def index
    thoughts = Thought.
      preload(:user).
      where(user_id: [current_api_v1_user.id, *current_api_v1_user.interest_ids]).
      to_json(include: { user: { only: [:name, :user_id, :icon_image] } })
    render json: thoughts
  end

  def show
    thoughts = Thought.
      eager_load(:user).
      where(user: {user_id: params[:id]}).
      to_json(include: { user: { only: [:name, :user_id, :icon_image] } })
    render json: thoughts
  end

  def create
    thought = Thought.new(thought_params)
    thought.shorted_text = thought.text.slice(...50)
    thought.user_id = current_api_v1_user.id
    if thought.save
      render json: { message: ['thoughtを投稿しました'] }
    else
      render_error_create_thought
    end
  end

  def destroy
    thought = Thought.find(params[:id])
    if thought.destroy
      render json: { message: ['thoughtを削除しました'] }
    else
      render_error_destroy_thought
    end
  end

  private

  def thought_params
    params.require(:thought).permit(:title, :text, :shorted_text, :user_id)
  end

  def render_error_create_thought
    render json: { errors: { full_messages: ['thoughtを投稿できませんでした。時間をおいてもう一度お試しください'] } }, status: 500
  end

  def render_error_destroy_thought
    render json: { errors: { full_messages: ['thoughtを削除できませんでした。時間をおいてもう一度お試しください'] } }, status: 500
  end
end
