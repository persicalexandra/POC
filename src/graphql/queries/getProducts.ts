import { gql } from '@apollo/client'

const GET_PRODUCTS = gql`
query getProducts {
	products {
    id
    title
    description
    category
    price
    discountPercentage
    rating
    stock
    tags
    thumbnail
	}
}`;

export default GET_PRODUCTS;

