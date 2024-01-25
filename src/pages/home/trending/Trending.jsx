import React,{useState} from 'react'
import ContentWrapper from '../../../components/HOC/ContentWrapper'
import './style.scss'
import SwitchTab from '../../../components/switchtab/SwitchTab'
import GetApi from '../../../Hooks/GetApi'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
  const [endPoint,setEndPoint] = useState("day");
  const {data,loading} = GetApi(`/trending/all/${endPoint}`)
    const onTabChange = (tab)=>{
      setEndPoint(tab === "Day" ? "day":"week")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTab data={["Day","week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending;