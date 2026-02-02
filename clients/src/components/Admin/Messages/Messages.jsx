import React, { useEffect, useState } from "react";
import api from "../../../api";
import toast from "react-hot-toast";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newStatus, setNewStatus] = useState({
    ...Messages,
  });
  const fetchMessages = async () => {
    try {
      const res = await api.get("/admin/messages");
      console.log("res message:", res);
      //check if there is no message
      if (res.data.messages.length === 0) {
        toast.error(res.data.message || "No message found");
        return;
      }
      setMessages(res.data.messages);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.log(err);
    }
  };
  const handleUpdateStatus = async (messageId) => {
    //if the value selected = rejected => fasle
    //if approve = true
    try {
      const res = await api.put(`/message/${messageId}`, { newStatus });
      toast.success("Status updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div>
      <h1>Messages</h1>
      <p>This is the Messages page for admin.</p>
      {messages.length === 0 && <p>No Messages</p>}
      {messages.map((msg, idx) => {
        return (
          <div
            key={msg._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Message {idx + 1}:</strong> {msg.message}
            </p>
            <p>
              <strong>User ID:</strong> {msg.userId}
            </p>
            <select
              defaultValue={"rejected"}
              onChange={() => handleUpdateStatus(msg._id)}
            >
              <option value="reject">Rejected</option>
              <option value="approve">Approved</option>
            </select>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
