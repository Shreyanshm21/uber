const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const connectToDb = require("./DB/db");
const {initializeSocket} = require('./socket')


const server = http.createServer(app);
//works the same if you replace the server to app.listen but we are using it beacuse we want to use sockets
//app.listen(port, callback) express automatically creates a HTTP server using hhtp.createServer(app) and starts 
//listening on the specified port 

initializeSocket(server)

connectToDb().then(() => {
    console.log("Database connection established");
    server.listen(port, () => {
        console.log(`Server is running on the port ${port}`);
    });

    
});
