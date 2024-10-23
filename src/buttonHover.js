import React from "react";

export const PrevButton = ({ onClick }) => {
  return (
    <button className="prev" onClick={onClick}>
      {/* &lt; */}
      &#10094;
    </button>
  );
};

export const NextButton = ({ onClick }) => {
  return (
    <button className="next" onClick={onClick}>
      {/* &gt; */}
      &#10095;
    </button>
  );
};
