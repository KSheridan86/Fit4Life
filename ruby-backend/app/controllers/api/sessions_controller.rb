module Api
    class SessionsController < ApplicationController
        skip_before_action :verify_authenticity_token
        def create
            user = User.find_by(email: params[:user][:email])

            if user&.valid_password?(params[:user][:password])
                sign_in(user)
                render json: { message: 'Logged in successfully!', user: user }
            else
                render json: { error: 'Invalid email or password' }, status: :unauthorized
            end
        end

        def destroy
            sign_out current_user
            render json: { message: 'Logged out successfully!' }
        end
    end
end

