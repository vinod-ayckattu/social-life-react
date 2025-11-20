import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext } from 'react';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import Navbar from "./components/Navbar";
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [posts, setPosts] = useState([]);
  const userContext = createContext();
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then((res) => setPosts(res.data.posts))
      .catch(err => console.error(err));
  }, []);


  return (
    <Router>

      {/* NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      {/* PAGE CONTENT CHANGES HERE */}
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <div className='container d-flex justify-content-center w-100'>
            <div className="text-start p-3">
              {posts.map((post) => (
                <div key={post.id} className="border rounded p-2 my-2">
                  <Link to={`/user/${post.user.id}`}  className='text-decoration-none'>
                    <h6>{post.user.name}</h6>
                  </Link>
                  <p>{post.post}</p>
                </div>
              ))}
            </div>
            </div>
          }
        />

        {/* User Profile */}
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
