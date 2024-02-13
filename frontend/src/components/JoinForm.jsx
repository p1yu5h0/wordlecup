import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinForm = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: "#E3E3E3"
      }}
    >
      <div
        style={{
          boxShadow: '0px 0px 17px 1px #1D1F26',
          background: '#F7F7FA',
          padding: '24px',
          width: '250px'
        }}
      >
        <h1>Join ChatApp</h1>
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              marginBottom: '8px',
              color: '#777'
            }}
          >
            Display name
          </label>
          <input
            type="text"
            name="username"
            placeholder="Display name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              border: '1px solid #eeeeee',
              padding: '12px',
              outline: 'none',
              marginBottom: '16px'
            }}
          />
          <label
            style={{
              display: 'block',
              fontSize: '14px',
              marginBottom: '8px',
              color: '#777'
            }}
          >
            Room
          </label>
          <input
            type="text"
            name="room"
            placeholder="Room"
            required
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{
              border: '1px solid #eeeeee',
              padding: '12px',
              outline: 'none',
              marginBottom: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              cursor: 'pointer',
              padding: '12px',
              background: '#7C5CBF',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              transition: 'background .3s ease'
            }}
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
