import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({ posts: [] });
  const { followInfluencer } = useContext(GlobalContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    //setMessage('');
    axios.get(`http://127.0.0.1:8000/api/user/${id}`)
      .then(res => setUser(res.data.user))
      .catch(err => console.error(err));
  }, [id]);

  return (
        <div className='container d-flex justify-content-center w-100'>
                <div className="text-start">
                  <p className="text-primary">{message}</p>
                <div className="d-flex justify-content-between mt-3">
                  <h3>{user.name}</h3>
                  <button onClick={() => { setMessage(followInfluencer(user.id));}} className="btn btn-sm btn-success rounded-0 fw-bold">Follow</button>
                </div>
                {user.posts.map((post) => (
                    <div key={post.id} className="border rounded p-2 my-2">
                    {post.post}
                    </div>
                ))}
                </div>
            
        </div>
  );
}
