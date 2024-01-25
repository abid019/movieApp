import React from 'react'
import "./style.scss"
import HeroBanner from "./heroBanner/HeroBanner"
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Trending from './trending/Trending'
const Home = () => {
  return (
    <div className='homepage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home