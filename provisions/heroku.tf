provider "heroku" {
  email   = var.heroku_email
  api_key = var.heroku_api_key
}

variable "heroku_api_key" {
}

variable "heroku_email" {
}

# Create new app
resource "heroku_app" "staging" {
  name   = "stagingmusicplayer"
  region = "eu"

  buildpacks = [
    "heroku/php",
  ]
}

# Create new app
resource "heroku_app" "production" {
  name   = "productionmusicplayer"
  region = "eu"

  buildpacks = [
    "heroku/php",
    "https://github.com/a2ikm/heroku-buildpack-libjpeg-turbo.git",
  ]
}

# Create a Heroku pipeline
resource "heroku_pipeline" "musicplayerpipeline" {
  name = "musicplayerpipeline"
}

# Couple apps to different pipeline stages
resource "heroku_pipeline_coupling" "staging" {
  app      = heroku_app.staging.name
  pipeline = heroku_pipeline.musicplayerpipeline.id
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "production" {
  app      = heroku_app.production.name
  pipeline = heroku_pipeline.musicplayerpipeline.id
  stage    = "production"
}
