import {buildSchemaSync} from "type-graphql";
import MyResolver from "./graphql-resolvers";

export const schema = buildSchemaSync({
    resolvers: [ MyResolver ],
})

