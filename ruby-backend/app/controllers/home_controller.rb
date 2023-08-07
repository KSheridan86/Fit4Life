class HomeController < ApplicationController
  def index
    if user_signed_in?
      @current_user = current_user
      @profile = current_user.profile
    end
  end
end
