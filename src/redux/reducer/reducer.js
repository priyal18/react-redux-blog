import { GET_BLOGS,POST_BLOGS, UPDATE_BLOGS, DELETE_BLOGS } from "../type";

const initialState = {
    blogs:[],
    isResponse:false,
    blogById:[],
    isUpdateResponse: false,
    isDeleteResponse: false,
}

export const Reducer = (state=initialState, action) => {
    switch(action.type){
        case GET_BLOGS:
            console.log("payload    ",action.payload);
            return{
            blogs: action.payload,
            };
        case POST_BLOGS:
            console.log("postss",action.payload);
            return{
                isResponse: action.payload,
            };
        case UPDATE_BLOGS:
            console.log("postss",action.payload);
            return{
                isUpdateResponse: action.payload,
            };
        case DELETE_BLOGS:
            console.log("postss",action.payload,"  isResponse  ",state.isDeleteResponse);
            return{
                isDeleteResponse: action.payload,
            };
        default:
            return state;
    }
}
