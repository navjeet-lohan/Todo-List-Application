import { useState } from 'react';
import styles from '../styles/Home.module.css';

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
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleSave} className={styles.button}>Save</button>
    </div>
  );
};

export default EditTask;
