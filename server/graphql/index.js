const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const { portfolioQueries, portfolioMutations } = require("./resolves");
const { portfolioTypes } = require("./types");
const Portfolio = require("./models/Portfolio");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
      },
    }),
  });

  return apolloServer;
};
