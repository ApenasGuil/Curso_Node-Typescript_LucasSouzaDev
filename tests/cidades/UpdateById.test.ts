import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
    it("Atualiza registro", async () => {
        
        const res1 = await testServer
            .post("/cidades")
            .send({ name: 'São Vicente' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({name: 'Santos'});

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it("Tenta atualizar registro que não existe", async () => {
        
        const res1 = await testServer
            .put("/cidades/99999")
            .send({name: 'Santos' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});