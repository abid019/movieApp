import React from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import GetApi from '../../Hooks/GetApi'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recomendation from './carousels/Recomendation'
const Details = () => {
  const {mediaType, id} = useParams();
  const {data,loading} = GetApi(`/${mediaType}/${id}/videos`)
  const {data: credits,loading: creditsLoading} = GetApi(`/${mediaType}/${id}/credits`)
  return(
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew}  />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading}  />
      <Similar mediaType={mediaType} id={id} />
      <Recomendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details