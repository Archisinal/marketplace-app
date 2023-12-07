import { buildSchemaSync } from "type-graphql";
import MyResolver from "./graphql-resolvers";
import "reflect-metadata";

export const schema = buildSchemaSync({
  resolvers: [MyResolver],
});
