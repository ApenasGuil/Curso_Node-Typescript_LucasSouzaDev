import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<ICidade | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result ) return result;

        return new Error("Registro não encontrado!");
    } catch (error) {
        console.error(error);
        return new Error("Registro não encontrado!");
    }
};
