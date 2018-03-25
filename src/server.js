import Hapi from "hapi";

import Request from "./utilities/Request";

const server = Hapi.server({
    host: "0.0.0.0",
    port: 3001
});

server.route([{
    method: "GET",
    path: "/date",
    handler: async (request, h) => {
        return await Request.get("https://now.httpbin.org");
    }
}]);

server.ext('onPreResponse', (request, h) => {
    if (request.response.isBoom) {
        console.log(`[Error] ${request.path}:`);
        console.log(request.response);
    }

    request.response.header('docker-container-id', process.env.HOSTNAME);

    return h.continue;
});

export default server;
