import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import GetApi from '../../../Hooks/GetApi'

const Recomendation = ({mediaType,id}) => {
    const {data,loading} = GetApi(`/${mediaType}/${id}/recommendations`)
    console.log("similardata")
    console.log(data);
  return (
    <Carousel
        data={data?.results}
        endPoint={mediaType}
        loading={loading}
        title={"Recomendation"}
     />
  )
}

export default Recomendation