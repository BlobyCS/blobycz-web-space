const SnowLayer = () => {
  return (
    <div className="fixed top-20 left-0 right-0 h-8 z-40 pointer-events-none overflow-hidden">
      {/* Snow accumulation effect under navbar */}
      <svg 
        className="w-full h-full"
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Wavy snow line */}
        <path 
          d="M0 8C60 4 120 12 180 8C240 4 300 10 360 6C420 2 480 8 540 5C600 2 660 9 720 7C780 5 840 11 900 8C960 5 1020 10 1080 6C1140 2 1200 8 1260 5C1320 2 1380 7 1440 4V32H0Z"
          fill="url(#snowGradient)"
        />
        
        {/* Additional subtle snow details */}
        <circle cx="100" cy="6" r="2" fill="white" opacity="0.2" />
        <circle cx="300" cy="8" r="1.5" fill="white" opacity="0.15" />
        <circle cx="500" cy="5" r="2" fill="white" opacity="0.2" />
        <circle cx="700" cy="7" r="1.5" fill="white" opacity="0.15" />
        <circle cx="900" cy="6" r="2" fill="white" opacity="0.2" />
        <circle cx="1100" cy="8" r="1.5" fill="white" opacity="0.15" />
        <circle cx="1300" cy="5" r="2" fill="white" opacity="0.2" />
      </svg>
    </div>
  );
};

export default SnowLayer;
