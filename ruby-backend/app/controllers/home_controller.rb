class HomeController < ApplicationController
  def index
    if user_signed_in?
      @profile = current_user.profile
    end
  end
end
