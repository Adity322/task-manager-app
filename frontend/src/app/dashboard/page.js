"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import Navbar from "../../components/bar"
export default function Dashboard() {

const router = useRouter();

const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

useEffect(() => {
const token = localStorage.getItem("token");


if (!token) {
  router.push("/login");
  return;
}

fetchTasks();


}, []);

const fetchTasks = async () => {
try {
const res = await API.get("/tasks");
setTasks(res.data);
} catch (error) {
console.error(error);
}
};

const createTask = async (e) => {
e.preventDefault();


if (!title || !description) {
  alert("Please fill all fields");
  return;
}

try {
  await API.post("/tasks", {
    title,
    description,
    status: "pending"
  });

  setTitle("");
  setDescription("");
  fetchTasks();
} catch (error) {
  console.error(error);
}


};

const updateStatus = async (id, status) => {
try {
await API.put(`/tasks/${id}`, { status });
fetchTasks();
} catch (error) {
console.error(error);
}
};

const deleteTask = async (id) => {
try {
await API.delete(`/tasks/${id}`);
fetchTasks();
} catch (error) {
console.error(error);
}
};

const logout = () => {
localStorage.removeItem("token");
router.push("/login");
};

return (
<> <Navbar />

```
<div
  style={{
    minHeight: "100vh",
    width: "100%",
    background: "#0f0f0f",
    color: "white",
    padding: "40px"
  }}
>

  {/* Header */}

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px"
    }}
  >
    <h1 style={{ fontSize: "32px" }}>Dashboard</h1>

    <button
      onClick={logout}
      style={{
        padding: "10px 20px",
        background: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Logout
    </button>
  </div>

  {/* Task Form */}

  <form onSubmit={createTask} style={{ maxWidth: "600px" }}>

    <input
      placeholder="Task Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "1px solid #333",
        background: "#1a1a1a",
        color: "white"
      }}
    />

    <input
      placeholder="Task Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "1px solid #333",
        background: "#1a1a1a",
        color: "white"
      }}
    />

    <button
      type="submit"
      style={{
        padding: "12px 24px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Add Task
    </button>

  </form>

  {/* Task List */}

  <div style={{ marginTop: "40px", maxWidth: "800px" }}>

    <h2 style={{ marginBottom: "20px" }}>My Tasks</h2>

    {tasks.length === 0 && (
      <p style={{ color: "#aaa" }}>No tasks yet. Add your first task.</p>
    )}

    {tasks.map((task) => (
      <div
        key={task._id}
        style={{
          padding: "20px",
          marginBottom: "15px",
          background: "#1a1a1a",
          borderRadius: "8px",
          border: "1px solid #2a2a2a"
        }}
      >

        <h3>{task.title}</h3>

        <p style={{ color: "#bbb" }}>{task.description}</p>

        <p
          style={{
            fontWeight: "bold",
            color:
              task.status === "completed"
                ? "#4caf50"
                : "#ff9800"
          }}
        >
          Status: {task.status}
        </p>

        <div style={{ marginTop: "10px" }}>

          <button
            onClick={() => updateStatus(task._id, "pending")}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              background: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Pending
          </button>

          <button
            onClick={() => updateStatus(task._id, "completed")}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              background: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Completed
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{
              padding: "8px 14px",
              background: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>

        </div>

      </div>
    ))}

  </div>

</div>

</>
);
}