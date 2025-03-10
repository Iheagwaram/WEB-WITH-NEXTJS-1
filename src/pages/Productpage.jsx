import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon

const Productpage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      )
    );
  };

  const filterByPrice = (price) => {
    if (!price) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.price > price));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between px-10 items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        {/* Search Bar with Icon */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-white border border-gray-400 rounded-md px-3 py-1 text-gray-700 w-64"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow outline-none px-2 py-1 text-gray-700"
          />
          <button type="submit" className="bg-slate-800 text-white px-3 py-2 rounded">
            <FaSearch className="text-white" />
          </button>
        </form>

        {/* Filter Dropdown */}
        <select
          onChange={(e) => filterByPrice(Number(e.target.value))}
          className="bg-gray-600 text-gray-100 rounded-lg p-0.5 px-3 h-9"
        >
          <option value="">Filter by Price...</option>
          <option value="50">Above $50</option>
          <option value="100">Above $100</option>
          <option value="200">Above $200</option>
        </select>
      </div>

      {error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg text-center shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
                <div className="w-full flex justify-center gap-3">
                  {/* <Link hrefLang="{`/product/${product.id}`}"> */}
                    <button className="w-full mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                      View More
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Productpage;
