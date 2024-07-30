import { useState } from 'react';

const EditTask = ({ task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onSave({ ...task, title, description, lastUpdated: new Date().toISOString() });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditTask;
