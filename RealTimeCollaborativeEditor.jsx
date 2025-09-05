// RealTimeCollaborativeEditor.jsx

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to backend
const socket = io("http://localhost:5000");

export default function RealTimeCollaborativeEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("document", (data) => {
      setContent(data);
    });

    return () => {
      socket.off("document");
    };
  }, []);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit("update", newContent);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Collaborative Document Editor</h1>
      <textarea
        style={{ width: '100%', height: '400px', padding: '10px' }}
        value={content}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
