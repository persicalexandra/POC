import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    products: [Product]
    searchProduct(value:String):[Product]
  }

  type Product {
    id: ID
    title: String
    description: String
    category: String
    price: Float
    discountPercentage: Float
    rating: Float
    stock: Float
    tags: [String]
    thumbnail: String
  }
`
export default typeDefs
