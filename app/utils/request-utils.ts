import http from "http";
import fs from "fs";

export function sendRequest(response: http.ServerResponse, statusCode: number, data: any, headers: http.OutgoingHttpHeaders): void {
    response.writeHead(statusCode, headers);
    response.end(data);
}

export function handlePostData(request: http.IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let data: string = "";
        try {
            request.on("data", (chunk: string) => {
                data += chunk;
            });
            request.on("end", () => {
                resolve(data);
            });
        } catch(ex) {
            console.error(ex);
            reject(ex);
        }
    });
}

export function getDataBasedOnRoute(pathName: string): Promise<any> {
    const routeToFile: { [key: string]: string } = {
        "/": "./index.html",
        "/list": "./index.html",
    };

    return new Promise((resolve, reject) => {
        try {
            fs.readFile(routeToFile[pathName], (err: NodeJS.ErrnoException, data: Buffer) => {
                if (err) {
                    throw new Error(err.message);
                }
                resolve(data);
            });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}
