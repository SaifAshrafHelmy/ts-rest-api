require("dotenv").config()

export default{
  port: 1337,
  dbUri: "mongodb://127.0.0.1:27017/rest-ts-api",
  saltWorkFactor: 10,
  JWT_SECRET : process.env.JWT_SECRET ,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',

}