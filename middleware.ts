import { NextRequest, NextResponse } from 'next/server'

export const config = {
    matcher: '/settings',
}

export function middleware(req: NextRequest) {
    if (!req.headers.get('authorization')) {
        return new NextResponse(null, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }});
    }

    console.log(req.headers.get('authorization'));

    let auth: string = '';

    try {
        auth = atob((req.headers.get('authorization') || '').split(' ')[1]);
    } catch (e) {
        console.log(e);
    }

    const [username, password] = auth.split(':');

    if (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD) {
        const headers = new Headers();
        headers.set(
            'WWW-Authenticate',
            'Basic realm="Secure Area", error="invalid_token", error_description="The access token expired"'
        );
        return new NextResponse(null, { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Secure Area", error="invalid_token", error_description="The access token expired"' }});
    }

    // proceed to the next middleware / actual handler
    return NextResponse.next();
}