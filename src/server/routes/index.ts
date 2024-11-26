import { Router } from "express";
import { CidadesController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
    return res.send("Hello world!");
});

router.get(
    "/cidades",
    CidadesController.getAllValidation,
    CidadesController.getAll
);

router.post(
    "/cidades",
    CidadesController.createValidation,
    CidadesController.create
);

router.get(
    "/cidades/:id",
    CidadesController.getByIdValidation,
    CidadesController.getById
);

export { router };
