import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"
export default{
  Mutation:{
    followUser: async(_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      //팔로잉 하고 싶은 아이디
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id
              }
            }
          }
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      } 
    }
  }
}
