import React,{useEffect, useState} from "react";
import { UserDetails } from "../Interface/UserDetails";
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from "../Store/Slices/UserDetails";
import { useNavigate, useParams } from "react-router-dom";

const NewUser = () => {

  const[user,setUser]=useState<UserDetails>(Object)
  const [addUser]=useAddUserMutation();
  const [updateUser]=useUpdateUserMutation();
  // const {refetch}=useGetUserQuery();
  const {id}=useParams();
  const data=useGetUserQuery(id!);
  const navigate=useNavigate()
  const[editMode,setEditMode]=useState(false)

  useEffect(()=>{
    if(id && data){
      setEditMode(true);
      setUser({...data.data})
     
    }
    else{
      setEditMode(false)

    }
  },[id,data])


  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUser(
    {
      ...user,
      [e.target.name] : e.target.value
    }
    )
  }

  console.log(user)
  console.log(editMode)

  const handleSubmit =async (e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(editMode){
      
      await updateUser(user)
    }
    else{
      await addUser(user)      
    }
    // refetch()
    navigate('/')
    setEditMode(false)
   
  }

  return (
    <div className="container mx-auto mt-4" >
      <h2>{editMode ? "Edit User Details":"Create New User"}</h2>
    
    <form onSubmit={handleSubmit}>
      
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Name
        </label>
        <input        
          type="text"
          className="form-control"
          name="name"
          onChange={handleChange}
          defaultValue={user?.name || ""}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={handleChange}
          defaultValue={user?.email||""}
        />
      
      </div>
   
     
      <button type="submit" className="btn btn-primary">
       {editMode ? "Update":"Submit"}
      </button>
    </form>
    </div>
  );
};

export default NewUser;
