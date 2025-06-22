import React from "react";
import { useGetProductQuery } from "../Features/Product/ProductSlice";

import Loader from "../components/Loader";
import ProductCard from "../components/Product";

const Products = () => {
  const { data: products, isLoading, error } = useGetProductQuery();

  const categories = ["All", "Men", "Women", "Shoes", "Accessories", "Electronics"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <aside className="md:col-span-1 bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat, index) => (
              <li key={index}>
                <button className="text-gray-700 hover:text-blue-600 transition">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Section - Products */}
        <section className="md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">Error loading products.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
