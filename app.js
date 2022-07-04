import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv"
dotenv.config();

const port = process.env.PORT;

var app = express();

//body parser
app.use(bodyParser.json({ limit:"10mb"}));

app.use(
bodyParser.urlencoded({
    limit:"10mb",
    extended:true,
    parameterLimit: 50000,
})
);

//morgon combined log
app.use(morgan("combined",{ stream: winston.stream}))

//routes
app.use(cookieParser());


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