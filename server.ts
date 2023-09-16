import { router } from "./router";
Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
        return router(req);
    }
})