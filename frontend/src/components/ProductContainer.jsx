import React from 'react';
import { useGetProductQuery } from '../Features/Product/ProductSlice';
import ProductCard from './Product';
import Loader from './Loader';


const ProductContainer = () => {
  const { data, isLoading, error } = useGetProductQuery();
  console.log(data)

  if (isLoading) return <Loader/>;
  if (error) return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <>
    <div  className=' m-5  uppercase text-center font-bold text-2xl  text-slate-900'>Tranding products</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {data?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </>
  );
};

export default ProductContainer;
