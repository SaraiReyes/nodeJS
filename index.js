/*const http =require('http');

const server= http.createServer((req, res)=>{
	res.status=200;
	res.setHeader('Content-Type','tex/plain');
	res.end('Hello world');
});

server.listen(3000,()=>{
	console.log('Server running');
})*/
// npx nodemon index.js 
const express = require('express');
const morgan = require('morgan');
const app = express();
const ejs = require('ejs');


//para poder leer los json despues 


/*function logger(req, res, next){
	console.log(`Route Recived: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
	next();
}*/
//Settings
//----------------------------------------------------------------------------
//nombre de la variable,valor de la variable 
app.set('appName', 'Fast express Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs');


//Middewles
//----------------------------------------------------------------------------

app.use(morgan('dev'));
app.use(express.json());

//Routes
//----------------------------------------------------------------------------

/*app.all('/user',(req, res, next)=>{
	console.log('por aqui pao');
	next();
	//res.send('finish');
});*/

app.get('/', (req, res) => {
    const data = [{ name: 'Jhon' }, { name: 'Joe' }, { name: 'Cameron' }, { name: 'Ryan' }];
    res.render('index.ejs', { people: data });
    //res.render('index.ejs');
});

app.get('/user', (req, res) => {
    res.json({
        username: 'cameron',
        lastname: 'Hoel'
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('Peticion post');
});
app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send('Peticion put');
});

app.delete('/user/:userId', (req, res) => {
    //res.send('user deleted');
    res.send(`User ${req.params.userId} deleted`);
    //res.send('<h1>peticion delete</h1>');
});


app.use(express.static('public'));


app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
    //console.log(`server on port  ${app.get('port')}`);

});