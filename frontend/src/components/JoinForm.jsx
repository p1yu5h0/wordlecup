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
        backgroundColor: '#E3E3E3',
      }}
    >
      <div
        style={{
          boxShadow: '0px 0px 17px 1px #1D1F26',
          background: '#F7F7FA',
          padding: '24px',
          width: '350px',
          borderRadius: '5px',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#7C5CBF',
          }}
        >
          Join ChatApp
        </h1>
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label
            style={{
              display: 'block',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              color: '#777',
              fontWeight: 'bold',
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
              marginBottom: '1rem',
              borderRadius: '5px',
            }}
          />
          <label
            style={{
              display: 'block',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              color: '#777',
              fontWeight: 'bold',
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
              marginBottom: '1rem',
              borderRadius: '5px',
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
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'background .3s ease',
              borderRadius: '5px',
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
