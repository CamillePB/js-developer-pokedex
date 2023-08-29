
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.weight = pokeDetail.weight
    pokemon.base_experience = pokeDetail.base_experience
    pokemon.height = pokeDetail.height
    

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilityeSlot) => abilityeSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    // const stats = pokeDetail.stats.map((statsSlot) => statsSlot.stat.name)
    // const [stat] = stats

    // pokemon.stats = stats
    // pokemon.stat = stat
    // pokemon.base_stat = pokeDetail.base_stat

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)//busca a url
        .then((response) => response.json())//transforma o corpo em json
        .then((jsonBody) => jsonBody.results)//pega results o corpo
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
