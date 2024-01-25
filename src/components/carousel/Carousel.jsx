import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import './style.scss'
import Img from "../lazyload/Img";
import { useSelector } from "react-redux";
import PosterFallback from '../../assets/no-poster.png'
import ContentWrapper from "../HOC/ContentWrapper";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


const Carousel = ({data,endPoint,loading,title}) => {
    const {url} = useSelector(state=>state.home);
    const carouselContainer = useRef();
    const navigate = useNavigate();
    const navigation = (dir)=>{
        const container = carouselContainer.current;
        const scrollAmount = 
            dir === "left" ?
                // element.scrollLeft = the number of pixel the element is already scrolled - elemnt.offsetWidth = total view of the elemnt 
                container.scrollLeft - (container.offsetWidth + 20) :
                container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left:scrollAmount,
            behavior:"smooth"
        })
    }
    const skItem = () =>{
        return (
            <div className="skeletionItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }
  return (
    <div className='carousel'>
        <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div> }
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={()=>navigation("left")}
            />
            <BsFillArrowRightCircleFill
                className="carouselRighttNav arrow"
                onClick={()=>navigation("right")}
            />
            {!loading ? (
                <div className="carouselItems " ref={carouselContainer}>
                    {data?.map((item)=>{
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                        return(
                            <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)} >
                                <div className="posterBlock">
                                    <Img src={posterUrl} />
                                    <CircleRating rating={item.vote_average.toFixed(1)} />
                                    <Genres data={item.genre_ids.slice(0,2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ): (
                <span className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </span>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel