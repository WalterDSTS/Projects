const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = []

  for(let i = 1; i<= 151; i++) {
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
  }

  Promise.all(pokemonPromises).then(pokemons => {
    const lisPokemons = pokemons.reduce((accum, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      accum += `
        <li class="card ${types[0]}">
          <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
          <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(' | ')}</p>
        </li>
      `
      return accum
    }, '')

    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = lisPokemons
  })
}

fetchPokemon()