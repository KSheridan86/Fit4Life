module Api
    class ProfilesController < ApplicationController
        before_action :authenticate_user!
        before_action :set_current_user
        # before_action :set_profile, only: [:show, :update, :destroy]
        skip_before_action :verify_authenticity_token
        # protect_from_forgery with: :exception, unless: -> { request.format.json? }

        def index
            @profiles = current_user.profiles
            render json: @profiles
        end

        def show
            @profile = current_user.profiles.find(params[:id])
            render json: @profile
        end

        # def create
        #     @profile = current_user.build_profile(profile_params)
        #     if @profile.save
        #         render json: @profile, status: :created
        #     else
        #         render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
        #     end
        # end

        def create
            if current_user
                puts "Current User: #{current_user.email}" # Add this line for debugging
                @profile = current_user.build_profile(profile_params)
                if @profile.save
                    render json: @profile, status: :created
                else
                    render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
                end
            else
                render json: { error: 'User not authenticated' }, status: :unauthorized
            end
        end
          

        def update
            puts "Current User: #{current_user.email}" # Add this line for debugging
            @profile = current_user.profile
            if @profile.update(profile_params)
                render json: @profile
            else
                render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def destroy
            @profile = current_user.profile
            puts "Current User: #{current_user.email}" # Add this line for debugging
            puts "Profile ID to delete: #{params[:id]}" # Add this line for debugging
            if @profile.nil?
                puts "Profile not found!" # Add this line for debugging
            else
                @profile.destroy
            end
            
            head :no_content
        end
        

        private

        def set_profile
            @profile = current_user.profile
        end

        def set_current_user
            @current_user ||= User.find_by(authentication_token: request.headers['Authorization'])
            puts "Current User from Token: #{@current_user&.email}" # Add this line for debugging
        end

        
        # def set_current_user
        #     @current_user ||= User.find_by(authentication_token: request.headers['Authorization'])
        # end

        def profile_params
            params.require(:profile).permit(:age, :height, :weight, :gender, :goal_weight, :goal_time_frame)
        end
    end
end
