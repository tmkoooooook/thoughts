class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    redirect_to(users_path)
  end
end
