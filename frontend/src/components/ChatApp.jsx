import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Mustache from "mustache";
import moment from "moment";
import Qs from "qs";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const messageTemplate = `
    <div class="message">
      <p>
        <span class="message__name" style="font-weight: bold;">{{username}}</span>
        <span class="message__meta">{{createdAt}}</span>
      </p>
      <p>{{message}}</p>
    </div>
  `;

  const locationTemplate = `
    <div class="message">
      <p>
        <span class="message__name" style="font-weight: bold;">{{username}}</span>
        <span class="message__meta">{{createdAt}}</span>
      </p>
      <p><a href="{{url}}" target="_blank">My current location</a></p>
    </div>
  `;

  useEffect(() => {
    const { username, room } = Qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    setUsername(username);
    setRoom(room);

    // const newSocket = io("https://wordlecup-io-backend.onrender.com/"); // Replace with your server URL
    const newSocket = io("http://localhost:3001/"); // Replace with your server URL
    
    setSocket(newSocket);

    newSocket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
        navigate("/");
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        // Handle incoming messages
        const html = Mustache.render(messageTemplate, {
          username: message.username,
          message: message.text,
          createdAt: moment(message.createdAt).format("HH:mm"),
        });
        setMessages((prevMessages) => [...prevMessages, html]);
        autoscroll();
      });

      socket.on("locationMessage", (message) => {
        // Handle incoming location messages
        const html = Mustache.render(locationTemplate, {
          username: message.username,
          url: message.url,
          createdAt: moment(message.createdAt).format("HH:mm"),
        });
        setMessages((prevMessages) => [...prevMessages, html]);
        autoscroll();
      });

      socket.on("roomData", ({ room, users }) => {
        // Handle room data
        setUsers(users);
      });
    }
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("sendMessage", message, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message delivered!");
      }
    });
  };

  const sendLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        "sendLocation",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        () => {
          console.log("Location shared!");
        }
      );
    });
  };

  const autoscroll = () => {
    // Autoscroll logic
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    sendMessage(message);
    e.target.elements.message.value = "";
    e.target.elements.message.focus();
  };

  const handleLocationClick = () => {
    sendLocation();
  };

  return (
    <div
      className="chat"
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
  id="sidebar"
  className="chat__sidebar"
  style={{
    backgroundColor: "#f2f2f2",
    padding: "20px",
    minWidth: "200px",
    borderRight: "1px solid #ccc",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  }}
>
  <h2 className="room-title" style={{ marginBottom: "10px", color: "#333" }}>
    Room Name: {room}
  </h2>
  <h3 className="list-title" style={{ marginBottom: "10px", color: "#333" }}>
    Users
  </h3>
  <ul
    className="users"
    style={{
      listStyle: "none",
      padding: 0,
    }}
  >
    {users.map((user, index) => (
      <li
        key={index}
        style={{
          marginBottom: "5px",
          padding: "10px",
          backgroundColor: "#e6e6e6",
          borderRadius: "5px",
          color: "#333",
        }}
      >
        {user.username}
      </li>
    ))}
  </ul>
</div>

      <div
        className="chat__main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          id="messages"
          className="chat__messages"
          style={{
            flex: 1,
            paddingBottom: "20px",
            paddingLeft: "20px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#7C5CBF",
              color: "#fff",
              marginBottom: "1rem",
              borderRadius: '5px',
            }}
          >
            WordleCup.io ChatApp
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: message }}
              style={{
                marginBottom: "10px",
                padding: "10px",
                maxWidth: "70%",
                borderRadius: "10px",
                backgroundColor: "#f2f2f2",
              }}
            />
          ))}
        </div>
        <div
          className="compose"
          style={{
            padding: "20px",
            borderTop: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            style={{ flex: 1, display: "flex", marginRight: "10px" }}
          >
            <input
              name="message"
              required
              autoComplete="off"
              style={{
                padding: "10px",
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              style={{
                padding: "10px",
                marginLeft: "10px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
          <button
            onClick={handleLocationClick}
            style={{
              padding: "10px",
              backgroundColor: "#7C5CBF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send location
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
