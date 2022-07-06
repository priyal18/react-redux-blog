import React, {useEffect, useState} from 'react';
import {
  MDBValidation, MDBInput, MDBBtn,MDBTextArea
} from 'mdb-react-ui-kit';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAddBlogMutation,useUpdateBlogMutation } from '../services/blogApi';

import {GetBlogAction,PostBlogAction, UpdateBlogAction} from '../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import getBlogByIdByHooks from '../hooks/getBlogByIdByHooks';


//gnwnli7a

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
}

const options = ["Travel","Food","Fashion","Fitness","Sports","Tech"];


const AddEditBlog = () => {
  const dispatch = useDispatch();

  const isResponse = (useSelector((state) => 
    state.reducer.isResponse
  ));

  const isUpdateResponse = (useSelector((state) => 
    state.reducer.isUpdateResponse
  ));
  
  const [updateResp,setUpdateResp] = useState(isUpdateResponse);

  const [editMode,setEditMode] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(null);
  const {title,description,category,imageUrl} = formValue;
  const navigate = useNavigate();
  // const [addBlog, responseInfo] = useAddBlogMutation();
  // const [updateBlog, updateResp] = useUpdateBlogMutation();

  const getDate = () =>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,"0");
    let mm = String(today.getMonth()+1).padStart(2,"0"); //January is 0;
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  const {id} = useParams();
  let blogData = {};
  if(id)
  {
    const [blogById] = getBlogByIdByHooks(id);
    blogData = blogById;
  }
  console.log("shdghsj",blogData);
  

  useEffect(() => {
    if(id){
      setEditMode(true);
      const data = () => {
        if(blogData.data && blogData.status===200)
        {
          setFormValue({...blogData.data});
        }
      }
      data();
      //getSingleBlog(id);
    }else{
      setEditMode(false);
      setFormValue({...initialState});
    }
  },[id,blogData.data]);

  if(id && !blogData)
  {
    return "Loading....";
  }

  // const getSingleBlog = (id) => {
  //   //const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
  //   // console.log("get single blog",blogById);
  //   // if(blogById.status === 200)
  //   // {
  //   //   setFormValue({...blogById.data});
  //   // }else{
  //   //   toast.error("Something went wrong");
  //   // }
  //   // if(singleBlog.status === 200){
  //   // setFormValue({...singleBlog.data});
  //   // }else{
  //   //   toast.error("Something went wrong");
  //   // }
  // }

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!category || category === "Please select a category"){
      setCategoryErrorMsg("Please select a valid category");
    }

    if(title && description && imageUrl && category){
      const currentDate = getDate();
      if(!editMode)
      {
        const updatedBlogData = {...formValue, date: currentDate, liked: false};
        console.log(updatedBlogData);
        dispatch(PostBlogAction(updatedBlogData));

        if(isResponse){
          console.log("sbdjfbhbrfjgdfvbfghdfregegfryeuyrrrrrrrrrrr");
          toast.success("Blog created successfully");
        }
        
        //await addBlog(updatedBlogData);
        //const response = await axios.post("http://localhost:5000/blogs",updatedBlogData);
        
      }else{
        //const response = await axios.put(`http://localhost:5000/blogs/${id}`,formValue);
       // await updateBlog({blog:formValue,id});
        dispatch(UpdateBlogAction(formValue,id));
        if(isUpdateResponse)
        {
          toast.success("Blog Updated Successfully");
        }
        // console.log(updateResp);
        //  if(!updateResp.isError){
        //    toast.success("Blog updated successfully");
        // }else{
        //    toast.error("Something went wrong");
        // }
      }
      setFormValue({title: "",description:"",category: "",imageUrl: ""});
      navigate("/");
    }
  };

  if(isResponse || isUpdateResponse){
    console.log("sbdjfbhbrfjgdfvbfghdfregegfryeuyrrrrrrrrrrr");
    toast.success("Blog created successfully");
  }

  const onCategoryChange = (e) => {
    if(e.target.value === "Please select a category")
    {
      setCategoryErrorMsg("Please select a valid category"); 
    }else{
      setCategoryErrorMsg(null);
    }
    console.log(categoryErrorMsg);
    setFormValue({...formValue, category:e.target.value});
  };

  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue,[name]:value});
  };

  const onUploadImage = (file) => {
    console.log("file",file);
    const formData = new FormData(); //Generates key value pair representing a form fill, we create a key value pair that can interact with our cloudnary api bcz hosting images
    //we can easily make a http request with form Data to api request
    formData.append("file",file);
    formData.append("upload_preset","gnwnli7a");
    axios.post("http://api.cloudinary.com/v1_1/dqp2hcuur/image/upload",formData).then((resp) => {
      console.log("response ", resp);
      toast.info("Image uploaded successfully");
      setFormValue({...formValue,imageUrl:resp.data.url});
    }).catch((err) => {
      toast.error("Something went wrong, try again");
    })
  };

  if(isResponse){
    toast.success("Blog created successfully");
  }
  if(updateResp){
    alert("dvgdsghvjdbs");
    toast.success("Blog created successfully");
  }


  return (
    <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit = {handleSubmit}>
      <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>
      <div 
        style = {{
          margin:"auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value = {title || ""} 
          name = "title"
          type = "text"
          onChange = { onInputChange }
          required
          label = "Title"
        >
          <div className="invalid-feedback">
            Please provide a title for your blog.
          </div>
        </MDBInput>
        <br/>
        
        <MDBTextArea
          value = {description || ""} 
          name = "description"
          type="textarea"
          onChange = { onInputChange }
          required
          label = "Description"
          rows = {5}
        >
          <div className="invalid-feedback">
          Please provide a description for your blog
          </div>
        </MDBTextArea>
        <br/>
        {!editMode && (
          <>
          <MDBInput
          name="image"
          type = "file"
          accept="image/*"
          onChange = {(e) => onUploadImage(e.target.files[0]) }
          required
          >
            <div className="invalid-feedback">
            Please provide a image for your blog
            </div>
          </MDBInput>
          <br/>
          </>
        )}
        
        <select className='categoryDropdown' onChange={onCategoryChange} value={category} placeholder="Please Select Category">
          <option>Please select a category</option>
          {options.map((option,index) => (
            <option value = {option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrorMsg && (
          <div className='categoryErrorMsg'>
            {categoryErrorMsg}
          </div>
        )}
        <br/>
        <br/>
        <MDBBtn type="submit" style={{marginRight:"10px"}}>{editMode ? "Update" : "Add"}</MDBBtn>
        <MDBBtn color="danger" style={{marginRight:"10px"}} onClick={() => navigate("/")}>GoBack</MDBBtn>
      </div>
    </MDBValidation>
  )
}

export default AddEditBlog;