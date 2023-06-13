const axios = require('axios');
const fs = require('fs');
const pokemon = require('./pokemon.json');

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

const getPokemon = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
}

// getPokemon(1)

const getAllPokemon = async (id = 151) => {
    const pokemonArray = []
    for (let i = 1; i <= id; i++) {
        const pokemon = await getPokemon(i);
        pokemonArray.push(pokemon);
    }
    fs.writeFileSync('pokemon.json', JSON.stringify(pokemonArray));
}
// getAllPokemon();

const mappedPokemon = pokemon.map((pokemon) => {
    pokemon.moves = pokemon.moves.map((move) => {
        // const id = move.move.url.split('/').pop();
        const name = move.move.name;
        return { id, name }
    });
const { name, id, types, weight, height, moves, sprites} = pokemon;
    return { name, id, types, weight, height, moves, sprites}
})

fs.writeFileSync('mappedPokemon.json', JSON.stringify(mappedPokemon));