const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
 
app.use(serve(__dirname + '/public/dist/'));
 
app.listen(8080);
 
console.log('listening on port 8080');