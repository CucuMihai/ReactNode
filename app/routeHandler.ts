import http from "http";
import { sendRequest, handlePostData, getDataBasedOnRoute } from "./utils/request-utils";

const actions: any = {
    "GET": (req: http.IncomingMessage, res: http.ServerResponse, data?: any) => {
        // get content type and set it appropriately
        const contentType: http.OutgoingHttpHeaders = {"Content-Type": "text/html"};
        sendRequest(res, 200, data, contentType);
    },
    "POST": (req: http.IncomingMessage, res: http.ServerResponse) => {
        handlePostData(req)
            .then((data) => {
                sendRequest(res, 200, data, {"Content-Type": "text/plain"});
            })
            .catch((reason: any) => {
                sendRequest(res, 500, reason.toString(), {"Content-Type": "text/plain"});
            });
    }
};

export function handleRoute(req: http.IncomingMessage, res: http.ServerResponse, routePathName: string): void {
    const action: (req: http.IncomingMessage, res: http.ServerResponse, data: any) => void = actions[req.method];

    if (action) {

        getDataBasedOnRoute(routePathName).then((data) => {
            action(req, res, data);
        }).catch(reason => {
            sendRequest(res, 404, reason, {"Content-Type": "text/plain"});
        });
    } else {
        sendRequest(res, 404, "Not Found", {"Content-Type": "text/plain"});
    }
}
