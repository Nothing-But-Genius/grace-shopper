import React from "react";
import { useHistory } from "react-router-dom";

const ContinueAsGuest = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("/products");
  };
  return (
    <div className="continue-as-guest">
      <button onClick={handleClick}>Continue as Guest</button>
    </div>
  );
};

export default ContinueAsGuest;
