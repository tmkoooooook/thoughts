class Api::V1::ThoughtsController < ApiController
  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { error: '404 not found' }, status: 404
  end

  def index
    thoughts = current_user.thoughts
    render json: thoughts
  end

  def new
    thought = Thought.new
  end

  def create
    thought = Thought.new(thought_params)
    thought.shorted_text = thought.text.slice(...50)
    thought.save!
    redirect_to users_path, notice: "thoughtしました"
  end

  def destroy
    thought = Thought.find(params[:id])
    thought.destroy!
    redirect_to users_path, notice: "thoughtを取り消しました"
  end

  private

  def thought_params
    params.require(:thought).permit(:title, :text, :shorted_text, :user_id)
  end
end
