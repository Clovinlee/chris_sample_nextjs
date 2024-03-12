import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
query PRODUCT_QUERY{
    products{
        _id,
        name,
        stock,
        image,
        description,
    }
}
`;

const createProductInput = gql`
 input createProductInput{
    name: String!,
    stock: String!,
    description: String,
    imageUrl: String,
  }
`;

export const EDIT_PRODUCT = gql`
mutation EDIT_MUTATION($id: ID!, $body: createProductInput!){
    editProduct(id: $id, body: $body){
        _id,
        name,
        stock,
        image,
        description,
    }
}`;

export const DELETE_PRODUCT = gql`
mutation DELETE_MUTATION($id: ID!){
    deleteProduct(id: $id){
        _id,
        name,
        stock,
        image,
        description,
    }
}`;

export const INSERT_PRODUCT = gql`
mutation INSERT_MUTATION($body: createProductInput!){
    createProduct(body: $body){
        _id,
        name,
        stock,
        image,
        description,
    }
}
`;