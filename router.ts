import auth from "./auth";

export async function router(req: Request): Promise<Response> {
    const url : URL = new URL(req.url)
    const method: string = req.method
    console.log(`${method}: ${url.pathname}`)
    
    if(method === "GET") {
        if(url.pathname === "/") {
            return new Response(Bun.file("./index.html"))
        }
        if(url.pathname === "/build/client.js") {
            return new Response(Bun.file("./build/client.js"))
        }
    }
    if(method === "POST") {
        if(url.pathname === "/login") {
            const body = await req.json() as any;
            const userId = body.userId
            const password = body.password
            console.log(userId, password);
            const cookie = await auth.attemptLoginAndGetCookie(userId, password);
            return new Response(null, {headers: {'Set-Cookie':cookie}});
        }
        if(url.pathname === "/verify") {
            console.log(req.headers);
            const cookie = req.headers.get('cookie')
            
            console.log(auth.attemptCookieDecryption(cookie));
            return new Response("Ok");
        }
    }
    return Response.error()
}
