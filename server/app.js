import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

app.listen(3000, () => {
  console.log(`I Love You 3000`);
});
