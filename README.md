# Ez Uptime
Cloudflare Pages/Workers based uptime

## Features
>
> <img src="https://i.imgur.com/M863jGb.png" height="300px"> <img src="https://i.imgur.com/MBRrDOE.png" height="300px"> <img src="https://i.imgur.com/LFLlULZ.png" height="300px">  <img src="https://i.imgur.com/wdUDKQH.png" height="300px">

# How to deploy

## Step one 
> fork the repo, and adjust the config.yml to specifications
> ```yaml
> # Things to track
> track:
>  google:
>    - name: Google Search 
>      url: "https://google.com/?q=test"
> ```
>
> Setup the page on cloudflare and then begin step 2

## Step Two (get CLOUDFLARE_NAMESPACE_ID)
> ![image](https://github.com/embedez/ez-uptime/assets/69170374/20e5bb48-3177-4c44-a727-9632e96b9105)
> ![image](https://github.com/embedez/ez-uptime/assets/69170374/9c811259-a45c-47cc-b8cd-b207c3a42061)
> ![image](https://github.com/embedez/ez-uptime/assets/69170374/5ce14e86-174c-49a6-b698-f14a4ffa9cfc)
> ![image](https://github.com/embedez/ez-uptime/assets/69170374/e5f89444-6763-4957-9b8e-654a71500335)
> ![image](https://github.com/embedez/ez-uptime/assets/69170374/95b74dc2-f109-4f01-a4dc-08edf3e9abdc)
> 
> That id is the CLOUDFLARE_NAMESPACE_ID

## Step three (set env vars)
>
>Click top left Here
>
> <img src="https://i.imgur.com/Kp8YbpB.png" height="300px">
>
> Navigate To Settings
> 
> <img src="https://i.imgur.com/dwAsqSF.png" height="300px">
>
> Go to Environment variables
> 
> <img src="https://i.imgur.com/Tv2JNU8.png" height="300px">
> 
> Click edit variables and add the following
> ```dotenv
> # These are needed to link to cloudflare (from cloudflare)
> CLOUDFLARE_NAMESPACE_ID=
> CLOUDFLARE_KV_API_TOKEN=
> CLOUDFLARE_ACCOUNT_ID=
> 
> # Crons /api/ping token (made up for crons trigger)
> TOKEN=
> 
> # /settings page to make updates (also made up)
> AUTH_USERNAME=
> AUTH_PASSWORD=
> 
> # / host url to get proper url for discord embed
> HOST_URL=https://example.com
> ```


## Step 4 (setup crons)
> currently there is no crons for pages. Use this as a workarround
>
> https://github.com/embedez/ez-cron 


Join the discord and make a support ticket if you need help https://discord.gg/cTjbQNr9M9

-------------------------


# Development
Fork the repo, make sure to get the cloudflare namespace id, kv api token, aswell as account id. 

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

# / host url to get proper url for discord embed
HOST_URL=https://example.com
```

`npm i && npm run dev`

## TODO:
Crons. I built this thinking that cloudflare crons was on workers and pages, yet it is only for pages.
The most simple solution is to make a worker set crons and ping this endpoint.
