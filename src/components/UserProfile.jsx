import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({ posts: [] });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${id}`)
      .then(res => setUser(res.data.user))
      .catch(err => console.error(err));
  }, [id]);

  return (
        <div className='container d-flex justify-content-center w-100'>
            
                <div className="text-start">

                <h3>{user.name}</h3>

                {user.posts.map((post) => (
                    <div key={post.id} className="border rounded p-2 my-2">
                    {post.post}
                    </div>
                ))}
                </div>
            
        </div>
  );
}
