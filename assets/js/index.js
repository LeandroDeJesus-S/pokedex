const loadButton = document.getElementById("loadButton");
const pokemonListElement = document.getElementById("pokemonList");

const maxItems = 151;
const limit = 10;
let offset = 0;


function loadPokemons(limit, offset) {
	pokeapi.getPokemons(limit, offset).then((pokemonList = []) => {
		pokemonListElement.innerHTML += pokemonList.map(pokemonToLi).join("");
	});
}

loadPokemons(limit, offset);

loadButton.addEventListener("click", () => {
	offset += limit;
    const nextPageOffset = offset + limit
    if (nextPageOffset >= maxItems){
        const newLimit = nextPageOffset - offset;
        loadPokemons(newLimit, offset);
        loadButton.parentElement.removeChild(loadButton);
    } else {
        loadPokemons(limit, offset);
    }
});
