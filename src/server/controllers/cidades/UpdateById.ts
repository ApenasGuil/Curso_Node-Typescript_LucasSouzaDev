import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IBodyProps {
    name:  string;
}
interface IParamProps {
    id?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const updateById: RequestHandler = async (
    req: Request<{}, {}, {}, IParamProps>,
    res: Response
) => {
    console.log(req.body);
    console.log(req.params);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado!");
};
