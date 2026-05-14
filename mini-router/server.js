import http from "http";
import { createRouter } from "./mini_router_system.js";

const router = createRouter();
const port = 3005;

// ROUTES
router.get("/", (req, res) => {
    res.end("<h1>Home</h1>");
});

router.get("/about", (req, res) => {
    res.end("<h1>About</h1>");
});

router.get("/api/user", (req, res) => {
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        name: "Marius",
        role: "Developer"
    }));
});

router.post("/api/data", (req, res) => {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
        const parsed = JSON.parse(body);

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            status: "received",
            data: parsed
        }));
    });
});

// SERVER
const server = http.createServer((req, res) => {
    router.handle(req, res);
});

server.listen(port, () => {
    console.log("Server running");
});