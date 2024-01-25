import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/HOC/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard'
 
const Searchresult = () => {
  const [data,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();
  const fetchInitialData = ()=>{
      setLoading(true)
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res)=>{
        setData(res);
        setPageNum((prev) => prev+1)
        setLoading(false);
      })
  }
  const fetchNextPageData = ()=>{
      setLoading(true)
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res)=>{
        setLoading(false);
        if(data?.results){
          setData({
            ...data,
            results:[...data?.results,...res?.results]

          })
          setPageNum((prev)=>prev+1)
        }
        else{
          setData(res);
        }
      })
  }
  
  useEffect(()=>{
    
    fetchInitialData();
    // fetchNextPageData();
  },[query])
  return (
    <div className='searchResultsPage'>
        {loading && <Spinner initial={true} /> }
        {!loading && 
          (<ContentWrapper>
              {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search ${data?.total_results > 1 ? "results": "result" } of '${query}' `}
                </div>
                <InfiniteScroll
                  className='content'
                  dataLength={data?.result?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner/>}
                  >
                  {data?.results?.map((item,index)=>{
                    if(item?.media_type === "person")  return;
                    return(
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}
                </InfiniteScroll>
              </>
            ):(
              <span className='resultNotFound'>Search result not found</span>
            )}
          </ContentWrapper>)}
    </div>
  )
}

export default Searchresult