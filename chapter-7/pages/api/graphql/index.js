import { ApolloServer, gql, MockList } from 'apollo-server-micro';
import { isTokenValid, loginUser } from '../../../utils/authentication';

let cart = {
  count: 0,
  products: [],
  complete: false,
};

const typeDefs = gql`
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
        products: () => new MockList(cart.count),
      };

      return cart;
    },
    completeCart: (_, {}, { token }) => {
      console.log({ token });

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
 
    return { token }
  },
  mocks: mocks,
  mockEntireSchema: false,
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
