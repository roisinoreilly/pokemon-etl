DROP DATABASE IF EXISTS "pokemon_etl";
CREATE DATABASE "pokemon_etl";
\c "pokemon_etl";

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
    "pokemon" VARCHAR(30) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL
);
ALTER TABLE
    "pokemon" ADD PRIMARY KEY("id");
ALTER TABLE
    "pokemon" ADD CONSTRAINT "pokemon_pokemon_unique" UNIQUE("pokemon");
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
    "pokemon_types" ADD CONSTRAINT "pokemon_types_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "types"("id");