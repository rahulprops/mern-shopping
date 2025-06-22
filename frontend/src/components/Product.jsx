import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={`http://localhost:5590/image/backend/public/product/${product.productImage
}`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.category}</p>
        <p className="text-gray-900 font-bold mt-2">₹ {product.price}</p>
        <div className="flex items-center mt-2">
          <div className="text-yellow-500 text-sm">
            {'★'.repeat(Math.round(product.rating)) || '☆☆☆☆☆'}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.numOfReviews} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
