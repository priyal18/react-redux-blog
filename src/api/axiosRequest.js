import axios from "axios"

export async function AxiosRequest(url,method,headers,params){
    return params 
    ? 
        axios({
            url:url,
            method:method,
            headers:headers,
            data:params,
            timeout:1000
        })
    :
        axios({
            url:url,
            method:method,
            headers:headers,
            data:{},
            timeout:1000
        })

}


const GetBlogsApi = () =>{
    const headers={
        "Content-type":"application/json",
    }
    return AxiosRequest("http://localhost:5000/blogs",'GET',headers,{});
}


const GetBlogByIdApi = (id) =>{
    const headers={
        "Content-type":"application/json",
    }
    return AxiosRequest(`http://localhost:5000/blogs/${id}`,'GET',headers,{});
}

const PostBlogsApi = (data) =>{
    const headers={
        "Content-type":"application/json",
    }
    return AxiosRequest("http://localhost:5000/blogs",'POST',headers,data);
}

const UpdateBlogsApi = (data,id) =>{
    const headers={
        "Content-type":"application/json",
    }
    return AxiosRequest(`http://localhost:5000/blogs/${id}`,'PUT',headers,data);
}

const DeleteBlogsApi = (id) =>{
    const headers={
        "Content-type":"application/json",
    }
    return AxiosRequest(`http://localhost:5000/blogs/${id}`,'DELETE',headers,{});
}


export {GetBlogsApi,PostBlogsApi,GetBlogByIdApi, UpdateBlogsApi, DeleteBlogsApi};