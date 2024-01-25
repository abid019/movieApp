import React, { useEffect, useState } from 'react'
import "./style.scss"
import ContentWrapper from '../HOC/ContentWrapper'
import logo from '../../assets/movix-logo.svg'
import {HiOutlineSearch} from 'react-icons/hi'
import {SlMenu} from 'react-icons/sl'
import {VscChromeClose} from 'react-icons/vsc'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
  const [mobileMenu,setMobileMenu] = useState(false)
  const [Query,setQuery] = useState("");
  const [showsearch,setShowSearch] = useState(false)
  const [show,setShow] = useState("top");
  const [presentscroll,setPresentscroll] = useState(0)
  const navigate = useNavigate()
  const location = useLocation();
  
    useEffect(()=>{
      window.scrollTo(0,0)
    },[location])
  const handleQueryHandler = (event)=>{
    if(event.key === "Enter" && Query.length > 0){
      navigate(`/search/${Query}`)
      setTimeout(() => {
        setShowSearch(false);
      },1000);
    }
  }

  const setnavbar = ()=>{
    // console.log(window.scrollY)
    if(window.scrollY > 520) {
      if(window.scrollY > presentscroll){
        setShow("hide")
      }
      else
        setShow("show")
    }else{
      setShow("top");
    }
    setPresentscroll(window.scrollY)
  }
  useEffect(()=>{
    window.addEventListener("scroll",setnavbar)
    return()=>{
      window.removeEventListener("scroll",setnavbar)
    }
  },[presentscroll])
  
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} `}>
      <ContentWrapper>
        <div className='logo' onClick={()=> navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li 
            className="menuItem"
            onClick={()=>{
              navigate('/explore/movie')
              setMobileMenu(false);
            }}
          >
            Movies
          </li>

          <li 
            className="menuItem"
            onClick={()=>{
                navigate('/explore/tv')
                setMobileMenu(false);
            }}>
              Tv Shows
          </li>
              
          <li className="menuItem">
            <HiOutlineSearch onClick={()=>{
              setShowSearch(true);
            }}/>
          </li>
        </ul>

        {/* mobile view */}
        <div className='mobileMenuItems'>
          <HiOutlineSearch
            onClick={()=>{
              setShowSearch(true);
              setMobileMenu(false)
            }}
          />
          {mobileMenu ? 
            (<VscChromeClose 
                onClick={()=>{
                  setMobileMenu(false)
                }}/>
            ):
            (<SlMenu 
                onClick={()=>{
                  setShowSearch(false)
                  setMobileMenu(true)
                }}/>
            )
          }
        </div>
      </ContentWrapper>
      { showsearch && <div className='searchBar'>
        <ContentWrapper>
           <div className='searchInput'>
            <input 
                type='text'
                placeholder='search...'
                onChange={(e)=>setQuery(e.target.value)}
                onKeyDown={handleQueryHandler} />
            <VscChromeClose 
                  onClick={()=>setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>}
    </header>
  )
}

export default Header