import http from "http";
import url from "url";
import { handleRoute } from "./routeHandler";
import { sendRequest } from "./utils/request-utils";

const routes: any = {
    "/": (req: http.IncomingMessage, res: http.ServerResponse): void => {
        handleRoute(req, res, "/");
    },
    "/list": (req: http.IncomingMessage, res: http.ServerResponse): void => {
        handleRoute(req, res, "/list");
    }
};

const PORT: number = 8282;
const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const urlParts: url.UrlWithStringQuery = url.parse(req.url);
    const currentRoute: (req: http.IncomingMessage, res: http.ServerResponse) => void = routes[urlParts.pathname];

    if (currentRoute) {
        currentRoute(req, res);
    } else {
        sendRequest(res, 404, "Not Found", {"Content-Type": "text/plain"});
    }
});

server.listen(PORT, () => {
    console.log("listening on port", PORT);
});