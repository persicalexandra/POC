import { gql } from '@apollo/client'

const SEARCH_PRODUCTS = gql`
	query getSearchProducts($value: String) {
		searchProduct(value: $value) {
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
	}
`;

export default SEARCH_PRODUCTS;
