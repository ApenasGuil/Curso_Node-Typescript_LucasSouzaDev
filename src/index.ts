import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT, () => console.log("Backend rodando."));
};

if (process.env.IS_LOCALHOST !== "true") {
    console.log("Rodando migrations.");
    
    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed
                .run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}
