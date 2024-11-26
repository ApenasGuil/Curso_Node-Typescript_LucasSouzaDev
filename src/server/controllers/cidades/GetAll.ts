import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface iQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<iQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

export const getAll: RequestHandler = async (
    req: Request<{}, {}, {}, iQueryProps>,
    res: Response
) => {
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!");
};
