import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";

interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
}));

export const create: RequestHandler = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    console.log(req.body);

    return res.status(StatusCodes.CREATED).json(1);
};
