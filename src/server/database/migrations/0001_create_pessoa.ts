import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, (table) => {
            table.bigIncrements("id").primary().index();
            table.string("first_name").index().notNullable();
            table.string("last_name").notNullable();
            table.string("email").unique().notNullable();

            table
            .bigInteger("cityId")
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames.cidade)
            .onUpdate('CASCADE');

            table.comment("Tabela usada para armazenar pessoas no sistema.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`);
        });
}

export async function down(knex: Knex) {
    return knex
    .schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
        console.log(`# Dropped table ${ETableNames.pessoa}`);
    });
}
