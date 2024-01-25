import React,{useState} from 'react'
import ContentWrapper from '../../../components/HOC/ContentWrapper'
import './style.scss'
import SwitchTab from '../../../components/switchtab/SwitchTab'
import GetApi from '../../../Hooks/GetApi'
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {
  const [endPoint,setEndPoint] = useState("movie");
  const {data,loading} = GetApi(`/${endPoint}/top_rated`)
    const onTabChange = (tab)=>{
      setEndPoint(tab === "Movies" ? "movie":"tv")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTab data={["Movies","Tv"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} endPoint={endPoint} loading={loading} />
    </div>
  )
}

export default Popular