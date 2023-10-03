import mongoose from "mongoose";
import config from "config"
import logger from "./logger";

function connect():Promise<void>{
  const dbUri = config.get<string>("dbUri")
  return mongoose.connect(dbUri)
    .then(() => {
      logger.info('Mongoose connection successful!');
    })
    .catch((err) => {
      logger.error('Mongoose connection error:', err);
      process.exit(1)
    });
}


export default connect;