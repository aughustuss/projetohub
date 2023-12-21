// Trailer.tsx
import React from 'react';

const Trailer: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="mt-[100px]">
          <iframe
            width="800"
            height="500"
            src="https://www.youtube.com/embed/NLOp_6uPccQ"
            title="The Batman - DC FanDome Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
