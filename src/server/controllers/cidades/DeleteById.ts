import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

// export const deleteById: RequestHandler = async (
//     req: Request<{}, {}, {}, IParamProps>,
//     res: Response
// ) => {
//     console.log(req.params);

//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado! DeleteById");
// };

// TEMP: Apenas à modo de teste com o Jest, assim que tiver o banco, utilizar o código correto
export const deleteById: RequestHandler = async (
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
