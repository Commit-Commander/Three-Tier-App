// Importing React and necessary hooks from the 'react' library
import React, { useState, useEffect } from 'react';

// Importing axios for making HTTP requests to the backend
import axios from 'axios';

function App() {
  // State to hold the list of tasks fetched from the backend
  const [tasks, setTasks] = useState([]);
  
  // State to hold the value of the new task input field
  const [newTask, setNewTask] = useState('');

  // Use the environment variable for the base URL
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    // Make a GET request to fetch all tasks
    axios.get(`${apiUrl}/todos`)
      .then(response => {
        // Set the fetched tasks to the state
        setTasks(response.data);
      })
      .catch(error => {
        // Log any errors encountered while fetching tasks
        console.error("Error fetching tasks:", error);
      });
  }, [apiUrl]);

  // Function to add a new task
  const addTask = () => {
    // Check if the new task input is not empty
    if (newTask.trim()) {
      // Make a POST request to add a new task to the backend
      axios.post(`${apiUrl}/todos`, { task: newTask })
        .then(() => {
          // Add the new task to the state, so it's displayed on the page
          setTasks([...tasks, { task: newTask }]);
          // Clear the input field after adding the task
          setNewTask('');
        })
        .catch(error => {
          // Log any errors encountered while adding a task
          console.error("Error adding task:", error);
        });
      }
    };

  return (
    <div>
      {/* Heading of the app */}
      <h1>To-Do List - Jenkins CI-CD Pipeline 🚀</h1>
      
      {/* Input field for the new task */}
      <input
        type="text"
        value={newTask}
        // Update the state when the input field changes
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      
      {/* Button to add the new task */}
      <button onClick={addTask}>Add Task</button>
      
      {/* List of tasks */}
      <ul>
        {/* Map through the tasks and display each one */}
        {tasks.map((task, index) => (
          <li key={index}>
            {/* Display the task */}
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;