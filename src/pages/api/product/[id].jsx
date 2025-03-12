export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();

    res.status(200).json(data);
    return response();
  } catch (error) {
    console.log(error.message);
  }
}
