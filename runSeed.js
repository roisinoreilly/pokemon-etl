const { seed } = require("./seed");
const db = require("./index");
const pokemon = require("./data/mappedPokemon.json");
seed(pokemon).then(() => db.end());
