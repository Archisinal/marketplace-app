import express from "express";
import { schema } from "./src/graphql-schema";
import { graphqlHTTP } from "express-graphql";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import fs from "fs";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
const PINATA_JWT = "Bearer " + process.env.PINATA_JWT;
const app = express();
app.use(cors({ origin: "*" }));
const upload = multer({ dest: "uploads/" });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.get("/is_alive", (req, res) => {
  res.status(200).send("Yes, I am alive!");
});

app.post("/upload_ipfs", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) throw new Error("No file provided");

    const formData = new FormData();
    const pinataMetadata = JSON.stringify({
      name: req.file.originalname || uuidv4(),
    });
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("file", fs.createReadStream(req.file.path));
    formData.append("pinataMetadata", pinataMetadata);
    formData.append("pinataOptions", pinataOptions);

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${
            (formData as any)._boundary
          }`,
          Authorization: PINATA_JWT,
        },
      },
    );

    fs.unlinkSync(req.file.path);
    res.json(result.data);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on port 3001!");
});
