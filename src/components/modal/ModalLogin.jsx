import { useState } from "react";
import "../../css/ModalLogin.css";
import { toast } from "react-toastify";

export const ModalLogin = ({ onClose, openSignUp, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
     setUser(username);
    setUsername("");
    setPassword("");
    onClose()
     toast.success("Успішний вхід в аккаунт!");
  };

  return (
    <div className="modal-login-backdrop" onClick={onClose}>
      <div className="modal-login-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-login-title">Log in</h2>
        <button className="modal-login-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
          </svg>
        </button>
        <form className="modal-login-form" onSubmit={handleSubmit}>
          <ul className="modal-login-list">
            <li className="modal-login-list-item">
              <label className="modal-login-label">
                Username
                <input
                  className="modal-login-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </li>
            <li className="modal-login-list-item">
              <label className="modal-login-label">
                Password
                <input
                  className="modal-login-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </li>
          </ul>
          <button
            className="modal-login-button"
            type="submit"
            disabled={!username || !password}
          >
            Log in
          </button>
        </form>
        <p className="modal-login-footer">
          Dont have account?{" "}
          <span className="modal-login-link" onClick={openSignUp}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};