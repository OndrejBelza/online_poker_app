import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="twin-container">
          <div className="home-box" id="join-table">
            <div className="home-box-container">
              <h1 className="home-box-header">Join Table</h1>
              <div className="stakes-header">Stakes</div>
              <div className="stake-box">
                <div className="stake-inside-flex">
                  <div>1k</div>
                  <div className="chip-wrapper"></div>
                </div>
                <div className="stake-inside-flex">
                  <div>10k</div>
                  <div className="chip-wrapper"></div>
                </div>
                <div className="stake-inside-flex">
                  <div>100k</div>
                  <div className="chip-wrapper"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-box" id="item-shop">
            <div className="home-box-container">
              <h1 className="home-box-header">Item Shop</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
