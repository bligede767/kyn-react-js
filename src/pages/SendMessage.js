import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SendMessage() {
  let navigate = useNavigate();

  const [message, setMessage] = useState({
    text: "",
    message: "",
  });

  const { username, text } = message;

  const onInputChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:2323/slack/messages/${username}`, message);
    navigate("/message");
  };

  return (
    <div>
      <div className='heading'>
        <h1>Send Message</h1>
        <Link to={"/"} className='btn btn-dark'>❌ Cancel</Link>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="row g-3">
        <div className="col-md-12">
          <label for="username" class="form-label">Username</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="text" class="form-label">Message</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter message"
            name="text"
            value={text}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div class="col-12">
          <button type='submit' className='btn btn-primary' >Submit</button>
        </div>
      </form>
    </div>
  )
}
