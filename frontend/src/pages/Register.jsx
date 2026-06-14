import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


function Register(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();



  const register = async()=>{

    if(!name || !email || !password){
      toast.error("Fill all fields");
      return;
    }


    try{

      await api.post("/auth/register",{
        name,
        email,
        password
      });


      toast.success("Registration successful 🎉");


      navigate("/");


    }catch(err){

      console.log(err);

      toast.error(
        err.response?.data?.message || "Register failed"
      );

    }

  };



  return (

    <div
    className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-blue-600
    via-purple-500
    to-pink-500
    p-5
    "
    >



      <div
      className="
      bg-white
      rounded-3xl
      shadow-2xl
      p-8
      w-full
      max-w-md
      "
      >



        <h1

        className="
        text-4xl
        font-bold
        text-center
        mb-6
        text-purple-700
        "

        >
          ✨ Create Account
        </h1>




        <input

        placeholder="Name"

        value={name}

        onChange={(e)=>setName(e.target.value)}

        className="
        w-full
        p-3
        mb-3
        border
        rounded-xl
        text-black
        "

        />




        <input

        type="email"

        placeholder="Email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

        className="
        w-full
        p-3
        mb-3
        border
        rounded-xl
        text-black
        "

        />




        <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

        className="
        w-full
        p-3
        mb-5
        border
        rounded-xl
        text-black
        "

        />





        <button

        onClick={register}

        className="
        w-full
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        text-white
        py-3
        rounded-xl
        font-bold
        hover:scale-105
        transition
        "

        >

          Register

        </button>





        <p
        className="
        text-center
        mt-5
        text-gray-600
        "
        >

        Already have account?


        <Link

        to="/"

        className="
        ml-2
        text-purple-600
        font-bold
        "

        >

        Login

        </Link>


        </p>



      </div>



    </div>

  );

}


export default Register;