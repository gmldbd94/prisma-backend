import "./env";
import { GraphQLServer } from "graphql-yoga";
//import { prisma } from "../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares"
import { uploadMiddleware, uploadController } from "./upload";
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
 });
// context는 resolver사이에서 정보를 공유할 때 사용한다.
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);
// //post 방식으로 api/upload 경로로 file라는 이름으로 파일이 보내진다.
// server.express.post("/api/upload", upload.single("file"), (res, res)) => {
//   const { file } = req;
//   console.log(file);
// }

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
