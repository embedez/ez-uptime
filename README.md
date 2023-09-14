# Ez Uptime
Cloudflare Pages/Workers based uptime

## Configuration
```yaml
# Things to track
track:
  google:
    - name: Google Search 
      url: "https://google.com/?q=test"
      
      #!!!!!!!!!  NOT IMPLEMENTED YET !!!!!!!!!#
      regions: #(Optional) check specific servers
        - NA-EST1: #Name of server
          url: https://est1.google.com?q=test #server ip
```

Click top left Here
<img src="https://i.imgur.com/Kp8YbpB.png">

Navigate To Settings
<img src="https://i.imgur.com/dwAsqSF.png">

Go to Environment variables
<img src="https://i.imgur.com/Tv2JNU8.png">

Click edit variables and add the following
```dotenv
# These are needed to link to cloudflare
CLOUDFLARE_NAMESPACE_ID=
CLOUDFLARE_KV_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# Crons /api/ping token
TOKEN=

# /settings page to make updates
AUTH_USERNAME=
AUTH_PASSWORD=
```



-------------------------


# Development
```dotenv
# These are needed to link to cloudflare
CLOUDFLARE_NAMESPACE_ID=
CLOUDFLARE_KV_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# Crons /api/ping token
TOKEN=

# /settings page to make updates
AUTH_USERNAME=
AUTH_PASSWORD=
```

## TODO:
Crons. I built this thinking that cloudflare crons was on workers and pages, yet it is only for pages.
The most simple solution is to make a worker set crons and ping this endpoint.