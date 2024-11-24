import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get("/", (req, res) => {
    return res.send("Retorno: rota /");
});

router.post("/teste/:id", (req, res) => {
    console.log(req.params.id);

    return res.status(StatusCodes.UNAUTHORIZED).json("Retorno do envio: " + req.body.teste);
});

export { router };