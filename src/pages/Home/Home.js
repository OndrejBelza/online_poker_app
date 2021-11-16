import './Home.scss';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="twin-container">
        <div className="join-table-box">
          <h1>Join Table</h1>
          <div>Stakes</div>
          <div className="stake-box">
            <div className="stake-inside-flex">
              <div>1k</div>
              <div className="chip-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
