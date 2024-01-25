import './App.css'
import { useState,useEffect } from 'react'
import {fetchDataFromApi} from "./utils/api"
import {useSelector,useDispatch} from "react-redux"
import { getApiConfiguration,getgenres } from './redux/slices/homeSlice'
import {Routes,Route} from "react-router-dom"
import Details from "./pages/details/Details"
import Explore from "./pages/explore/Explore"
import Home from "./pages/home/Home"
import Searchresult from "./pages/searchResult/Searchresult"
import Footer from "./components/footer/Footer"
import Header from './components/header/Header'
import PageNotFound from './pages/404/PageNotFound'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    apiconfiguration();
    genrescall();
  },[])
  const apiconfiguration=()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
       const configurations = {
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        title:res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(configurations))
    })
    .catch((error)=>{console.log(error)});
  }
//ye wala fir se dekhna his
    const genrescall = async()=>{
      const promises = []
      const endPoints = ["tv","movie"]
      const allgenres = {}
      endPoints.forEach((url)=>{
        promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })
      const data = await Promise.all(promises)
      // console.log(data)
      data?.map(({genres})=>{
        return genres?.map((item)=>(allgenres[item.id] = item))
      })
      // console.log(allgenres)
      dispatch(getgenres(allgenres))
    }
  const url = useSelector((state)=>state.home.url)
  
  return (
    <>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/:mediaType/:id' element={<Details/>} />
          <Route path='/search/:query' element={<Searchresult/>} />
          <Route path='/explore/:mediaType' element={<Explore/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
        <Footer/>
    </>
  )
}

export default App
