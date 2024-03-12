import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    profession: String
  }

  type Product {
    _id: ID!
    name: String!
    stock: Int!
    createdAt: String!
    updatedAt: String!
    description: String
    image: String

    category: Category!
  }  

  type Category {
  _id: ID!
  name: String!
  description: String,

  products: [Product!],
  }

  type Query{
    users: [User]!,
    user(id: ID!): User,
    products: [Product]!,
    product(id: ID!): Product,
    categories: [Category]!,
    category(id: ID!): Category,
  }

  input createProductInput{
    name: String!,
    stock: String!,
    description: String,
    imageUrl: String,
  }
  
  type Mutation{
    createProduct(body: createProductInput): Product,
    editProduct(id: ID!, body: createProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`;

export default typeDefs;