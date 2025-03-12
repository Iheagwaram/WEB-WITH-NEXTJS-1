import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/Cartslices';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Get the dynamic ID from the URL

  useEffect(() => {
    if (!id) return; // Ensure ID is available

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading product details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  // const dispatch = useDispatch();
  // const FLUTTER_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
  // const config = {
  //   public_key: FLUTTER_PUBLIC_KEY,
  //   tx_ref: Date.now(),
  //   amount: product?.price || 0,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     email: 'user@gmail.com',
  //     phone_number: '070**',
  //     name: 'John Doe',
  //   },
  //   customizations: {
  //     title: 'My Store',
  //     description: `Payment for ${product?.title || "items in cart"}`,
  //     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //   },
  // };

  // const fwConfig = {
  //   ...config,
  //   text: 'Order Now',
  //   callback: (response) => {
  //     console.log(response);
  //   },
  //   onClose: () => {},
  // };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center">

        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={product?.image || ''}
            alt={product?.title || 'Product Image'}
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{product?.title || 'No Title Available'}</h1>
          <p className="text-gray-600 text-lg mb-4">{product?.description || 'No description available.'}</p>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            ${product?.price || 'N/A'}
          </p>
          <div className='flex gap-4'>
            <button onClick={() => product && dispatch(addToCart(product))} className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-700">Add to Cart</button>
            <FlutterWaveButton
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500"
              {...fwConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
