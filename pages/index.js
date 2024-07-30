import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import SearchTasks from '../components/SearchTasks';
import EditTask from '../components/EditTask';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'tasks.json');
  const jsonData = fs.readFileSync(filePath);
  const tasks = JSON.parse(jsonData);

  return {
    props: {
      tasks,
    },
  };
};

const Home = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const query = router.query.search || '';
    setSearchQuery(query);
  }, [router.query]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    router.push(`/?search=${query}`);
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: taskList.length + 1,
      completed: false,
      lastUpdated: new Date().toISOString(),
    };
    setTaskList([...taskList, newTask]);
  };

  const toggleComplete = (id) => {
    const updatedTasks = taskList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const saveTask = (updatedTask) => {
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTasks);
    setEditingTask(null);
  };

  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Todo List</h1>
      <SearchTasks onSearch={handleSearch} />
      <AddTask onAdd={addTask} />
      <TaskList tasks={filteredTasks} onToggleComplete={toggleComplete} onEdit={editTask} />
      {editingTask && <EditTask task={editingTask} onSave={saveTask} />}
    </div>
  );
};

export default Home;
