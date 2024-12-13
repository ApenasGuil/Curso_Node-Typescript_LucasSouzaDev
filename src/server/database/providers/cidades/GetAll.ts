import { ETableNames } from "../../ETableNames";
import { ICidade } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', Number(id))
            .orWhere('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit) // Informa a partir de qual registro quer o próximo limite
            .limit(limit); // Limita quantos registros é retornado na pesquisa

        if (id > 0 && result.every(item => item.id !== id)){
            const resultById = await Knex(ETableNames.cidade)
            .select('*')
            .where('id', '=', id)
            .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.error(error);
        return new Error("Erro ao consultar os registros!");
    }
};
