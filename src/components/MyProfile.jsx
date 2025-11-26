import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyProfile() {
    const token = localStorage.getItem('sl-api-token');
    const [user, setUser] = useState({});
    const [post, setPost] = useState('');

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/my-profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUser(res.data.user))
        .catch(err => console.error(err));
    },[post]); // run only once

    const handlePost = async () => {
        const res = await axios.post("http://127.0.0.1:8000/api/posts/store",
            { post: post}, 
            {headers: {Authorization: `Bearer ${token}`}});
        if(res.data.status == 200)
            setPost('');
    };

    return (
        <div>
            <div className="p-2 text-success"><h3>{user.name}</h3></div>
            
            <div className="d-flex">
                <div className="w-50 mx-2">
                    <div className="card">
                        <div className="card-header">Write a Post Here</div>
                        <div className="card-body">
                            <textarea className="form-control" value={post} onChange={(e) =>setPost(e.target.value)}></textarea>
                            <div class="d-flex justify-content-end">
                                <button className="btn btn-primary btn-sm rounded-0 my-2" onClick={handlePost}>Publish</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-2">
                    <div className="card-header">Your Posts</div>
                    <div className="card-body bg-ash">
                        {user.posts?.map((post) => (
                            <div key={post.id} className="bg-light rounded border my-2 p-2">
                                <p>{post.post}</p>
                            </div>
                        ))}

                    </div>
                </div>
                    
                </div>
                <div className="card w-25">
                        <div className="card-header">Following</div>
                        <div className="card-body">

                            {user.influencers?.map((creator) => (
                                <div key={creator.id}>
                                <Link to={`/user/${creator.id}`}  className='text-decoration-none'>
                                    <h6>{creator.name}</h6>
                                </Link>
                                </div>
                            ))}

                        </div>
                    </div>
                
            </div>
        </div>
    );
}
