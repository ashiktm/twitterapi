import app from "./app.js";
import connect from "./config/database-config.js";

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    // Mongoose connection
    await connect();
    console.log("Database successfully connected");
});
