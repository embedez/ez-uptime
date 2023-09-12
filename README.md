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