import { prisma } from "../../../../generated/prisma-client";
export default{
  Mutation:{
    checkedEmail: async(_,args, {request}) => {
      const {email} = args;
      try {
        const user = await prisma.user({email});
        if(user.checkedEmail){
          return true;
        }
        else{
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }
}
