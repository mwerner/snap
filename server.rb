require 'sinatra/rider'
require_relative 'environment'
require 'pry'
# # require 'paperclip'

# Cloudinary.configure(YAML.file_load('config/cloudinary'))

class Server < Sinatra::Base
  register Sinatra::Rider

  configure do
    set :cloudinary_api, {
      api_key: ENV['CLOUDINARY_API_KEY'],
      api_secret: ENV['CLOUDINARY_API_SECRET'],
      cloud_name: ENV['CLOUDINARY_CLOUD_NAME']
    }
  end

  get '/' do
    erb :index
  end

  # Camera
  get '/camera' do
    authorize!
    erb :camera
  end

  post '/camera' do
    authorize!
    path = '/Users/matthewwerner/Downloads/image.png'
    data = params[:image]
    puts params.inspect
    # File.open(path, 'wb') { |f| f.write(data[:tempfile].read) }
    # response = Cloudinary::Uploader.upload data[:tempfile].path, settings.cloudinary_api
    image = File.new(params[:image][:tempfile])
    response = Cloudinary::Uploader.upload image.path, settings.cloudinary_api

    snap = current_user.snaps.create(image_url: response['url'])
    SnapSend.create(user_id: current_user.id, receiver_id: params[:reciever_id], snap_id: snap.id)

    'ok'
  end

  # Messaging
  get '/messages' do
    authorize!
    erb :messages
  end

  # Relationships
  put '/users/:id/follow/:leader_id' do |leader_id|

  end

  # Stories
  get '/stories' do
    authorize!
    @users = current_user.leaders
    erb :stories
  end
end
