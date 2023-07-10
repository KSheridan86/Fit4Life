class RegistrationsController < Devise::RegistrationsController
    before_action :configure_permitted_parameters

    def create
        super do |resource|
            build_profile(resource) if resource.persisted? # Build profile after user registration
        end
    end

    def update
        super do |resource|
            build_profile(resource) if resource.profile.nil? # Build profile if it doesn't exist
        end
    end

    private

    def build_profile(resource)
        resource.build_profile(profile_params)
    end

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, profile_attributes: [:name, :age, :height, :weight, :sex, :target_weight, :target_date]])
        devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :current_password, profile_attributes: [:name, :age, :height, :weight, :sex, :target_weight, :target_date]])
    end

    def profile_params
        params.require(:user).require(:profile).permit(:name, :age, :height, :weight, :sex, :target_weight, :target_date)
    end
end
