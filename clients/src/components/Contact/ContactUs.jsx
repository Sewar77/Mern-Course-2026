import React, { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
function ContactUs() {
  const user = localStorage.getItem("user");
  const userIfno = JSON.parse(user);
  const userId = userIfno._id;

  const [message, setMessage] = useState({
    userId: userId,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/message", message);
      if (res.status !== 201) {
        toast.error("failed to sewnd message");
      }
      toast.success("message sent successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Message:
          <textarea
            name="message"
            value={message.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
          ></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ContactUs;
