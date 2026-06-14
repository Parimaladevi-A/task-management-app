import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();



  const login = async()=>{

    try{

      const res = await api.post("/auth/login",{
        email,
        password
      });


      localStorage.setItem(
        "token",
        res.data.token
      );


      toast.success("Login successful 🚀");

      navigate("/dashboard");


    }catch(err){

      console.log(err);

      toast.error(
        err.response?.data?.message || "Login failed"
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
    from-purple-600
    via-pink-500
    to-orange-400
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
          🚀 Login
        </h1>



        <input

        type="email"

        placeholder="Email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

        className="
        w-full
        p-3
        mb-4
        border
        rounded-xl
        outline-none
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
        outline-none
        text-black
        "

        />




        <button

        onClick={login}

        className="
        w-full
        bg-gradient-to-r
        from-purple-600
        to-pink-600
        text-white
        py-3
        rounded-xl
        font-bold
        hover:scale-105
        transition
        "

        >

          Login

        </button>




        <p className="text-center mt-5 text-gray-600">

          Don't have an account?

          <Link
          to="/register"
          className="
          text-purple-600
          font-bold
          ml-2
          "
          >
            Register
          </Link>

        </p>



      </div>


    </div>

  );

}


export default Login;