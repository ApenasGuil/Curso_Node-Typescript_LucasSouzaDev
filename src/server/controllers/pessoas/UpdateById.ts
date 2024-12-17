import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup.string().required().email(),
            cityId: yup.number().required(),
        })
    ),
    params: getSchema<IParamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const updateById: RequestHandler = async (
    req: Request<IParamProps>,
    res: Response
) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }

    const result = await PessoasProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
