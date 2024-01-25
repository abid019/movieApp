import React from 'react'
import './style.scss'
import ContentWrapper from '../../../components/HOC/ContentWrapper'
import { useState } from 'react'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import Img from '../../../components/lazyload/Img'
import { PlayIcon } from '../PlayIcon'
const VideosSection = ({data,loading}) => {
    const [show,setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);
    const loadingSkeleton = ()=>{
        <div className="skItem">
            <div className="thumb skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    }
  return (
    <div className="videosSection">
        <ContentWrapper>
            <div className="sectionHeading">Official Videos</div>
            {!loading ? (
                <div className='videos'>
                    {data?.results?.map((video)=>(
                        <div className="videoItem"
                            key={video.id}
                            onClick={()=>{
                                setShow(true)
                                setVideoId(video.key)
                            }}>
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon/>
                                </div>
                                <div className="videoTitle">
                                    {video.name}
                                </div>
                        </div>
                    ))}
                </div>
            ):
            (
                <div className="videoSkeleton">
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                </div>
            )}
            <VideoPopup 
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </ContentWrapper>
        
    </div>
  )
}

export default VideosSection