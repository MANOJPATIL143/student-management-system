import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  mongoose.Promise = Promise;
  mongoose
    .connect(dbUri)
    .then((x) => {
      logger.info(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      logger.error("Error connecting to MongoDB", err.reason);
    });
  mongoose.connection.on("error", (error: Error) => logger.error(error));
}

export default connect;
