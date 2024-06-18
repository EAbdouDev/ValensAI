"use client";
import React from "react";

const DisplayData = ({ data, level = 1 }) => {
  if (!data || typeof data !== "object") return null;

  return (
    <div style={{ marginLeft: level * 20 }}>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <h1>{key}</h1>
          {typeof data[key] === "object" ? (
            <DisplayData data={data[key]} level={level + 1} />
          ) : (
            <p>{data[key]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
