import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import PageTitle from '../components/PageTitle'
import { useGetProductQuery } from '../Features/Product/ProductSlice'

const Home = () => {
  const {data, error, isLoading}=useGetProductQuery();
  console.log(data)
  console.log(error)
  
  return (
    <div>
        <PageTitle title="Home-shopping" />
        <Navbar/>
        <ImageSlider/>
        <Footer/>
    </div>
  )
}

export default Home