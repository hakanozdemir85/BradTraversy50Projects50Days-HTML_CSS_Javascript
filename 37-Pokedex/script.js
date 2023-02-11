const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
/* ---BRIEF-1 START---
   https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
Notice that the image file is a 3 digit number padded with zeroes at the start.
The pokemon.id prop will give you numbers from 1 to 150 (without the zeroes at the left), thus if you replace 001.png with ${pokemon.id} ; you won't be able to render the images from 1 to 100 because you'll get 1.png instead of 001.png, etc...
To solve this, I converted the pokemon.id property to a string and used the padStart() method to add zeroes at the start while keeping the sting length at 3. 
At the top of the createPokemonCard function type this:
const pic = pokemon.id.toString().padStart(3, '0');  //this will turn the id into something like "001" etc. */
    const pic = pokemon.id.toString().padStart(3, '0')
// ---BRIEF-1 END---
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color


/* ---BRIEF-2 START---
Then, in the src attribute replace the image file name with the pic variable:
src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pic}.png"
Or you can skip creating the variable and just type this into the src attribute:
src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id
              .toString()
              .padStart(3, '0')}.png" 
    ---BRIEF-2 END--- */

//For more info read the documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart You can also turn a number into a string by concatenating it with an empty string.

    const pokemonInnerHTML = `
    <div class="img-container">
          <img
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pic}.png"
            alt=""
          />
    </div>
    <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()








