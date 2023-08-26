import React, {useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { } from './hooks/useAllUsers';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";


const Conference = () => {
    const[inviters,setinviters] = useState([]);


    useAuth(); // Call useAuth hook
    const {
      register,
      handleSubmit,
      
  } = useForm();
    const navigate = useNavigate();
    const users = useSelector((state) => state?.auth?.otherusers);
  
    if (!users) {
      return <>Loading...</>;
    }
    
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Adding 1 because months are 0-indexed
    if (month < 10) {
      month = '0' + month; // Prefix with 0 if single digit month
    }
    const day = today.getDate();
    var minDate = `${year}-${month}-${day}`;
    const onSubmit = async (data) => {
      console.log(data);
  }
  
    return (
      <>
        {users ? (
          <>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="w-96 bg-white p-8 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Create 1on1 Meeting</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="mb-4">
                    <label htmlFor="meetingName" className="block font-medium mb-1">
                      Meeting Name
                    </label>
                    <input
                    {...register("name", { required: true,minLength:3})}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Enter meeting name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="inviteUser" className="block font-medium mb-1">
                      Invite Users
                    </label>
                    <select
                    {...register("inviteduser", { required: true })}
                      multiple
                      id="inviteduser"
                      name="inviteduser"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <option value="#" disabled>
                        Select a participant
                      </option>
                      {users.map((user) => (
                        <option key={user?.uid} value={user?.name}>
                          {user?.name}
                        </option>
                      ))}
                    </select>
                    <div>
                        {inviters?.length?(
                            <div>selected</div>
                        ):(
                            <div>No users Selected</div>
                        )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label for="meetingDate">Meeting Date:</label>
                    <input type="date" id="meetingDate" name="meetingDate" min={minDate} {...register("date", { required: true })}/>
  
  
                  </div>
  
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate('/dashboard')}
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  };
  
  export default Conference;
  
