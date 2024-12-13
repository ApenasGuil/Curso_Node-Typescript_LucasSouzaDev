import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT, () => console.log("Backend rodando."));
};

if (process.env.IS_LOCALHOST !== 'true') {
Knex.migrate
    .latest()
    .then(() => {
        startServer();
    })
    .catch(console.log);
} else { 
    startServer();
}