import React from "react";

const Loader = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        </div> */}
        {/* <div className="flex justify-center items-center h-screen">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
        </div> */}
        {/* <div className="flex justify-center items-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        </div> */}
        {/* <div className="flex justify-center items-center space-x-1">
          <div className="w-1 h-4 bg-blue-600 animate-pulse"></div>
          <div className="w-1 h-6 bg-blue-600 animate-pulse"></div>
          <div className="w-1 h-4 bg-blue-600 animate-pulse"></div>
        </div> */}
        {/* <div className="flex justify-center items-center h-screen">
          <div className="w-8 h-8 bg-blue-600 animate-spin transform rotate-45"></div>
        </div> */}
        {/* <div className="flex justify-center items-center">
          <span className="text-blue-600 animate-pulse">Loading...</span>
        </div> */}
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-16 h-16">
            <div className="absolute border-4 border-blue-600 rounded-full w-full h-full animate-ping"></div>
            <div className="absolute border-4 border-blue-600 rounded-full w-full h-full animate-ping delay-150"></div>
          </div>
          <div className="mt-4">
            <span className="text-blue-600 animate-pulse">Loading...</span>
          </div>
        </div>
      </div>
    );
};
export default Loader;
