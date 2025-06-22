import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import PageTitle from '../components/PageTitle'


import ProductContainer from '../components/ProductContainer'

const Home = () => {
 
  return (
    <div>
        <PageTitle title="Home-shopping" />
        <Navbar/>
         <ImageSlider/>
          <ProductContainer />
        <Footer/>
    </div>
  )
}

export default Home