import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('sl-api-token');
  
  const handleLogout = () => {
      axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
    }).finally(() => {
        localStorage.removeItem('sl-api-token');
        navigate('/login');
    });
  }
  return (
    <nav className="p-3 bg-primary text-white d-flex gap-3">
      <Link to="/" className="text-white">Home</Link>
      <Link to="/about" className="text-white">About</Link>
      { token ? (
        <>
            <a href="#" onClick={handleLogout} className="text-white">Logout</a>
        </>
        ) : (
        <>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
        </>
      )}
    </nav>
  );
}