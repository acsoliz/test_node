const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const app = express();


// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Middleware de logging: 
/*Antes de procesar cada petición imprime un log con la información
correspondiente, método, path y parámetros. */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
