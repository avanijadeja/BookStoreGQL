const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Define the functions that will fulfill the query
  Query: {
    // me return all user data with savedBooks
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
        return userData;
      }
      //  If user not login error occur
      throw new AuthenticationError("You must be logged in!");
    },
  },

  // Define the functions that will fulfill the mutations
  Mutation: {
    // adduser mutation
    addUser: async (parent, args) => {
      // create user
      const user = await User.create(args);
      //  generate token
      const token = signToken(user);
      //  return user and token
      return { token, user };
    },
    // for login check email and password if not find error occur
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const corectPw = await user.iscorrectPassword(password);
      // if password not correct error occur
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      //  token with particular user
      const token = signToken(user);
      return token, user;
    },

    //  saveBook mutation
    saveBook: async (parent, { bookData }, context) => {
      //  for current user
      if (context.user) {
        const newUserData = await User.findByIdAndUpdate(
          context.user._id,
          {
            //  for particular user save book
            $push: { savedBooks: bookData },
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

    // removeBook mutation
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const newUserData = await User.findByIdAndUpdate(
          context.user._id,
          {
            // pull book from saveBook
            $pull: { savedBooks: { bookId: bookId } },
          },
          {
            // return new data
            new: true,
          }
        );
        return newUserData;
      }
      //  if user not login error occur
      throw new AuthenticationError("Please LogIn!");
    },
  },
};

// export resolvers
module.exports = resolvers;
