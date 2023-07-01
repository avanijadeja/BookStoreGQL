const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Define the functions that will fulfill the query
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
        return userData;
      }
      throw new AuthenticationError("You must be logged in!");
    },
  },

  // Define the functions that will fulfill the mutations
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const corectPw = await user.iscorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      return token, user;
    },

    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const newUserData = await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: { savedBookds: bookData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return newUserData;
      }
      throw new AuthenticationError("Please LogIn!");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const newUserData = await User.findByIdAndUpdate(
          context.user._id,
          {
            $pull: { savedBooks: { bookId: bookId } },
          },
          {
            new: true,
          }
        );
        return newUserData;
      }
      throw new AuthenticationError("Please LogIn!");
    },
  },
};

module.exports = resolvers;
