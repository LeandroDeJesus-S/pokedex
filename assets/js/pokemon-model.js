class Pokemon {
    // name;
    // number;
    // type;
    // types;
    // photo;
    // hp;
    // attack;
    // defense;
    // specialAttack;
    // specialDefense;
    // speed;
    // total;
    eggGroupNames;
    genderRateObject;

    constructor (data) {
        this.data = data;
        this.name = data.name;
        this.number = data.id;
        this.types = data.types.map((typeSlot) => typeSlot.type.name);
        [this.type] = this.types;
        this.photo = data.sprites.other.dream_world.front_default;

        this.height = data.height;
        this.weight = data.weight;
        this.abilities = data.abilities.map(ability => ability.ability.name).join();
        this.stats = data.stats.map(stat => {
            return {name: stat.stat.name, value: stat.base_stat};
        });
    }

    calculateGenderRate(rate) {
        // calculates the gender rate to female and male and store in an object having
        // the key noGender equals true if the pokemon has no gender
        const female =  rate / 8 * 100;
        const rateObj = {
            female: female,
            male: 100 - female,
            noGender: rate === -1
        }
        return rateObj;
    }

    getSpeciesData() {
        // fetch the pokeAPI and return the egg groups and the gender rate
        const species = this.data.species
        return fetch(species.url)
            .then(response => response.json())
            .then((responseData) => {
                const genderRate = responseData.gender_rate;
                const genderRateObject = this.calculateGenderRate(genderRate);
                const eggGroupNames = responseData.egg_groups.map(group => group.name).join();
                return { eggGroupNames, genderRateObject};
            })
            .catch(error => console.error(error.message));
    }

}