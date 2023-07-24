class HomeController < ApplicationController
  def index
    if user_signed_in?
      @current_user = current_user
      @profile = current_user.profile
      @workouts = current_user.workouts
    end
  end
end
