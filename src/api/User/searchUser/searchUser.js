import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;

      if (term.length > 0) {
        const users = prisma.users({
          where: {
            OR: [
              { username_contains: term },
              { firstName_contains: term },
              { lastName_contains: term }
            ]
          }
        });
        return users;
      } else {
        throw Error("Please enter a character to search box");
      }
    }
  }
};
