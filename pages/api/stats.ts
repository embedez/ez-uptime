import {Cloudflare} from "@/app/store";

import userConfig from '../../config.yml'
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {NextFetchEvent, NextRequest} from "next/server";

const cloudflare = new Cloudflare()

export const config = {
    runtime: 'edge',
}

export interface statusType {
    description: string;
    code: number;
    type: 'success' | 'warning' | 'error' | 'nothing';
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
            let data = await cloudflare.get(name)
            data = Array.isArray(data) ? data?.filter((t:statusType) => t.type !== 'nothing') : []

            let status: statusType[] = Array(30).fill(null).map((e, i) => data[i] || {
                type: 'nothing',
                code: 0,
                description: "",
            } as statusType).reverse();

            status = status.slice(-60)
            everything.push({
                name,
                status
            })
        }
    } catch (e) {
        console.log(e)
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new Response(JSON.stringify(everything), { headers: headers })
}

export default ping