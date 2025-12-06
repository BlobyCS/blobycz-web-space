const ChristmasDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating ornaments - left side */}
      <div className="absolute top-20 left-[5%] opacity-20 animate-float" style={{ animationDuration: '6s' }}>
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
          <rect x="18" y="0" width="4" height="8" rx="2" fill="hsl(43, 96%, 56%)" />
          <circle cx="20" cy="30" r="18" fill="hsl(0, 72%, 45%)" />
          <ellipse cx="20" cy="30" rx="12" ry="14" fill="hsl(0, 72%, 55%)" opacity="0.3" />
          <path d="M14 22C16 18 24 18 26 22" stroke="hsl(43, 96%, 70%)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating ornament - right side */}
      <div className="absolute top-32 right-[8%] opacity-15 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <svg width="35" height="45" viewBox="0 0 40 50" fill="none">
          <rect x="18" y="0" width="4" height="8" rx="2" fill="hsl(43, 96%, 56%)" />
          <circle cx="20" cy="30" r="18" fill="hsl(43, 96%, 50%)" />
          <ellipse cx="20" cy="30" rx="10" ry="12" fill="hsl(43, 96%, 65%)" opacity="0.3" />
        </svg>
      </div>

      {/* Snowflake decorations */}
      <div className="absolute top-[15%] left-[15%] opacity-10 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="white" strokeWidth="1" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
      </div>

      <div className="absolute top-[25%] right-[12%] opacity-8 animate-float" style={{ animationDuration: '12s', animationDelay: '3s' }}>
        <svg width="25" height="25" viewBox="0 0 24 24" fill="white">
          <path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="white" strokeWidth="0.8" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Small stars/sparkles */}
      <div className="absolute top-[10%] left-[30%] opacity-20">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-twinkle">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="hsl(43, 96%, 70%)" />
        </svg>
      </div>

      <div className="absolute top-[20%] right-[25%] opacity-15" style={{ animationDelay: '1.5s' }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="animate-twinkle">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="hsl(43, 96%, 70%)" />
        </svg>
      </div>

      <div className="absolute top-[35%] left-[8%] opacity-10" style={{ animationDelay: '2.5s' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="animate-twinkle">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="white" />
        </svg>
      </div>

      {/* Gentle glow effects */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[200px] bg-gradient-radial from-accent/5 via-transparent to-transparent rounded-full blur-2xl"></div>
      <div className="absolute top-[30%] right-[15%] w-[250px] h-[200px] bg-gradient-radial from-primary/3 via-transparent to-transparent rounded-full blur-2xl"></div>
    </div>
  );
};

export default ChristmasDecorations;
