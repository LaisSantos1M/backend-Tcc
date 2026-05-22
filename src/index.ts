import http from "http"

import app from "./app.js";

const server = http.createServer(app)


server.listen(8080, () => console.log("Servidor escutando na porta 8080"))
