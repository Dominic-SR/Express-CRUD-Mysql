import express from 'express';
import * as dotenv from "dotenv"
dotenv.config();

const port = process.env.PORT;

var app = express();

//Port On Error Function
function onError(error){
    if(error.syscall !== "listern"){
        console.error(error);
    }

    const bind = typeof port === "string" ? "Pipe " + port : "port " + port;
    
    switch (error.code){
        case "EACCES":
            console.error(bind + "requires elevated proivilages")
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            console.log(error);
    }
}

//Port On Listening Function
function onListening(){
    const addr = app.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" +addr.port;
    console.log("\nListening on " + bind);
}

app.listen(port);
app.on("error",onError);
app.on("listening",onListening);

console.log("server start on "+ port);