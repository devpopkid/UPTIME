import React, { useEffect, useState } from 'react';
import API from '../api';
import MonitorCard from '../components/MonitorCard';

const Dashboard = () => {
  const [monitors, setMonitors] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [interval, setInterval] = useState(60);

  const fetchMonitors = async () => {
    const res = await API.get('/monitors');
    setMonitors(res.data.reverse());
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

  const addMonitor = async (e) => {
    e.preventDefault();
    await API.post('/monitors', { name, url, interval });
    setName(''); setUrl(''); setInterval(60);
    fetchMonitors();
  };

  const logout = () => {
    localStorage.removeItem('token');
    location.reload();
  };

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">📡 Popkid Uptime Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>

      <form onSubmit={addMonitor} className="bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-2">
        <input className="p-2 rounded bg-gray-700 text-white flex-1" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Service Name" required />
        <input className="p-2 rounded bg-gray-700 text-white flex-2" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" required />
        <input className="p-2 rounded bg-gray-700 text-white w-24" type="number" min="1" value={interval} onChange={(e) => setInterval(e.target.value)} />
        <button className="bg-green-600 px-4 py-2 rounded">Add</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {monitors.map((mon) => (
          <MonitorCard key={mon._id} mon={mon} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
