Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
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
        
        return new Response(Bun.file("error.html"))
    }
})