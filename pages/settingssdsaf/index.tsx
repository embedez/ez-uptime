import { GetServerSideProps, NextPage } from 'next'

const HomePage: NextPage<{ authenticated: boolean }> = ({ authenticated }) => {
    if (!authenticated) return <p className={'min-h-screen bg-background'}>not authed</p>
    return <div className={'min-h-screen bg-black bg-background'}>
        <p className={'min-h-screen bg-background'}> authed</p>
    </div>

}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    if (!req.headers.authorization) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
        res.statusCode = 401
        return { props: { authenticated: false } }
    }

    console.log(req.headers.authorization)
    let auth: string = ""
    try {
        auth = atob(req.headers.authorization.split(" ")[1] || "")
    } catch (e) {
        console.log(e)
    }

    const [username, password] = auth.split(':');

    if (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area", error="invalid_token", error_description="The access token expired"')
        res.statusCode = 401
        return { props: { authenticated: false } }
    }

    return { props: { authenticated: true } }
}

export default HomePage