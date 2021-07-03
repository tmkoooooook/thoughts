class Api::V1::ThoughtsController < ApiController
  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { error: '404 not found' }, status: 404
  end

  def index
    thoughts = Thought.includes(:user).all.to_json(include: {user: {only: [:name, :user_id]}})
    render json: thoughts
  end

  def create
    thought = Thought.new(thought_params)
    thought.shorted_text = thought.text.slice(...50)
    thought.user_id = current_user.id
    if thought.save
      redirect_to users_path, notice: "thoughtしました"
    else
      redirect_to users_path, alert: "something wrong…"
    end
  end

  def destroy
    thought = Thought.find(params[:id])
    if thought.destroy
      render json: { status: 200 }
    else
      render json: { status: 500, message: "something wrong…" }
    end
  end

  private

  def thought_params
    params.require(:thought).permit(:title, :text, :shorted_text, :user_id)
  end
end
