import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GetApi from '../../../Hooks/GetApi';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyload/Img';
import './style.scss'
import ContentWrapper from '../../../components/HOC/ContentWrapper'
const HeroBanner = () => {
  const navigate = useNavigate();
  const [background,setBackground] = useState("")
  const {url} = useSelector((state)=>state.home);
  const {data,loading} = GetApi("/movie/upcoming")
  const [Query,setQuery] = useState("");
  console.log(data);
  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);
  },[data])
  console.log(background)

  
  const handleQueryHandler = (event)=>{
    if(event.key === "Enter" && Query.length > 0){
      navigate(`/search/${Query}`)
    }
  }
  const clickhandler = ()=>{
    if(Query.length > 0){
      navigate(`/search/${Query}`)
    }
  }
  return (
    <div className='heroBanner'>
      
      <div className='backdrop-img'>
        { !loading && <Img src={background}/>}
      </div>
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='wrapper'>
          <div className='heroBannerContent'>
            <span className='title'>Welcome.</span>
            <span className='subTitle'>
              Million's of movies, Tv shows and people to discover. Explore Now.
            </span>
            <div className='searchInput'>
              <input 
                placeholder='Search...'
                type='text'
                onChange={(e)=>setQuery(e.target.value)}
                onKeyUp={handleQueryHandler}
              />
              <button onClick={clickhandler}>Search</button>
            </div>
          </div> 
        </div>
      </ContentWrapper>
      
    </div>
  )
}

export default HeroBanner