// Express app

import express from 'express';
import {schema} from "./src/graphql-schema";
import {graphqlHTTP} from "express-graphql";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
}));

app.listen(3001, () => {
    console.log('Listening on port 3000!');
});