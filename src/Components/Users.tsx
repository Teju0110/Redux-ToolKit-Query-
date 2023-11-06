import React from 'react'
import { useDeleteUserMutation, useGetUsersQuery } from '../Store/Slices/UserDetails';
import { useNavigate, useParams } from 'react-router-dom';

const Users = () => {
    const { data, error, isLoading, isError, isSuccess } = useGetUsersQuery();

    console.log("data",data)

    const [deleteUser] = useDeleteUserMutation()

    const navigate = useNavigate()

  
  return (
    <div className='container mx-auto'>
        <h2>View Users</h2>
        <div className='row'>
            {isLoading && <span>Loading...</span>}
            {isError && <span>Something went wrong</span>}
            {isSuccess && data?.map((user)=>(
               <div className='col-4' key={user?.id}>
                 <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  <button className="card-link" onClick={()=>deleteUser(user?.id)}>Delete</button>
                  <button  className="card-link" onClick={()=>navigate(`/editUser/${user.id}`)}>Edit</button>
                </div>
              </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Users