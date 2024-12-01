const pokeapi = {
    pokemonDetailToPokemon: (pokemonDetail) => {
        const pokemon = new Pokemon(pokemonDetail);
        // pokemon.name = pokemonDetail.name;
        // pokemon.number = pokemonDetail.id;
        // pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
        // [pokemon.type] = pokemon.types;
        // pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
        return pokemon;
    },
    getPokemonDetail: (pokemon) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(pokeapi.pokemonDetailToPokemon);
    },
    getPokemons: (limit = 10, offset = 0) => {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => responseJson.results)
            .then((pokemonResults) => pokemonResults.map(pokeapi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonDetailResult) => pokemonDetailResult);
    }
}