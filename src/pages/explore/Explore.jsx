import React, { useEffect, useState } from 'react'
import "./style.scss"
import ContentWrapper from '../../components/HOC/ContentWrapper'
import { useParams } from 'react-router-dom'
import Select from "react-select";
import GetApi from '../../Hooks/GetApi';
import { fetchDataFromApi } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';

let filters = {}
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const explore = () => {
  const [genre,setGenre] = useState(null);
  const [sortby,setSortby] = useState(null);
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const {mediaType} = useParams();
  const {data: gernresData} = GetApi(`/genre/${mediaType}/list`)

  const fetchInitialData = ()=>{
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`,filters)
    .then((res)=>{
      setData(res);
      setLoading(false);
      setPageNum((prev)=>prev+1);
    })
  }

  const fetchNextPageData = ()=>{
    
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`,filters)
    .then((res)=>{
      if(data?.results){
        setData({
          ...data , 
          results:[
            ...data?.results,
            ...res?.results,
          ]
        });
      }
      else{
        setData(res);
      }
      setPageNum((prev)=>prev+1);
    })

  }
  const onChange = (selectedItems,action)=>{
      if(action.name === "sortby"){
        setSortby(selectedItems);
          if(action.action !== "clear"){
            filters.sort_by = selectedItems.value;
          }
          else{
            delete filters.sort_by;
          }
      }
      if(action.name === "genres"){
        setGenre(selectedItems);
        if(action.action !== "clear"){
            let genreId = selectedItems.map((g)=>g.id)
            genreId = JSON.stringify(genreId).slice(1,-1);
            filters.with_genres = genreId
        }
        else{
          delete filters.with_genres;
        }
      }
      setPageNum(1);
      fetchInitialData();
  }
  useEffect(()=>{
    filters = {}
    setData(null);
    setPageNum(1);
    setGenre(null);
    setSortby(null);
    fetchInitialData();
  },[mediaType])
  return (
    <div className='explorePage'>
        <ContentWrapper>
          <div className="pageHeader">
            <div className="pageTitle">
              {mediaType === "tv" ?
                "Explore Tv Shows" :
                "Explore Movies"}
            </div>
            <div className="filters">
              <Select 
                isMulti
                name= "genres"
                value={genre}
                closeMenuOnSelect={false}
                options={gernresData?.genres}
                getOptionLabel={(option)=>option.name}
                getOptionValue={(option)=>option.id}
                onChange={onChange}
                placeholder="Select genres"
                className='react-select-container genresDD'
                classNamePrefix="react-select"
              />
              <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {loading && <Spinner initial={true} />}
          {!loading && (
            <>
              {data?.results?.length > 0 ? 
              (
                <InfiniteScroll
                  className='content'
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                  next={fetchNextPageData}
                  dataLength={data?.results?.length || []}
                >
                    {data?.results?.map((item,index)=>{
                      if(item?.media_type === "person") return;
                      return(
                        <MovieCard 
                          data={item}
                          mediaType={mediaType}
                          key={index}
                        />
                      )
                    })}
                </InfiniteScroll>
              ):(
                <span className="resultNotFound">
                  Sorry, Result not Found!
                </span>
              )}
            </>
          )}
        </ContentWrapper>
    </div>
  )
}

export default explore