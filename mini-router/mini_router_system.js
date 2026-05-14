export function createRouter() {
    const routes = [];

    function register(method, path, handler) {
        routes.push({ method, path, handler });
    }

    function get(path, handler) {
        register("GET", path, handler);
    }

    function post(path, handler) {
        register("POST", path, handler);
    }

    function handle(req, res) {
        const { method, url } = req;

        const route = routes.find(
            r => r.method === method && r.path === url
        );

        if (route) {
            route.handler(req, res);
        } else {
            res.statusCode = 404;
            res.end("Page not Found");
        }
    }

    return { get, post, handle };
}