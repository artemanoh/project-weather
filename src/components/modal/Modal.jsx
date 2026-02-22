import { useState } from "react";
import "../../css/Modal.css";
import { toast } from "react-toastify";

export const Modal = ({ onClose, openLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({ name: username });
    setUsername("");
    setEmail("");
    setPassword("");
    onClose()
     toast.success("Успішний вхід в аккаунт!");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Sign up</h2>
          <button className="modal-close" onClick={onClose}><svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
</svg></button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <ul className="modal-list">
            <li className="modal-list-item">
              <label className="modal-label">
                Username
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </li>
            <li className="modal-list-item">
              <label className="modal-label">
                E-Mail
                <input
                  className="modal-input"
                  type="email"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </li>
            <li className="modal-list-item">
              <label className="modal-label">
                Password
                <input
                  className="modal-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </li>
          </ul>
          <button
            className="modal-button"
            type="submit"
            disabled={!username || !email || !password}
          >
            Sign up
          </button>
        </form>
        <p className="modal-footer">
          Already have an account?{" "}
          <span className="modal-link" onClick={openLogin}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
