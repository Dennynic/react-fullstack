const express = require("express");
const next = require("next");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//resolves

const { portfolioResolves } = require("./graphql/resolves");

//types

const { portfolioTypes } = require("./graphql/types");

app.prepare().then(() => {
  const server = express();

  //Construct a schema
  const schema = buildSchema(` 
    ${portfolioTypes}
      
    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio] 
    }
    
    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
    }
  `);

  //The root provides a resolver for each API endpoint
  const root = {
    ...portfolioResolves,
  };

  server.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});