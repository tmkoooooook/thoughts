class ThoughtsController < ApplicationController
  def show
    @thought = Thought.find(params[:id])
  end

  def new
    @thought = Thought.new
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
