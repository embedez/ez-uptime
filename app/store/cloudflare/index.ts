
class Cloudflare {
    private accountId!: string;
    private namespaceId!: string;

    constructor(config?: {
        accountId?: string,
        namespaceId?: string,
    }) {
        const errors: string[] = []
        if (config?.accountId) this.accountId = config.accountId;
        else if (!!process.env.CLOUDFLARE_ACCOUNT_ID) this.accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
        else errors.push("Please specify CLOUDFLARE_ACCOUNT_ID in .env file")

        if (config?.namespaceId) this.accountId = config.namespaceId;
        else if (!!process.env.CLOUDFLARE_NAMESPACE_ID) this.namespaceId = process.env.CLOUDFLARE_NAMESPACE_ID;
        else errors.push("Please specify cloudflare CLOUDFLARE_NAMESPACE_ID in .env file")

        console.log(errors)
        if (errors.length > 0) throw errors
    }

    endpoint = (
        key: string,
        accountId: string = this.accountId,
        namespaceId: string = this.namespaceId
    ) =>
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`;

    get = async (name: string) => await fetch(this.endpoint(name), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
            "Content-Type": "application/json",
        }
    }).then(response => response.json())

    put = async (name: string, data: any) => await fetch(this.endpoint(name), {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: data
    }).then(response => response.json())
}

export default Cloudflare