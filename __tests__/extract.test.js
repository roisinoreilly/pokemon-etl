const pokemon = require("../data/mappedPokemon.json");
const moves = require("../data/moves.json");
const types = require("../data/types.json");
const allPokemon = require("../data/pokemon.json");

describe('original Pokemon dataset', () => {
  test('should have a length of 151', () => {
    expect(allPokemon.length).toBe(151);
  });
});

describe('mappedPokemon dataset', () => {
  test('should have a length of 151', () => {
    expect(pokemon.length).toBe(151);
  });
  test('should have the keys of name, id, height, weight, moves and types', () => {
    pokemon.forEach((pokemon) => {
      expect(pokemon).toHaveProperty("name");
      expect(pokemon).toHaveProperty("id");
      expect(pokemon).toHaveProperty("height");
      expect(pokemon).toHaveProperty("weight");
      expect(pokemon).toHaveProperty("moves");
      expect(pokemon).toHaveProperty("types");
    })
  });
});

describe("")

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
