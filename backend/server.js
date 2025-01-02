import express from "express"
import endopints from "express-list-endpoints"
import mongoose from "mongoose"
import dotenv from "dotenv"
import contractsRoutes from "./routes/contractsRoutes.js"
import cors from "cors"
import session from "express-session"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use("/contracts-hw", contractsRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MONGOOSE CONNESSO"))
    .catch((error) => console.error("MONGODB ERROR_", error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server acceso sulla port ${PORT}`);
    console.log("Sono disponibili i seguenti endopints");
    console.table(endopints(app))
})