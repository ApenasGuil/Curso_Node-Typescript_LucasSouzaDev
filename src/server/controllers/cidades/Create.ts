import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
    name: string;
    lastName: string;
}

interface IFilter {
    filter?: string;
}

export const createValidation = validation({
    body: yup.object().shape({
        name: yup.string().required().min(3),
        lastName: yup.string().required().min(3),
    }),
    query: yup.object().shape({
        filter: yup.string().min(3),
    }),
});

export const create: RequestHandler = async (
    req: Request<{}, {}, ICidade>,
    res: Response
) => {
    console.log(req.body);

    return res.send("Message from controller: Created!");
};
