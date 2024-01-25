import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import GetApi from '../../../Hooks/GetApi'

const Similar = ({mediaType,id}) => {
    const {data,loading} = GetApi(`/${mediaType}/${id}/similar`)
    console.log("similardata")
    console.log(data);
    const title = mediaType === "tv" ? "Similar Tv shows" : "Similar Movies"
  return (
    <Carousel
        data={data?.results}
        endPoint={mediaType}
        loading={loading}
        title={title}
     />
  )
}

export default Similar