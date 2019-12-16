import { prisma } from "../../../../generated/prisma-client";
export default{
  Mutation: {
    sendMessage: async(_, args, {request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      console.log(roomId);
      // 채팅방이 없을때
      //console.log(roomId);
      if(roomId === undefined){
        if(user.id !== toId){

          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
          console.log(room);
        }
      }
      // 채팅방이 있을때
      else {
        room = await prisma.room({ id: roomId });

      }
      if(!room){
        throw Error("Room not Found")
      }
      //상대방의 알기 위한 getTo
      const getTo = await room.participants.find(participant => participant.id !== user.id);
      console.log(getTo);

      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });

    }
  }
};
