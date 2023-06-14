const { dropTables, createTables } = require("./manage-tables");

const seed = async ({itemData}) => {
    await dropTables();
    await createTables();
}