const { seed } = require("./seed");
const db = require("./index");
const pokemon = require("./data/mappedPokemon.json");
const moves = require("./data/moves.json");
const types = require("./data/types.json");
const sprites = require("./data/sprites.json");
seed(pokemon, moves, types, sprites).then(() => db.end());
