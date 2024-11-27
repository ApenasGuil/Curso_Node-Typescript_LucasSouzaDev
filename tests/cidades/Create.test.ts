import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
    it("Cria registro", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: "São Vicente" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Recebeu 201 (Created), esperava 400  (Created)
        expect(typeof res1.body).toEqual('number');
    });
    it("Tenta criar um registro com nome muito curto", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: "Sã" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Recebeu 201 (Created), esperava 400  (Bad Request)
        expect(res1.body).toHaveProperty('errors.body.name');
    });
    it("Tenta criar um registro com número", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ name: 123 });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); // Recebeu 201 (Created), esperava 400  (Bad Request)
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});
