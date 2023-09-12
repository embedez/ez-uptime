import {Cloudflare} from "@/app/store";

const cloudflare = new Cloudflare()

export const config = {
    runtime: 'experimental-edge',
}

const ping = async (
    event: Request,
) => {
    if (event.method !== 'post') return new Response(JSON.stringify({
        description: 'wrong method, please post'
    }))

    const { searchParams } = new URL(event.url)
    const token = searchParams.get('token')
    if (token !== process.env.TOKEN) { // I need a better method but this is MAD simple
        return new Response(JSON.stringify({
            description: "Forbidden",
            code: 403,
            type: "error"
        }), {
            status: 403,
            statusText: 'Forbidden'
        })
    }

    let notices: {
        key: string,
        name: string,
        description: string,
        timestamp: {
            start: number,
            end: number
        }
    }[] = []
    notices = await cloudflare.get('notice')

    const body = await event.json();
    notices.push(body.notice);


    cloudflare.put('notice', JSON.stringify(notices))

    return new Response(JSON.stringify(notices))
}

export default ping