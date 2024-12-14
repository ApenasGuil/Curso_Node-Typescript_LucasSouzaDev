import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.cidade).count<
        [{ count: Number }]
    >("* as count");

    if (!Number.isInteger(count) || Number(count) > 0) return;

    const cidadesToInsert = cidadesDeSãoPaulo.map((nomeDaCidade) => ({
        name: nomeDaCidade,
    }));
    await knex(ETableNames.cidade).insert(cidadesToInsert);
};

const cidadesDeSãoPaulo = [
    "São Vicente",
    "Santos",
    "Praia Grande",
    "Guarujá",
    "Bertioga",
    "Itanhaém",
];