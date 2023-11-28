// Modules Import
const cors = require('cors'); 
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const createError = require('http-errors');

const app = express();


// Routers Import
//const indexRouter = require('./routes/index');


// App Config { app.use() }
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(helmet({ contentSecurityPolicy: false, }));

// USE ROUTERS
//app.use('/', indexRouter);


app.use('/static', express.static(path.join(__dirname, 'client', 'static')));

//testStuff();
function testStuff() {
    console.log("process.cwd(): ", process.cwd());
    console.log("__dirname: ", __dirname);
    console.log("__join path: ", path.join('/client', 'static'));
    console.log(path.join(__dirname, 'client', 'static'));
    console.log(path.resolve(__dirname, 'client', 'static'));
}


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});


// 404 => ErrorHandler
app.use(function(req, res, next) {
  next(createError(404));
});


// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
    console.log(`Express server running on port ${process.env.PORT}`);
});