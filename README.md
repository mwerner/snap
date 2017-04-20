# Snapchat

Tutorial starter project to give participants a chance to work with various technologies in a familiar product.

## Getting Started

The application runs a Sinatra webserver, Postgres db and simple jQuery.

First, you'll need to setup a Cloudinary account and include your credentials in a `.env` file in the root dir:
```
# snap/.env
CLOUDINARY_API_KEY=5272939274261019
CLOUDINARY_API_SECRET=2tyNKoDX23S1A1P_ZCusoVQF_j
CLOUDINARY_CLOUD_NAME=mycloud
```

Then, prepare your machine with the code and a database (using [brew](https://brew.sh))

```
brew install postgresql
brew services start postgresql

git clone git@github.com:mwerner/snap.git
cd snap

bundle install
bundle exec db:create db:migrate
bundle exec shotgun
```

Then you can visit your site! [http://localhost:9393](http://localhost:9393)

## Available improvements

- Fix the Camera and Preview styling to fit the viewframe correctly
- Break the Javascript into separate files or replace with React
- Implement Chat in place of your friends list
- Add text overlays
- Add photo filters
- Add viewing duration limits and automatic story progression
- Add video capture
- Allow sending snaps to specific people
- Anything else you want to improve!
