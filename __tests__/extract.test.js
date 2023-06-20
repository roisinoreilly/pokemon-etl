const pokemon = require("../data/mappedPokemon.json");
const moves = require("../data/moves.json");
const types = require("../data/types.json");
const allPokemon = require("../data/pokemon.json");
const { formatMoves, formatSprites, formatTypes, formatMovesToInsert, getAllUsedMoveIds } = require("../extract");

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

describe("formatMoves", () => {
  test('should have 918 moves', async () => {
    expect(Object.keys(await formatMoves()).length).toBe(918);
  });
})

describe("formatTypes", () => {
  test('should have 20 types', async () => {
    expect(Object.keys(await formatTypes()).length).toBe(20);
  });
})

describe("formatSprites", () => {
  test('should have 151 sets of sprites', async () => {
    const sprites = await formatSprites();
    expect(Object.keys(sprites).length).toBe(151);
    Object.values(sprites).forEach((sprite) => {
      expect(sprite).toHaveLength(2)
    })
  });
})

describe("getAllUsedMoveIds", () => {
  test("should return an empty array when passed an empty array", () => {
    expect(getAllUsedMoveIds([])).toEqual([]);
  });
  test('should return an array of all used move ids', () => {
    const testPokemon = [{"name":"bulbasaur","id":1,"types":[{"id":"12","name":"grass"},{"id":"4","name":"poison"}],"weight":69,"height":7,"moves":[{"id":"13"}, {"id":"14"}]}]
    expect(getAllUsedMoveIds(testPokemon)).toEqual(["13", "14"])

  });
  test('should return an array of all used move ids for multiple pokemon', () => {
    const testPokemon = [{"name":"bulbasaur","id":1,"types":[{"id":"12","name":"grass"},{"id":"4","name":"poison"}],"weight":69,"height":7,"moves":[{"id":"13"},{"id":"16"},{"id":"17"}]},{"name":"ivysaur","id":2,"types":[{"id":"12","name":"grass"},{"id":"4","name":"poison"}],"weight":130,"height":10,"moves":[{"id":"14"},{"id":"15"},{"id":"20"}]}]

    expect(getAllUsedMoveIds(testPokemon).sort()).toEqual(["13", "14", "15", "16", "17", "20"])
  });
  test("should remove duplicate move ids", () => {
    const testPokemon = [{"name":"bulbasaur","id":1,"types":[{"id":"12","name":"grass"},{"id":"4","name":"poison"}],"weight":69,"height":7,"moves":[{"id":"13"},{"id":"14"},{"id":"15"}]},{"name":"ivysaur","id":2,"types":[{"id":"12","name":"grass"},{"id":"4","name":"poison"}],"weight":130,"height":10,"moves":[{"id":"14"},{"id":"15"},{"id":"20"}]}]
    expect(getAllUsedMoveIds(testPokemon)).toEqual(["13", "14", "15", "20"])
  })
})

describe.only('formatMovesToInsert', () => {
  test('should return an empty object when passed an empty array', () => {
    expect(formatMovesToInsert([])).toEqual({});
  })
  test('should return an object with the id as the key and move name as the value', () => {
    expect(formatMovesToInsert(["1"])).toEqual({1: "pound"})
  });
  test("should return an object with the id as the key and move name as the value for multiple pokemon", () => {
    expect(formatMovesToInsert(["1", "2", "3"])).toEqual({1: "pound", 2: "karate-chop", 3: "double-slap"})
  })
});

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
