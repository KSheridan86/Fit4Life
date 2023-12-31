Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'https://fit4-life.vercel.app'  # Replace this with the domain of your React frontend
        resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :destroy, :options, :head], credentials: true, expose: ['X-CSRF-Token']
    end
end