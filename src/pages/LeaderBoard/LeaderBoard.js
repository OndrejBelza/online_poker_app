import React from "react";
import ordinal from "ordinal";
import "./LeaderBoard.scss";

const USERS = [
  {
    name: "Gerardo",
    chipsEarned: "100k",
    tablesWon: "320",
  },
  {
    name: "Ondrej",
    chipsEarned: "100k",
    tablesWon: "320",
  },
  {
    name: "Taichi",
    chipsEarned: "100k",
    tablesWon: "320",
  },
  {
    name: "Gerardo",
    chipsEarned: "100k",
    tablesWon: "320",
  },
];

const LeaderBoard = () => {
  return (
    <div className="lb-wrapper">
      <div className="lb-header-wrapper">
        <h1 className="lb-header">Leaderboard</h1>
        <div className="leaderboard-icon"></div>
      </div>
      <div className="lb-table">
        <div className="lb-table-header">
          <div className="lb-table-header-list">
            <div className="lb-table-header-item">Rank</div>
            <div className="lb-table-header-item">Username</div>
            <div className="lb-table-header-item">Chips earned</div>
            <div className="lb-table-header-item">Tables won</div>
          </div>
        </div>
        {USERS.map((user, index) => (
          <div className="lb-user-list-wrapper" key={`${user.name}-${index}`}>
            <div className="lb-user-list">
              <div className="lb-user-item">{ordinal(index + 1)}</div>
              <div className="lb-user-item">{user.name}</div>
              <div className="lb-user-item">{user.chipsEarned}</div>
              <div className="lb-user-item">{user.tablesWon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
