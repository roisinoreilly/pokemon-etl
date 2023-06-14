const pokemon = require("../mappedPokemon.json");
const moves = require("../moves.json");
const types = require("../types.json");

describe("Moves and Type ids", () => {
  test("All pokemon moves names and ids should line up with moves object", () => {
    pokemon.forEach((pokemon) => {
      pokemon.moves.forEach((move) => {
        expect(moves[move.id]).toEqual(move.name);
      });
    });
  });
  test("All pokemon types names and ids should line up with moves object", () => {
    pokemon.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        expect(types[type.id]).toEqual(type.name);
      })
  });
})
})
