import {Cloudflare} from "@/app/store";

const cloudflare = new Cloudflare()

export const config = {
    runtime: 'experimental-edge',
}

const ping = async (
    event: Request,
) => {
    if (event.method !== 'POST') return new Response(JSON.stringify({
        description: 'wrong method, please post'
    }))

    let auth: string = '';

    try {
        auth = atob((event.headers.get('authorization') || '').split(' ')[1]);
    } catch (e) {
        console.log(e);
    }

    const [username, password] = auth.split(':');

    const { searchParams } = new URL(event.url)
    const token = searchParams.get('token')
    if (token !== process.env.TOKEN && (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD)) { // I need a better method but this is MAD simple
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
    const cloudflareArray = await cloudflare.get('notice')
    if (Array.isArray(cloudflareArray)) notices = cloudflareArray

    const body = await event.json();
    notices.push(body);


    cloudflare.put('notice', JSON.stringify(notices))

    return new Response(JSON.stringify(notices))
}

export default ping