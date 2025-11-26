import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import UserProfile from './components/UserProfile';
import Navbar from "./components/Navbar";
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import { GlobalContext } from './context/GlobalContext';


function App() {
  const { followInfluencer, unFollowInfluencer } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('sl-api-token');
  const [change, setChange] = useState(true);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts',  { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setPosts(res.data.posts))
      .catch(err => console.error(err));
  },[change]);


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
                  <div className='d-flex justify-content-between pt-2'>
                    <Link to={`/user/${post.user.id}`}  className='text-decoration-none'>
                      <h6>{post.user.name}</h6>
                    </Link>
                    {post.user.is_influencer.length > 0 ? (
                      <button onClick={() => {unFollowInfluencer(post.user.id); setChange(!change);}} className="btn btn-sm btn-danger rounded-0 fw-bold">Unfollow</button>
                    ) : (
                      <button onClick={() => {followInfluencer(post.user.id); setChange(!change);}} className="btn btn-sm btn-success rounded-0 fw-bold">Follow</button>
                    )}
                    
                  </div>
                  <hr></hr>
                  <p>{post.post}</p>
                </div>
              ))}
            </div>
            </div>
          }
        />

        {/* User Profile */}
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </Router>
  );
}

export default App;
