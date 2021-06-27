class UsersController < ApplicationController
  def index
    @thoughts = current_user.thoughts
    @user = User.all.to_a
  end

  def show

  end
end
