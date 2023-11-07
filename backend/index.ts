// Express app

import express from 'express';
import {schema} from "./src/graphql-schema";
import {graphqlHTTP} from "express-graphql";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
}));

app.get('/is_alive', (req, res) => {
    res.status(200).send('Yes, I am alive!');
})

app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on port 3000!');
});
