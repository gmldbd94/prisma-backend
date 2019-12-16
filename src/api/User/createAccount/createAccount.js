import { prisma } from "../../../../generated/prisma-client";
export default{
  Mutation:{
    createAccount: async(_,args)=>{
      const { username, email, firstName = "", lastName = "", bio= ""} = args;
      const exists = await prisma.$exists.user({
        OR:[
          { username },
          { email }
        ]
      });
      if(exists){
        throw Error("This username is already");
      }
      try {
        const user = await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio
        });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}