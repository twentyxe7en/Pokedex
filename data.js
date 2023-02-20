const pokedex = document.getElementById('pokedex');
let pokemon;
// console.log(pokedex);

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
			abilities: data.abilities,
			weight: data.weight,
			height: data.height,
			image: data.sprites.other["official-artwork"].front_default
		}));
		display(pokemon);
	});
};

const display = (pokemon) => {
	// console.log(pokemon)
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
	document.getElementById('sprite').innerHTML = '<img src="' + pokemon[i].image + '">';
	document.getElementById('id').innerHTML = '#' + pokemon[i].id;
	document.getElementById('name').innerHTML = pokemon[i].name;
	document.getElementById('type').innerHTML = '';
	if (pokemon[i].types.length == 2) {
		document.getElementById('type').innerHTML = pokemon[i].types[0].type.name + ', ' + pokemon[i].types[1].type.name;
	} else {
		document.getElementById('type').innerHTML = pokemon[i].types[0].type.name;
	}
	document.getElementById('h-w').innerHTML = (pokemon[i].height / 10) + 'm, ' + (pokemon[i].weight / 10) + ' kg';
	document.getElementById('hp').innerHTML = pokemon[i].stats[0].base_stat;
	document.getElementById('atk').innerHTML = pokemon[i].stats[1].base_stat;
	document.getElementById('def').innerHTML = pokemon[i].stats[2].base_stat;
	document.getElementById('spa').innerHTML = pokemon[i].stats[3].base_stat;
	document.getElementById('spd').innerHTML = pokemon[i].stats[4].base_stat;
	document.getElementById('spe').innerHTML = pokemon[i].stats[5].base_stat;
	let abilities = document.getElementById('abilities');
	abilities.innerHTML = '';
	for (let j = 0; j < pokemon[i].abilities.length; j++) {
		let ability = document.createElement('p');
		if (j == pokemon[i].abilities.length - 1 && j != 0) {
			ability.innerHTML = pokemon[i].abilities[j].ability.name + ' (hidden)';
		} else if (pokemon[i].abilities.length == 1) {
			ability.innerHTML = pokemon[i].abilities[j].ability.name;
		} else if (j == 0 && pokemon[i].abilities[j].ability.name == pokemon[i].abilities[j + 1].ability.name) {
			ability.innerHTML = pokemon[i].abilities[j].ability.name;
			abilities.append(ability);
			break;
		} else {
			ability.innerHTML = pokemon[i].abilities[j].ability.name;
		}
		abilities.append(ability);
	}


	// console.log(pokemon[i]);
}
