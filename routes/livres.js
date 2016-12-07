var mongo 	= require('mongoose');


var uri 	= "mongodb://krach:test123@ds119548.mlab.com:19548/bibliotheque";

client.connect(uri, function(err, db) {
	if(!err) {
        console.log("Connected to 'livredb' database");
        db.collection('livres', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'livres' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
            else {
            	console.log("La collection contient bien des éléments.");
            	// console.log(collection);
                // console.log(db.livres);
                // console.log(db.collection);
                // console.log(collection.livres);
                collection.find().toArray(function(err, items){
                    // console.log(err);
                    console.log(items);
                });
            }
        });
    }
})

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving livre: ' + id);
    db.collection('livres', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
	db.collection('livres', {strict:true}, function(err, collection) {
		//console.log(collection.find());
        collection.find().toArray(function(err, items) {
            console.log(err);
            console.log(items);
            res.send(items);
        });
    });
};

exports.addlivre = function(req, res) {
    var livre = req.body;
    console.log('Adding livre: ' + JSON.stringify(livre));
    db.collection('livres', function(err, collection) {
        collection.insert(livre, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatelivre = function(req, res) {
    var id = req.params.id;
    var livre = req.body;
    console.log('Updating livre: ' + id);
    console.log(JSON.stringify(livre));
    db.collection('livres', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, livre, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating livre: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(livre);
            }
        });
    });
}

exports.deletelivre = function(req, res) {
    var id = req.params.id;
    console.log('Deleting livre: ' + id);
    db.collection('livres', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}



/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var livres = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('livres', function(err, collection) {
        collection.insert(livres);
    });
};