import http from "http";

const port = 3003;

//Route Key
const getRouteKey = (req) => `${req.method} ${req.url}`;

//Route Map (dispatch pattern)
const routes = {
    "GET /": (req, res) => {
        res.end("<h1>Home</h1>");
    },

    "GET /about": (req, res) => {
        res.end("<h1>About</h1>");
    },

    "GET /api/user": (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            name: "Marius",
            role: "Senior Full Stack Developer"
        }));
    }
};

const server = http.createServer((req, res) => {
    console.log("HTTP Request:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    // POST seperate due to stream
    if (req.method === "POST" && req.url === "/api/data") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const parsed = JSON.parse(body);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                status: "received",
                yourData: parsed
            }));

        });
        return;
    }

    // GET Routing via map
    const routeKey = getRouteKey(req);
    const handler = routes[routeKey];

    if (handler) {
        handler(req, res);

    } else {
        res.statusCode = 404;
        res.end("<h1>Not Found</h1>");

    }

});

server.on("connection", (socket) => {
    console.log("TCP Connection established");
});

server.listen(port, () => {
    console.log("Server is running");
});