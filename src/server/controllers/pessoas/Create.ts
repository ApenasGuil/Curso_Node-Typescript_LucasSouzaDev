import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        email: yup.string().required().email(),
        cityId: yup.number().required(),
    })),
}));

export const create: RequestHandler = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await PessoasProvider.create(req.body);

    if(result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
