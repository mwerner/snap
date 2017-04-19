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
  get '/snap' do
    authorize!
    erb :camera
  end

  post '/camera' do
    authorize!
    image = File.new(params[:image][:tempfile])
    response = Cloudinary::Uploader.upload image.path, settings.cloudinary_api

    snap = current_user.snaps.create(image_url: response['url'])
    SnapSend.create(user_id: current_user.id, receiver_id: params[:reciever_id], snap_id: snap.id)
    200
  end

  # Messaging
  get '/chat' do
    authorize!
    @users = current_user.leaders
    erb :chat
  end

  # Relationships
  put '/users/:id/follow/:username' do
    leader = User.where(username: params[:username]).first
    current_user.start_following(leader)
    redirect '/chat'
  end

  # Stories
  get '/stories' do
    authorize!
    @users = current_user.leaders
    erb :stories
  end

  get '/story/:username' do
    @user = User.where(username: params[:username]).first
    @stories = @user.stories.to_a
    erb :story
  end
end
