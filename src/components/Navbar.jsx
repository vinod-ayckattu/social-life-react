import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem('sl-token');
  
  return (
    <nav className="p-3 bg-primary text-white d-flex gap-3">
      <Link to="/" className="text-white">Home</Link>
      <Link to="/about" className="text-white">About</Link>
      { token ? (
        <>
            <Link to="/logout" className="text-white">Logout</Link>
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