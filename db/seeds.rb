require 'sinatra/rider'
Dir.glob(File.join(__dir__, '..', 'app/*.rb')).each { |f| require f }

matt = User.create(name: 'Matt', username: 'matt', password: 'password')
dan  = User.create(name: 'Dan', username: 'dan', password: 'password')
jane = User.create(name: 'Jane', username: 'jane', password: 'password')

matt.start_following(jane)
