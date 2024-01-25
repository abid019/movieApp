import React, { useState } from 'react'
import { useEffect } from 'react'
import {fetchDataFromApi} from '../utils/api'

const GetApi = (url) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(null)
    const [err,setErr] = useState(null)
    useEffect(()=>{
        setLoading("loading...");
        setData(null)
        setErr(null);

        fetchDataFromApi(url)
        .then((res)=>{
            setLoading(false)
            setData(res);
        })
        .catch((error)=>{
            setLoading(false);
            setErr("something went wrong");
        })
    },[url])
  return {data,loading,err}
}

export default GetApi;