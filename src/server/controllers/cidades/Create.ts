import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
    name: string;
    lastName: string;
}

interface IFilter {
    filter?: string;
    // limit?: number;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        name: yup.string().required().min(3),
        lastName: yup.string().required().min(3),
    })),
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().min(3),
    })),
}));

export const create: RequestHandler = async (
    req: Request<{}, {}, ICidade>,
    res: Response
) => {
    console.log(req.body);

    return res.send("Message from controller: Created!");
};
