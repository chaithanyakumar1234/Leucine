import { useState } from 'react';
import API from '../api/api';

export default function CreateSoftware() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      await API.post('/software', { name, description, accessLevels });
      alert('Software created successfully');
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch (err) {
      alert('Failed to create software');
    }
  };

  const toggleAccessLevel = (level: string) => {
    setAccessLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div>
      <h2>Create Software (Admin)</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div>
        <label>
          <input type="checkbox" onChange={() => toggleAccessLevel('Read')} checked={accessLevels.includes('Read')} /> Read
        </label>
        <label>
          <input type="checkbox" onChange={() => toggleAccessLevel('Write')} checked={accessLevels.includes('Write')} /> Write
        </label>
        <label>
          <input type="checkbox" onChange={() => toggleAccessLevel('Admin')} checked={accessLevels.includes('Admin')} /> Admin
        </label>
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
