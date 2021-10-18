const express = require('express');
const path = require('path');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const generalRoute = require('./routes/general');





try {




require("dotenv").config()




const app = express();

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));

  
//Routes
  
//GENERAL ROUTE
app.use("/",generalRoute)


//Error Middleware
app.use(errorMiddleWare)


app.listen(8080,()=>console.log("App Started @ Port", 8080)) 
  

  process.on('uncaughtException', function (err) {
  logger.debug(err)
    
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})





  
} catch (error) {
  logger.debug(error)
}