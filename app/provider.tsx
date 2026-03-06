"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";
import { UserDetailContext } from "@/context/UseDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {


  const [userDetails, setUserDetails] = React.useState(null);
  useEffect(() => {
    CreateNewUser();
}, []);

  const CreateNewUser = async () => {
  try{
    const result = await axios.post('/api/user');
    console.log(result.data)
    console.log("USER DETAILS:",result.data)
    setUserDetails(result.data);
  }catch(error){
    console.log("AXIOS ERROR:",error)
  }
}

  return (
    <>
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}><User size={20} />
      {children}
    </UserDetailContext.Provider>
    </>
  );
};

export default Provider;

