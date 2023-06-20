const axios = require("axios");
const fs = require("fs");
const pokemon = require("./data/pokemon.json");
const mappedPokemon = require("./data/mappedPokemon.json");
const allMoves = require("./data/moves.json");

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
      // const name = move.move.name;
      return { id };
    });
    pokemon.types = pokemon.types.map((type) => {
      const url = type.type.url.split("/");
      const id = url[url.length - 2];
      const name = type.type.name;
      return { id, name };
    });
    const { name, id, types, weight, height, moves } = pokemon;
    return { name, id, types, weight, height, moves };
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

const formatMoves = async () => {
  const moves = await getAllMoves();
  const movesWithId = moves.reduce((allMoves, move) => {
    const url = move.url.split("/");
    const id = url[url.length - 2];
    const name = move.name;
    allMoves[id] = name;
    return allMoves;
  }, {});
  return movesWithId;
};
const formatTypes = async () => {
  const types = await getAllTypes();
  const typesWithId = types.reduce((allTypes, type) => {
    const url = type.url.split("/");
    const id = url[url.length - 2];
    const name = type.name;
    allTypes[id] = name;
    return allTypes;
  }, {});
  return typesWithId;
};
const formatSprites = async () => {
  let counter = 1;

  const sprites = pokemon.reduce((allSprites, pokemon) => {
    const frontDefault =
      pokemon.sprites.other["official-artwork"]["front_default"];
    const frontShiny = pokemon.sprites.other["official-artwork"]["front_shiny"];
    allSprites[pokemon.id] = [
      [counter++, frontDefault],
      [counter++, frontShiny],
    ];
    return allSprites;
  }, {});
  return sprites;
};



const getAllUsedMoveIds = (pokemonArray) => {
  const moves = new Set()
  pokemonArray.forEach(pokemon => {
    pokemon.moves.forEach(move => {
      moves.add(move.id)
    })
  })
  return [...moves].sort()
}

const formatMovesToInsert = (movesArray) => {
  return movesArray.reduce((usedMoves, move) => {
    usedMoves[move] = allMoves[move]
    return usedMoves
  }, {})

}

const usedMovesArray = getAllUsedMoveIds(mappedPokemon)

const movesToInsert = formatMovesToInsert(usedMovesArray)

fs.writeFileSync("usedMoves.json", JSON.stringify(movesToInsert))


// formatTypes().then((typesWithId) => {
//   fs.writeFileSync("types.json", JSON.stringify(typesWithId));
// });
// formatSprites().then((sprites) => {
//   fs.writeFileSync("sprites.json", JSON.stringify(sprites));
// });
// formatMoves().then((movesWithId) => {
//   fs.writeFileSync("moves.json", JSON.stringify(movesWithId));
// });

writePokemonToFile(pokemon);

module.exports = {formatMoves, formatSprites, formatTypes, getAllUsedMoveIds, formatMovesToInsert}