import { useEffect, useState } from "react";

export const LineProgress = () => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      setProgress(0); // Reset on mount
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90; // Ne va pas à 100%, laisse le fetch finir
          return prev + 1;
        });
      }, 1);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="w-full h-1 bg-gray-200 rounded-full">
        <div
          className="h-1 bg-[#a462a4] rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };