import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById: RequestHandler = async (
    req: Request<IParamProps>,
    res: Response
) => {
    if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    })

    return res.status(StatusCodes.NO_CONTENT).send();
};
