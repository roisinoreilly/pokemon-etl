const db = require("./index");
const format = require("pg-format");

exports.seed = async (pokemon, moves, types, sprites) => {
  await dropTables();
  await createTables();
  await insertPokemon(pokemon);
  await insertMoves(moves);
  await insertTypes(types);
  await insertSprites(sprites);

  console.log("Seeding complete!");
};

const dropTables = async () => {
  await db.query(`
    DROP TABLE IF EXISTS pokemon_types;
    DROP TABLE IF EXISTS pokemon_moves;
    DROP TABLE IF EXISTS pokemon_sprites;
    DROP TABLE IF EXISTS pokemon;
    DROP TABLE IF EXISTS types;
    DROP TABLE IF EXISTS sprites;
    DROP TABLE IF EXISTS moves;
    `);
};

const createTables = async () => {
  await db.query(`
  CREATE TABLE "pokemon_types"(
    "pokemon_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL
);
CREATE TABLE "sprites"(
    "id" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "sprites" ADD PRIMARY KEY("id");
CREATE TABLE "pokemon"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL
);
ALTER TABLE
    "pokemon" ADD PRIMARY KEY("id");
ALTER TABLE
    "pokemon" ADD CONSTRAINT "pokemon_name_unique" UNIQUE("name");
CREATE TABLE "moves"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "moves" ADD PRIMARY KEY("id");
ALTER TABLE
    "moves" ADD CONSTRAINT "moves_name_unique" UNIQUE("name");
CREATE TABLE "pokemon_sprites"(
    "pokemon_id" INTEGER NOT NULL,
    "sprite_id" INTEGER NOT NULL
);
ALTER TABLE
    "pokemon_sprites" ADD PRIMARY KEY("pokemon_id");
CREATE TABLE "pokemon_moves"(
    "pokemon_id" INTEGER NOT NULL,
    "move_id" INTEGER NOT NULL
);
ALTER TABLE
    "pokemon_moves" ADD PRIMARY KEY("pokemon_id");
CREATE TABLE "types"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "types" ADD PRIMARY KEY("id");
ALTER TABLE
    "types" ADD CONSTRAINT "types_name_unique" UNIQUE("name");
ALTER TABLE
    "pokemon_moves" ADD CONSTRAINT "pokemon_moves_pokemon_id_foreign" FOREIGN KEY("pokemon_id") REFERENCES "pokemon"("id");
ALTER TABLE
    "pokemon_sprites" ADD CONSTRAINT "pokemon_sprites_pokemon_id_foreign" FOREIGN KEY("pokemon_id") REFERENCES "pokemon"("id");
ALTER TABLE
    "pokemon_sprites" ADD CONSTRAINT "pokemon_sprites_sprite_id_foreign" FOREIGN KEY("sprite_id") REFERENCES "sprites"("id");
ALTER TABLE
    "pokemon_moves" ADD CONSTRAINT "pokemon_moves_move_id_foreign" FOREIGN KEY("move_id") REFERENCES "moves"("id");
ALTER TABLE
    "pokemon_types" ADD CONSTRAINT "pokemon_types_pokemon_id_foreign" FOREIGN KEY("pokemon_id") REFERENCES "pokemon"("id");
ALTER TABLE
    "pokemon_types" ADD CONSTRAINT "pokemon_types_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "types"("id");`);
};

const insertPokemon = async (pokemon) => {
  const formatted = pokemon.map(({ id, name, height, weight }) => {
    return [id, name, height, weight];
  });

  const query = format(
    `INSERT INTO pokemon (id, name, height, weight) VALUES %L RETURNING *`,
    formatted
  );

  return db.query(query);
};
const insertMoves = async (moves) => {
  const formatted = [];
  for (const key in moves) {
    formatted.push([key, moves[key]]);
  }

  const query = format(
    `INSERT INTO moves (id, name) VALUES %L RETURNING *`,
    formatted
  );

  return db.query(query);
};
const insertTypes = async (types) => {
  const formatted = [];
  for (const key in types) {
    formatted.push([key, types[key]]);
  }

  const query = format(
    `INSERT INTO types (id, name) VALUES %L RETURNING *`,
    formatted
  );

  return db.query(query);
};
const insertSprites = async (sprites) => {
  const formatted = [];
  for (const key in sprites) {
    formatted.push(sprites[key][0], sprites[key][1]);
  }

  const query = format(
    `INSERT INTO sprites (id, url) VALUES %L RETURNING *`,
    formatted
  );

  return db.query(query);
};
const insertPokemonSprites = async () => {};
const insertPokemonMoves = async () => {};
const insertPokemonTypes = async () => {};
