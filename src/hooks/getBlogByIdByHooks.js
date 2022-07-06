import { useEffect, useState } from "react";
import { GetBlogByIdApi } from "../api/axiosRequest";


export default (props)=>{
    const [blogById,setBlogById] = useState({});
    const GetBlogByIdByHooks = (requestId) => {
        
            return GetBlogByIdApi(requestId).then((response) => {
                console.log("ressssss",response);
                setBlogById(response);
            });
        
    }

    useEffect(()=>{
        GetBlogByIdByHooks(props);
    },[])

    return [blogById];

}

