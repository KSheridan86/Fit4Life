module Api
    class UsersController < ApplicationController
        before_action :authenticate_user!

        def show
            @user = User.includes(:profile).find(params[:id])
            render json: @user.as_json(include: :profile, only: [:id, :email, :username]), status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'User not found' }, status: :not_found
        end
    end
end