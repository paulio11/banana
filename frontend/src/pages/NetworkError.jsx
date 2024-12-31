import React from "react";

const NetworkError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <h2>Network Error</h2>
      <p>
        We're experiencing issues connecting to our backend server. Please try
        again later.
      </p>
      <button onClick={handleRefresh}>Try again</button>
    </>
  );
};

export default NetworkError;
