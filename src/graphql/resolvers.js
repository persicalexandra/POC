const resolvers = {
  Query: {
    products: async () => {
      try {
        const response = await fetch(process.env.URL_API)

        const data = await response.json()

        return data.products.map(p => {
          return {
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            thumbnail: p.thumbnail
          }
        })
      } catch (error) {
        throw new Error("Something went wrong")
      }
    },
    searchProduct: async (_, { value }) => {
      try {
        const response = await fetch(`${process.env.URL_API}/search?q=${value}`)
        const data = await response.json()
        return data.products.map(p => {
          return {
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            thumbnail: p.thumbnail
          }
        })
      } catch (error) {
        debugger;
        throw new Error(`Something went wrong ${error}`)
      }
    }
  }
}
export default resolvers