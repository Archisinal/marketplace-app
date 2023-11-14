import express from "express";
import { schema } from "./src/graphql-schema";
import { graphqlHTTP } from "express-graphql";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const app = express();
const upload = multer({ dest: "uploads/" });

const projectId = process.env.INFURA_API_KEY;
const projectSecret = process.env.INFURA_API_KEY_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
  })
);

app.get("/is_alive", (req, res) => {
  res.status(200).send("Yes, I am alive!");
});

app.post("/upload_ipfs", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) throw new Error("No file provided");

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "https://ipfs.infura.io:5001/api/v0/add",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          authorization: auth,
        },
      }
    );

    fs.unlinkSync(req.file.path); // Clean up file from local storage after upload
    res.json(response.data);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Listening on port 3001!");
});
