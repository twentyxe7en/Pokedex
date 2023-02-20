const pokedex = document.getElementById('pokedex');
let pokemon;
console.log(pokedex);

const fetchPokemon = () => {
	const promises = [];
	for (let i = 1; i <= 1008; i++) {
		const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
		promises.push(fetch(url).then((res) => res.json()));

	}
	
	Promise.all(promises).then(results => {
		pokemon = results.map(data => ({
			id: data.id,
			name: data.name,
			type: data.types.map((type) => type.type.name).join('/'),
			types: data.types,
			stats: data.stats,
			image: data.sprites.other["official-artwork"].front_default
		}));
		display(pokemon);
	});
};

const display = (pokemon) => {
	console.log(pokemon)
	const pokemonHTMLString = pokemon.map(data =>
		'<li class="card" id="' + data.id + '" onClick="displayInfo(this.id)">' + 
			'<img class="card-img" src="' +  data.image + '">' +
			'<div class="card-info">' +
				'<h2 class="card-title">' + data.id + '. ' + data.name + '</h2>' +
				// '<br>' +
				'<p class="card-subtitle">' + data.type.toUpperCase() + '</p>'+
			'</div>' +
		'</li>'
	).join('');
	// console.log(pokemonHTMLString);
	pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();

// Display something

function displayInfo(id) {
	let i = id - 1;
	let tbl = document.getElementById("tbl");
	tbl.style.display = "initial";
	let img = document.getElementById("img");
	let name = document.getElementById("name");
	let type = document.getElementById("type");
	type.innerHTML = "";
	img.src = pokemon[i].image;
	img.style.height = "100%";
	img.style.width = "100%;"
	let imgContainer = document.getElementById("img-container");
	imgContainer.style.height = "150px";
	imgContainer.style.width = "150px";
	name.innerHTML = '#' + pokemon[i].id + ' ' + pokemon[i].name;
	name.colSpan = 2;
	// console.log(pokemon[i].types.length);
	for (let j = 0; j < pokemon[i].types.length; j++) {
		let t = document.createElement("td");
		t.innerHTML = pokemon[i].types[j].type.name;
		type.append(t);
		if (pokemon[i].types.length == 1) {
			t.colSpan = "2";
		}
	}

	let stats_tbl = document.getElementById("stats");
	stats_tbl.style.display = "flex";
	stats_tbl.style.flexDirection = "column";
	stats_tbl.style.width = "50%";
	stats_tbl.style.justifyContent = "center";
	stats_tbl.style.alignItems = "center";
	stats_tbl.innerHTML = "";
	for (let j = 0; j < pokemon[i].stats.length; j++) {
		let tr = document.createElement("tr");
		tr.style.width = "100%";
		tr.style.display = "flex";
		tr.style.justifyContent = "center";
		tr.style.alignItems = "center";
		tr.style.marginBottom = "2px";
		let name = document.createElement("td");
		let stat = document.createElement("td");
		name.innerHTML = pokemon[i].stats[j].stat.name;
		stat.innerHTML = pokemon[i].stats[j].base_stat;
		tr.append(name);
		tr.append(stat);
		stats_tbl.append(tr);
		name.style.width = "19%";
		stat.style.width = "5%";
	}
	console.log()

	console.log(pokemon[i]);
}
