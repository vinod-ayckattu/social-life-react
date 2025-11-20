import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:8000/api/users/store', formData)
        .then((res) => { 
            localStorage.setItem('sl-api-token', res.data.user.token);  
            
            navigate("/");
        })
        .catch(err => { 
            console.error(err); 
           
        });
    };
    return (
        <div className='container d-flex justify-content-center w-100'>
            <div className="text-start">
                <div className="card text-start my-2 ">
                    <div className="card-header">Register</div>
                    <div className="card-body d-flex flex-column">
                        <div className="form-group"><input type="text" className="form-control" placeholder="Your Name" name="name" onChange={(e) => setName(e.target.value)}/></div>
                        <div className="form-group my-2">
                            <input type="radio" name="gender" value="Male" onClick={(e) => setGender(e.target.value)}/> Male<br></br>
                            <input type="radio" name="gender" value="Female" onClick={(e) => setGender(e.target.value)}/> Female
                        </div>
                        <div className="form-group my-2"><input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></div>
                        <div className="form-group my-2"><input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></div>
                        <div className="form-group"><button className="btn btn-success" onClick={handleSubmit}>Register</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}