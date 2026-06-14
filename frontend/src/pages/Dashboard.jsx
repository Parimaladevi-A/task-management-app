import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dark, setDark] = useState(false);


  const token = localStorage.getItem("token");


  // LOAD TASKS
  const loadTasks = async () => {
    try {

      const res = await api.get("/tasks", {
        headers:{
          authorization:`Bearer ${token}`
        }
      });

      setTasks(res.data);

    } catch(err){
      console.log(err);
      toast.error("Failed to load tasks");
    }
  };


  useEffect(()=>{
    loadTasks();
  },[]);



  // ADD TASK
  const addTask = async()=>{

    if(!title || !description){
      toast.error("Fill all fields");
      return;
    }


    try{

      await api.post(
        "/tasks",
        {
          title,
          description
        },
        {
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );


      setTitle("");
      setDescription("");

      toast.success("Task Added");

      loadTasks();


    }catch(err){

      console.log(err);
      toast.error("Add failed");

    }

  };



  // DELETE
  const deleteTask = async(id)=>{

    try{

      await api.delete(`/tasks/${id}`,
      {
        headers:{
          authorization:`Bearer ${token}`
        }
      });


      toast.success("Deleted");

      loadTasks();


    }catch(err){

      toast.error("Delete failed");

    }

  };




  // UPDATE
  const updateTask = async(id)=>{

    try{

      await api.put(
        `/tasks/${id}`,
        {
          completed:true
        },
        {
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );


      toast.success("Completed");

      loadTasks();


    }catch(err){

      toast.error("Update failed");

    }

  };




  return (

    <div
    className={`
    min-h-screen p-6 transition-all duration-500

    ${
      dark
      ?
      "bg-gray-950 text-white"
      :
      "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
    }

    `}
    >


      {/* HEADER */}

     <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-8">


        <h1 className="text-4xl font-bold">
          🚀 Task Manager
        </h1>



        <button

        onClick={()=>setDark(!dark)}

        className="
        px-5
        py-2
        rounded-full
        bg-white
        text-black
        shadow-lg
        "

        >

        {
          dark
          ?
          "☀ Light Mode"
          :
          "🌙 Dark Mode"
        }

        </button>


      </div>





      {/* ADD BOX */}


      <div

      className={`
      max-w-xl
      mx-auto
      p-6
      rounded-2xl
      shadow-xl

      ${
        dark
        ?
        "bg-gray-800"
        :
        "bg-white"
      }

      `}

      >


        <input

        className="
        w-full
        p-3
        rounded-lg
        border
        mb-3
        text-black
        "

        placeholder="Task title"

        value={title}

        onChange={(e)=>setTitle(e.target.value)}

        />




        <input

        className="
        w-full
        p-3
        rounded-lg
        border
        mb-3
        text-black
        "

        placeholder="Description"

        value={description}

        onChange={(e)=>setDescription(e.target.value)}

        />





        <button

        onClick={addTask}

        className="
        w-full
        bg-purple-600
        text-white
        py-3
        rounded-lg
        hover:bg-purple-700
        "

        >

        ➕ Add Task

        </button>


      </div>





      {/* TASK LIST */}


      <div
      className="
      mt-10
      grid
      gap-5
      max-w-4xl
      mx-auto
      "
      >


      {
        tasks.map((t)=>(


        <div

        key={t._id}

        className={`
        p-5
        rounded-2xl
        shadow-xl
        flex
        justify-between
        items-center

        ${
          dark
          ?
          "bg-gray-800 text-white"
          :
          "bg-white text-black"
        }

        `}

        >



          <div>

          <h2 className="text-xl font-bold">
            {t.title}
          </h2>


          <p className="text-gray-500">
            {t.description}
          </p>


          </div>





          <div className="flex gap-2 w-full sm:w-auto">


          <button

          onClick={()=>updateTask(t._id)}

          className="
          bg-green-500
          text-white
          px-4
          py-2
          rounded-lg
          "

          >

          ✔ Done

          </button>





          <button

          onClick={()=>deleteTask(t._id)}

          className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded-lg
          "

          >

          🗑 Delete

          </button>



          </div>



        </div>


        ))

      }


      </div>



    </div>

  );

}


export default Dashboard;