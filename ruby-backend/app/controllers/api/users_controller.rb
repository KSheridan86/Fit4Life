module Api
    class UsersController < ApplicationController
        # skip_before_action :authenticate_user!, only: [:create]
        # before_action :authenticate_user!
        skip_before_action :verify_authenticity_token
        # protect_from_forgery with: :exception, unless: -> { request.format.json? }

        def show
            @user = User.includes(:profile).find(params[:id])
            render json: @user.as_json(include: :profile, only: [:id, :email, :username]), status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: { error: 'User not found' }, status: :not_found
        end

        def create
            user = User.new(user_params)
            if user.save
                sign_in(user)
                render json: user, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def destroy
            current_user.destroy
            render json: { message: 'User deleted successfully' }, status: :ok
        end

        private

        def user_params
            params.require(:user).permit(:username, :email, :password, :password_confirmation)
        end
    end
end