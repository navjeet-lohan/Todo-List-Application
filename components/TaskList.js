import { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h3 onClick={handleExpand}>
        {task.title} {task.completed ? '✓' : ''}
      </h3>
      {isExpanded && (
        <div>
          <p>{task.description}</p>
          <p>Last Updated: {new Date(task.lastUpdated).toLocaleString()}</p>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
          <button onClick={() => onEdit(task)}>Edit</button>
        </div>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onToggleComplete, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
