import { useEffect, useState } from 'react';
import API from '../api/api';

interface RequestItem {
  id: number;
  user: { username: string };
  software: { name: string };
  accessType: string;
  reason: string;
  status: string;
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<RequestItem[]>([]);

  const fetchRequests = () => {
    API.get('/requests/pending').then((res) => setRequests(res.data));
  };

  const handleDecision = (id: number, status: 'Approved' | 'Rejected') => {
    API.patch(`/requests/${id}`, { status }).then(() => {
      fetchRequests();
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Pending Requests (Manager)</h2>
      {requests.length === 0 && <p>No pending requests</p>}
      {requests.map((r) => (
        <div key={r.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <p><strong>User:</strong> {r.user.username}</p>
          <p><strong>Software:</strong> {r.software.name}</p>
          <p><strong>Access:</strong> {r.accessType}</p>
          <p><strong>Reason:</strong> {r.reason}</p>
          <button onClick={() => handleDecision(r.id, 'Approved')}>Approve</button>
          <button onClick={() => handleDecision(r.id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}
