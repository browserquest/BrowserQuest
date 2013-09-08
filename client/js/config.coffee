define ["text!../config/config_build.json"], (build) ->
  config =
    dev:
      host: "localhost"
      port: 8000
      dispatcher: false

    build: JSON.parse(build)

  
  #>>excludeStart("prodHost", pragmas.prodHost);
  require ["text!../config/config_local.json"], (local) ->
    try
      config.local = JSON.parse(local)

  
  # Exception triggered when config_local.json does not exist. Nothing to do here.
  
  #>>excludeEnd("prodHost");
  config

