import { GET_BLOGS,POST_BLOGS,UPDATE_BLOGS,DELETE_BLOGS } from "../type";
import {GetBlogsApi,PostBlogsApi, UpdateBlogsApi,DeleteBlogsApi} from "../../api/axiosRequest";

const GetBlogAction = () => {
    return function(dispatch){
        return GetBlogsApi().then((response) => {
            console.log("ressssss",response.data);

            dispatch({
                type:GET_BLOGS,
                payload : response.data,
            });

        });
    };
}

const PostBlogAction = (request) => {
    return function(dispatch){
        dispatch({
            type:POST_BLOGS,
            payload : false,
        });

        return PostBlogsApi(request).then((response) => {
            console.log("ressssss",response.data);

            dispatch({
                type:POST_BLOGS,
                payload : true,
            });

        });
    };
}


const UpdateBlogAction = (request,id) => {
    return function(dispatch){
        dispatch({
            type:UPDATE_BLOGS,
            payload : false,
        });

        return UpdateBlogsApi(request,id).then((response) => {
            console.log("ressssss",response.data);
            dispatch({
                type:UPDATE_BLOGS,
                payload : true,
            });

        });
    };
}

const DeleteBlogAction = (id) => {
    return function(dispatch){
        dispatch({
            type:DELETE_BLOGS,
            payload : false,
        });
        console.log("idddddddddddddddddddddddddddddd",id);
        return DeleteBlogsApi(id).then((response) => {
            console.log("ressssss",id);
            dispatch({
                type: DELETE_BLOGS,
                payload : true,
            });

        });
    };
}

export {GetBlogAction, PostBlogAction, UpdateBlogAction, DeleteBlogAction};