import {Cloudflare} from "@/app/store";

const cloudflare = new Cloudflare();

export const config = {
    runtime: 'edge',
};

const ping = async (
    event: Request,
) => {
    if (event.method !== 'GET') return new Response(JSON.stringify({
        description: 'wrong method, please use GET'
    }));

    let auth: string = '';

    try {
        auth = atob((event.headers.get('authorization') || '').split(' ')[1]);
    } catch (e) {
        console.log(e);
    }

    const [username, password] = auth.split(':');

    const url = new URL(event.url);
    const token = url.searchParams.get('token');
    const id = url.searchParams.get('id')

    if (token !== process.env.TOKEN && (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD)) {
        return new Response(JSON.stringify({
            description: "Forbidden",
            code: 403,
            type: "error"
        }), {
            status: 403,
            statusText: 'Forbidden'
        });
    }

    let notices: {
        key: string,
        name: string,
        description: string,
        timestamp: {
            start: number,
            end: number
        },
        id: string,
    }[] = [];

    const cloudflareArray = await cloudflare.get('notice');
    if (Array.isArray(cloudflareArray)) notices = cloudflareArray;

    notices = notices.filter(n => n.id !== id)

    await cloudflare.put('notice', JSON.stringify(notices));

    return new Response(JSON.stringify(notices));
}

export default ping;