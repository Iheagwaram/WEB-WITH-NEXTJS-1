export default async function handler(req, res) {
    try {
      const data = await fetch(`https://fakestoreapi.com/products?limit=10`);
      const response = await data.json();
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }