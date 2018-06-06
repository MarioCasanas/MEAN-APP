const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

//const indexRoutes = require('./routes/index'); // Lo dejo comentado para que no lo cargue y usar Angular
const tasksRoutes = require('./routes/tasks');

// Setting
app.set('views', path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(express.json()); //bodyparser viene incluido en express
app.use(express.urlencoded({extended: false})); //Recibe Datos a travez de una URL

// Routes
//app.use(indexRoutes); // Lo dejo comentado para que no lo cargue y usar Angular
app.use('/api', tasksRoutes);

// Static files
app.use(express.static(path.join(__dirname,'dist')));

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on Port: ', app.get('port'));
});