const axios = require("axios");
const fs = require("fs");
const pokemon = require("./pokemon.json");

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const getPokemon = async (id) => {
  const response = await api.get(`/pokemon/${id}`);
  return response.data;
};

// getPokemon(1)

const getAllPokemon = async (id = 151) => {
  const pokemonArray = [];
  for (let i = 1; i <= id; i++) {
    const pokemon = await getPokemon(i);
    pokemonArray.push(pokemon);
  }
  fs.writeFileSync("pokemon.json", JSON.stringify(pokemonArray));
};

const removeMiscData = (pokemonData) => {
  const mappedPokemon = pokemonData.map((pokemon) => {
    pokemon.moves = pokemon.moves.map((move) => {
      const url = move.move.url.split("/");
      const id = url[url.length - 2];
      const name = move.move.name;
      return { id, name };
    });
    const { name, id, types, weight, height, moves, sprites } = pokemon;
    return { name, id, types, weight, height, moves, sprites };
  });
  return mappedPokemon;
};

const writePokemonToFile = (pokemonData) => {
  const mappedPokemon = removeMiscData(pokemonData);
  fs.writeFileSync("mappedPokemon.json", JSON.stringify(mappedPokemon));
};

const getAllMoves = async () => {
  const { data } = await api.get("/move?limit=918");
  return data.results;
};
const getAllTypes = async () => {
  const { data } = await api.get("/type");
  console.log(data.results);
  return data.results;
};

const formatMovesAndWrite = async () => {
  const moves = await getAllMoves();
  const movesWithId = moves.reduce((allMoves, move) => {
    const url = move.url.split("/");
    const id = url[url.length - 2];
    const name = move.name;
    allMoves[id] = name;
    return allMoves;
  }, {});
  fs.writeFileSync("moves.json", JSON.stringify(movesWithId));
};
const formatTypesAndWrite = async () => {
  const types = await getAllTypes();
  const typesWithId = types.reduce((allTypes, type) => {
    const url = type.url.split("/");
    const id = url[url.length - 2];
    const name = type.name;
    allTypes[id] = name;
    return allTypes;
  }, {});
  fs.writeFileSync("types.json", JSON.stringify(typesWithId));
};

formatTypesAndWrite();
