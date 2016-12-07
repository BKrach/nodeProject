var express = require('express'),
    livres 	= require('./routes/livres');
	app 	= express();
	router 	= express.Router();

// Définition des routes
app.get('/', function(req,res){
	res.send('Homepage');
});
app.get('/livres', livres.findAll);
app.get('/livres/:id', livres.findById);
app.post('/livres', livres.addlivre);
app.put('/livres/:id', livres.updatelivre);
app.delete('/livres/:id', livres.deletelivre);

// Activation du port 3000
app.listen(3000);

// Export du router
module.exports = router;