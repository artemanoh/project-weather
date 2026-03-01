import "../../css/ModalSettings.css";

export const ModalSettings = ({ onClose, theme, setTheme }) => {
  const themes = [
    { id: "light", label: "Light", hint: "Warm day palette" },
    { id: "dark", label: "Dark", hint: "Night sky palette" },
    { id: "nature", label: "Nature", hint: "Forest palette" },
    { id: "aurora", label: "Aurora", hint: "Nordic glow palette" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-settings">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Settings</h2>

        <div className="theme-selector">
          <p>Select Theme:</p>
          <div className="theme-grid">
            {themes.map((item) => (
              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`theme-card ${theme === item.id ? "active" : ""}`}
              >
                <span className={`theme-dot ${item.id}`}></span>
                <span className="theme-content">
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
