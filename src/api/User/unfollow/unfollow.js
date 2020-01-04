import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      const { id } = args; // Other person id
      const { user } = request;

      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id
              }
            }
          }
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
