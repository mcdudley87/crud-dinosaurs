const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
var db = require('./models');

const methodOverride = require('method-override');

const port = 3000;

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
	res.render('index')
})

//GET /dinosaurs (index route to get resources / all dinos)
// DONE DON'T EFF WITH
app.get('/dinosaurs', function(req, res) {
	db.dinosaur.findAll()
		.then(function(dinosaurs) {
			res.render('dinos/index', {dinosaurs})
		});
	});

// 				Old Way
// app.get('/dinosaurs', function(req, res) {
// 	var dinosaurs = fs.readFileSync("./dinosaurs.json"); //refactor. this is using the FS node module.
// 	//remove the file system stuff and use sequelize functions in every route. read db. not file.
// 	//render the same data in the same page the same way. No UI difference.
// 	var dinoData = JSON.parse(dinosaurs); //refactor
// 	console.log(dinoData);
// 	res.render('dinos/index', {dinosaurs: dinoData});
// })


			//leave this alone -md
//GET /dinosaurs/new - serve up our NEW dino form (above id so 'new' isn't mistaken as the id)
app.get('/dinosaurs/new', function(req, res) {
	res.render('dinos/new');
})

//GET /dinosaurs/:id/edit - serve up our edit to dino form (above id so 'new' isn't mistaken as the id)
app.get('/dinosaurs/:id/edit', function(req, res) {
	db.dinosaur.findByPk(parseInt(req.params.id))
		.then(function(dinosaur) {
			res.render('dinos/edit', {dinosaur});
		});
});


//GET /dinosaurs/:id - show route - gets ONE dino 
app.get('/dinosaurs/:id', function(req, res) {
	var id = req.params.id;
		db.dinosaur.findByPk(id)
			.then(function(dinosaur){
				res.render('dinos/show', {dinosaur})
			})
		});



	// router.get('/:id', function(req, res) {
	// 	var id = parseInt(req.params.id);
	// 	db.pokemon.findByPk(id).then(function(pokemon) {
	// 		axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
	// 		.then(function(apiResponse) {
	// 			res.render('showpk', {pokemon: apiResponse.data, id});
	// 		})
	// 	});
	// });



//GET /dinosaurs/:id - show route - gets ONE dino -OLD WAY
// app.get('/dinosaurs/:id', function(req, res) {
// 	var dinosaurs = fs.readFileSync('./dinosaurs.json');
// 	var dinoData = JSON.parse(dinosaurs);
// 	var id = parseInt(req.params.id);
// 	res.render('dinos/show', {dinosaur: dinoData[id], id});

// })


// DONE DON'T EFF WITH
//POST dinosaurs
app.post('/dinosaurs', function(req, res) {
  db.dinosaur.create( {
			name: req.body.dinosaurName,
			type: req.body.dinosaurType
    }).then(function() {
    res.redirect('/dinosaurs');
  });
});


// 				OLD WAY
// //POST dinosaurs
// app.post('/dinosaurs', function(req, res) {
// 	//read in our JSON file
// 	var dinosaurs = fs.readFileSync('./dinosaurs.json');
// 	//convert to array
// 	var dinoData = JSON.parse(dinosaurs);
// 	var newDino ={
// 		type: req.body.dinosaurType,
// 		name: req.body.dinosaurName
// 	}
// 	dinoData.push(newDino);
// 	//push new data into the array
// 	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
// 	//write the array back to the file

// 	res.redirect('/dinosaurs');
// })

app.delete('/dinosaurs/:id', function(req, res) {
	console.log('EXTINCT.')
	db.dinosaur.destroy({
		where: {id: parseInt(req.params.id)}
	}).then(function(dinosaurs) {
		res.redirect('/dinosaurs');
	});
});

						//old way
// app.delete('/dinosaurs/:id', function(req, res) {
// 	//read the data from the file
// 	let dinosaurs = fs.readFileSync('./dinosaurs.json');
// 	//parse the data into an object
// 	var dinoData = JSON.parse(dinosaurs);
// 	//splice out the item at the specificed index
// 	var id = parseInt(req.params.id);
// 	dinoData.splice(id, 1);
// 	//stringify it
// 	var dinoString = JSON.stringify(dinoData);
// 	//write the object back into the file
// 	fs.writeFileSync('./dinosaurs.json', dinoString);
// 	res.redirect('/dinosaurs');
// }); 


app.put('/dinosaurs/:id', function(req, res) {
	var id = parseInt(req.params.id);
		db.dinosaur.update({
			name: req.body.dinosaurName,
			type: req.body.dinosaurType
		},
		{ where: {id: id}
	}).then(function(dinosaur){
		res.redirect("/dinosaurs");
	});
});


// app.put('/dinosaurs/:id', function(req, res) {
// 	// let dinosaurs = fs.readFileSync('./dinosaurs.json');
// 	var dinoData = //JSON.parse(dinosaurs);
// 	var id = parseInt(req.params.id);
// 	dinoData[id].name = req.body.dinosaurName;
// 	dinoData[id].type = req.body.dinosaurType;
// 	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
// 	res.redirect("/dinosaurs/" + id);
// })





app.listen(port, function () {
	console.log('😈We are listening on port: ' + port)
});

