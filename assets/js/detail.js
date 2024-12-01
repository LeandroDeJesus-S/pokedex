const pokemonId = new URLSearchParams(window.location.search).get("pokemon");
const detailURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

const pokemonElement = document.querySelector("#pokemon-div");

const aboutTabContentElement = document.querySelector("#about");
const baseStatsTabContentElement = document.querySelector("#base-stats");
const evolutionTabContentElement = document.querySelector("#evolution");
const moviesTabContentElement = document.querySelector("#movies");

const typeListElement = document.querySelector(".types");
const tabOptionElements = Array.from(
	document.getElementsByClassName("tab-option")
);

const activeTab = "about";

const tabFunctions = {
	about: renderAboutTabContent,
	"base-stats": renderBaseStatsTabContent,
	evolution: (pokemon) => null,
	movies: (pokemon) => null,
};


function toggleTabOption(tabId) {
	tabOptionElements.map((option) => {
		const optionId = option.getAttribute("id");
        const optionFor = option.getAttribute('for');
        const forElement = document.getElementById(optionFor);

		if (optionId === tabId) {
			option.classList.add("tab-active");
            forElement.classList.remove('hidden');
			return;
		}
		option.classList.remove("tab-active");
        forElement.classList.add('hidden');
	});
}

function handleTabs(e, pokemon) {
	const tabId = e.target.getAttribute("id");
	const tabFor = e.target.getAttribute("for");

	toggleTabOption(tabId);
	tabFunctions[tabFor](pokemon);
}

function renderPokemonContent(pokemon) {
    pokemonElement.classList.add(pokemon.type);
	pokemonElement.innerHTML = pokemonDetailComponent(pokemon);
}

function renderAboutTabContent(pokemon) {
    let aboutTemplate = '';

	const aboutTableRows = [
		["Species", pokemon.type],
		["Height", pokemon.height],
		["Weight", pokemon.weight],
		["Abilities", pokemon.abilities],
	];

	pokemonElement.innerHTML = pokemonDetailComponent(pokemon);

	const aboutTable = tableComponent(["", ""], aboutTableRows);
	aboutTemplate += aboutTable;
	aboutTemplate += "<h2>Breeding</h2>";

	pokemon.getSpeciesData()
		.then((data) => {
			const breadingTableRows = [
				["Egg Groups", data.eggGroupNames],
				["Egg Cycle", pokemon.type],
			];
			const aboutBreadingTable = tableComponent(
				["", ""],
				breadingTableRows
			);
			aboutTemplate += aboutBreadingTable;
            aboutTabContentElement.innerHTML = aboutTemplate;
		})
		.catch((error) => console.error(error.message));
}

function renderBaseStatsTabContent(pokemon) {
    let total = 0;
    let statsRows = pokemon.stats.map((stat) => {
        total += parseInt(stat.value);
        return [
            stat.name,
            `${stat.value} ${loadBarComponent(stat.value)}`,
        ]
    });
    statsRows.push(['total', `${total} ${loadBarComponent(total, 1000)}`])

    console.log(statsRows)
	baseStatsTabContentElement.innerHTML = tableComponent(
		["", ""],
		statsRows
	);
}

function main() {
	fetch(detailURL)
		.then((response) => response.json())
		.then((pokemonData) => new Pokemon(pokemonData))
		.then((pokemon) => {
			renderPokemonContent(pokemon);
			renderAboutTabContent(pokemon);
			tabOptionElements.map((option) => {
				option.addEventListener("click", (e) => handleTabs(e, pokemon));
			});
		});
}

main();
