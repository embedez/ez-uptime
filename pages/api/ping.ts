import {Cloudflare} from "@/app/store";

import userConfig from '../../config.yml'

const cloudflare = new Cloudflare()

export const config = {
    runtime: 'edge',
}

export interface statusType {
    description: string;
    code: number;
    type: 'success' | 'warning' | 'error' | 'nothing';
    timestamp: number,
}


async function statsticalFetch(url: string): Promise<statusType> {
    const abortController = new AbortController();
    const id = setTimeout(() => abortController.abort(), 10000);

    try {
        let res = await fetch(url, {
            signal: abortController.signal
        });
        return {
            description: res.statusText,
            code: res.status,
            type: res.status >= 200 && res.status < 300 ? 'success' : res.status >= 300 && res.status < 400 ? 'warning' : 'error' as 'success' | 'warning' | 'error',
            timestamp: new Date().getTime(),
        }
    } catch (err) {
        clearTimeout(id);
        // @ts-ignore
        if (err.name === 'AbortError') {
            return {description: 'Request timed out', code: 0, type: 'error', timestamp: new Date().getTime()};
        } else {
            // @ts-ignore
            return {description: err.message, code: 504, type: 'error', timestamp: new Date().getTime()};
        }
    }
}

const ping = async (
    event: Request,
) => {
    const { searchParams } = new URL(event.url)
    const token = searchParams.get('token')
    if (token !== process.env.TOKEN) { // I need a better method but this is MAD simple
        return new Response(JSON.stringify({
            description: "Forbidden",
            code: 403,
            type: "error",

        }), {
            status: 403,
            statusText: 'Forbidden'
        })
    }

    const everything: any[] = []
    const promiseArray: Promise<any>[] = [];

    try {
        for (const [name, value] of Object.entries(userConfig.track)) {
            console.log(name)
            let data = await cloudflare.get(name);
            data = Array.isArray(data) ? data?.filter((t:statusType) => t.type !== 'nothing') : [];

            const statusPromises = value.map((v) => statsticalFetch(v.url));

            let status: statusType[] = Array(30).fill(null).map((e, i) => data[i] || {
                type: 'nothing',
                code: 0,
                description: "",
            } as statusType).reverse();

            status = status.concat(await Promise.all(statusPromises));
            status = status.slice(-60);

            console.log(name)
            promiseArray.push(cloudflare.put(name, JSON.stringify(status)));
            everything.push(status);
        }

        await Promise.all(promiseArray);
    } catch (e) {
        console.log(e)
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Response(JSON.stringify(everything), { headers: headers })
}

export default ping