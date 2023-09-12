import {Cloudflare} from "@/app/store";
import {NextApiRequest, NextApiResponse} from "next";

export const config = {
    runtime: 'experimental-edge',
}


const cloudflare = new Cloudflare()

const get = async ( event: Request ) => {
    const { searchParams } = new URL(event.url)
    const name = searchParams.get('name')

    return new Response(JSON.stringify(await cloudflare.get(name as string)))
}

export default get