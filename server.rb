require 'sinatra/rider'

class Server < Sinatra::Base
  register Sinatra::Rider

  get '/' do
    # authorize!
    erb :index
  end
end
