import React from "react";

const LoadingOverlay = ({ children, loading }) => {
  return (
    <div className="relative">
      
      <div className={loading ? "blur-sm select-none" : ""}>
        {children}
      </div>

    
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-white/50 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
