import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();               
    navigate("/login");     
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-3">
      <Link to="/" className="navbar-brand">Event App</Link>

      <div className="ms-auto d-flex gap-3">
        {role === "User" && <Link to="/"></Link>}
        {role === "Organization" && <Link to="/dashboard"></Link>}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
export default Navbar;