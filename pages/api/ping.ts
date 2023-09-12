import {Cloudflare} from "@/app/store";

import userConfig from '../../config.yml'
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {NextFetchEvent, NextRequest} from "next/server";

const cloudflare = new Cloudflare()

export const config = {
    runtime: 'experimental-edge',
}

export interface status {
    description: string;
    code: number;
    type: 'success' | 'warning' | 'error' | 'nothing';
}


async function statsticalFetch(url: string): Promise<status> {
    const abortController = new AbortController();
    const id = setTimeout(() => abortController.abort(), 10000);

    try {
        let res = await fetch(url, {
            signal: abortController.signal
        });
        return {
            description: res.statusText,
            code: res.status,
            type: res.status >= 200 && res.status < 300 ? 'success' : res.status >= 300 && res.status < 400 ? 'warning' : 'error' as 'success' | 'warning' | 'error'
        }
    } catch (err) {
        clearTimeout(id);
        // @ts-ignore
        if (err.name === 'AbortError') {
            return {description: 'Request timed out', code: 0, type: 'error'};
        } else {
            // @ts-ignore
            return {description: err.message, code: 504, type: 'error'};
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
            type: "error"
        }), {
            status: 403,
            statusText: 'Forbidden'
        })
    }

    const everything: any[] = []
    try {
        for (const [name, value] of Object.entries(userConfig.track)) {
            console.log(name)
            let data = await cloudflare.get(name)
            data = data.filter((t:status) => t.type !== 'nothing')

            let status: status[] = Array(30).fill(null).map((e, i) => data[i] || {
                type: 'nothing',
                code: 0,
                description: "",
            } as status).reverse();

            for (const v of value) {
                status.push(
                    await statsticalFetch(v.url)
                )
            }

            status = status.slice(-60)
            cloudflare.put(name, JSON.stringify(status))
            everything.push(status)
        }
    } catch (e) {
        console.log(e)
    }

    return new Response(JSON.stringify(everything))
}

export default ping