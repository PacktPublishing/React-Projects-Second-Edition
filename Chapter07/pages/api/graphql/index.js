import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { loginUser, isTokenValid } from '../../../utils/authentication';

let cart = {
  count: 0,
  products: [],
  complete: false,
};

const typeDefs = /* GraphQL */ `
  type Product {
    id: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: Category
  }

  type Category {
    id: Int!
    title: String!
  }

  type Cart {
    count: Int
    products: [Product]
    complete: Boolean
  }

  type User {
    username: String!
    token: String!
  }

  type Query {
    product: Product
    products(limit: Int): [Product]
    categories: [Category]
    cart: Cart
  }

  type Mutation {
    addToCart(productId: Int!): Cart
    loginUser(username: String!, password: String!): User
    completeCart: Cart
  }
`;

const mocks = {
  Int: () => Math.floor(Math.random() * 99) + 1,
  Float: () => (Math.random() * 99.0 + 1.0).toFixed(2),
  Product: () => ({
    thumbnail: () => 'https://picsum.photos/400/400',
  }),
};

const resolvers = {
  Query: {
    cart: () => cart,
  },
  Mutation: {
    loginUser: async (_, { username, password }) => {
      const user = loginUser(username, password);

      if (user) {
        return user;
      }
    },
    addToCart: (_, { productId }) => {
      cart = {
        ...cart,
        count: cart.count + 1,
        products: [
          ...cart.products,
          {
            productId,
            title: 'My product',
            thumbnail: 'https://picsum.photos/400/400',
            price: (Math.random() * 99.0 + 1.0).toFixed(2),
            category: null,
          },
        ],
      };

      return cart;
    },
    completeCart: (_, {}, { token }) => {
      if (token && isTokenValid(token)) {
        cart = {
          count: 0,
          products: [],
          complete: true,
        };

        return cart;
      }
    },
  },
};

const executableSchema = addMocksToSchema({
  schema: makeExecutableSchema({
    typeDefs,
  }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    return { token };
  },
  mocks,
  resolvers,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  const result = await runMiddleware(
    req,
    res,
    graphqlHTTP({
      schema: executableSchema,
      graphiql: true,
    }),
  );

  res.json(result);
}

export default handler;
