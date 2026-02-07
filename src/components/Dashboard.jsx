import "../css/Dashboard.css";

export const Dashboard = () => {
  return (
    <section className="dashboard">
      {/* <div className="container"> */}
      <div className="dashboard-container">
      <h2 className="dashboard-title">Weather dashboard</h2>
      
      <div className="dashboard-box">
        <h2 className="dashboard-text">
          Create your personal list of favorite cities and always be aware of
          the weather.
        </h2>
        <div className="dashboard-line"></div>
        <div className="dashboard-mobile-box">
          <h2 className="dashboard-text-mobile">
          Create your personal list of favorite cities and always be aware of
          the weather.
        </h2>
        <h2 className="dashboard-date">
          October 2023
          <br />
          Friday, 13th
        </h2>
        </div>
      </div>
      <div className="dashboard-boxes">
        <input type="text" className="dashboard-input" placeholder="Search location" />
        <button type="submit" className=" dashboard-input-button">
          <svg className="icon-search" width={32} height={32} viewBox="0 0 32 32">
            <use href="#icon-search" />
          </svg>
        </button>
      </div>
</div>
      {/* </div> */}
    </section>
  );
};
