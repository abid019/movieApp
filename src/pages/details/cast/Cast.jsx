import React from 'react'
import "./style.scss"
import ContentWrapper from '../../../components/HOC/ContentWrapper'
import { useSelector } from 'react-redux'
import avatar from "../../../assets/avatar.png";
import Img from '../../../components/lazyload/Img';

const Cast = ({data,loading}) => {
    const {url} = useSelector(state=>state.home)
    const skeleton = ()=>{
        return(
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    }
  return (
    <div className='castSection'>
        <ContentWrapper>
            <div className="sectionHeading">Top Cast</div>
            {
                !loading ? (
                    <div className="listItems">
                        {data?.map((item)=>{
                            let ImgUrl = item.profile_path ? 
                            ( url.backdrop + item.profile_path):
                            (avatar)
                            return(
                                <div
                                    key={item.id}
                                    className="listItem">
                                    <div className="profileImg">
                                        <Img src={ImgUrl} />
                                    </div>
                                    <div className="name">
                                        {item.name}
                                    </div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ):(
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Cast