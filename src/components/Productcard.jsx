import React from 'react';
import Link from 'next/link';
const ProductCard = ({ product }) => {

  return (
    <>
      <Link href={`/product/${product.id}`} className="bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition duration-300 hover:scale-105 hover:shadow-lg">

        <div>
          <img className='h-40  px-20 rounded-md' src={product.image} alt="" />
        </div>

        <div className="mt-3">
          <h2 className="text-lg font-semibold my-6">{product.category}</h2>
          <h2 className="text-gray-600 text-md font-bold mb-6">{product.title}</h2>
          <p className="text-xl font-semibold mt-2 text-green-600 mb-5">${product.price}</p>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="mt-4 block text-center bg-slate-700 text-white py-3 rounded-xl h-12  hover:bg-slate-600 transition"
        >
          View More Details
        </Link>

      </Link>
    </>
  );
};

export default ProductCard;