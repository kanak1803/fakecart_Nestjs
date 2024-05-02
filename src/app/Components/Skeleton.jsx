import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center h-screen">
      <div className="skeleton h-32 w-52"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default Skeleton;
