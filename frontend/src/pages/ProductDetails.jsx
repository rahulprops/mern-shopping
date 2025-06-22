import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyProductDetailsQuery } from '../Features/Product/ProductSlice';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [fetchProductDetails, { data: product, isLoading, error }] = useLazyProductDetailsQuery();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);

  const increment = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-600">Error loading product</p>;
  if (!product) return <p>No product data found</p>;

  const {
    name,
    description,
    price,
    productImage,
    category,
    stock,
    rating,
    reviews = [],
  } = product;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-6">
        <div>
          <img
            src={`http://localhost:5590/image/product/${productImage}`}
            alt={name}
            className="w-full h-[400px] object-cover rounded"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-2">Category: <span className="text-blue-600">{category}</span></p>
          <p className="text-2xl font-bold text-green-600 mt-4">₹ {price}</p>

          <div className="flex items-center mt-2">
            <span className="text-yellow-400 text-lg">
              {'★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              ({reviews.length} review{reviews.length !== 1 && 's'})
            </span>
          </div>

          <p className="mt-4 text-gray-700">{description}</p>

          <p className="mt-4">
            <span className={`font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
            </span>
          </p>

          {/* Quantity Controller */}
          {stock > 0 && (
            <div className="flex items-center gap-4 mt-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  onClick={increment}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={stock === 0}
          >
            Add {quantity} to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li key={rev._id} className="border-b pb-3">
                <div className="flex justify-between">
                  <span className="font-bold">{rev.name}</span>
                  <span className="text-yellow-400">
                    {'★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{rev.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
