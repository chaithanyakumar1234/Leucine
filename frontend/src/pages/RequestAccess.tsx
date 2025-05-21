import { useEffect, useState } from 'react';
import API from '../api/api';

interface Software {
  id: number;
  name: string;
}

export default function RequestAccess() {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');

  useEffect(() => {
    API.get('/software').then((res) => setSoftwares(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      if (!selectedId) return alert('Please select software');
      await API.post('/requests', {
        softwareId: selectedId,
        accessType,
        reason,
      });
      alert('Request submitted');
      setReason('');
    } catch {
      alert('Failed to submit request');
    }
  };

  return (
    <div>
      <h2>Request Software Access (Employee)</h2>
      <select onChange={(e) => setSelectedId(Number(e.target.value))}>
        <option>Select software</option>
        {softwares.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <select onChange={(e) => setAccessType(e.target.value)}>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <textarea placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
}
