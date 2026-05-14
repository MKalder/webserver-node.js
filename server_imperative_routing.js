import http from "http";

const port = 3004;

const server = http.createServer((req, res) => {
    console.log("HTTP Request:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    //Simple Routing "Websites"
    if (req.method === "GET" && req.url === "/") {
        res.end("<h1>Home</h1>");
        return;
    }

    else if (req.method === "GET" && req.url === "/about") {
        res.end("<h1>About</h1>");
        return;
    }

    //JSON Response
    else if (req.method === "GET" && req.url === "/api/user") {
        res.setHeader("Content-Type", "application/json");

        const user = {
            name: "Marius",
            role: "Senior Full Stack Developer"
        };

        res.end(JSON.stringify(user));
        return;
    }

    //POST Method
    if (req.method === "POST" && req.url === "/api/data") {
        let body = "";
        console.log("POST Method");

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const parsed = JSON.parse(body);

            console.log("Parsed: " + parsed);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                status: "received",
                yourData: parsed
            }));
        });
        return;
    }

    //404 Error - Page not found
    else {
        res.statusCode = 404;
        res.end("<h1>Not Found</h1>");
        return;
    }
});

server.on("connection", (socket) => {
    console.log("TCP Connection established");
});

server.listen(port, () => {
    console.log("Server is running");
});