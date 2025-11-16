const AnimatedBackground = () => {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main animated blur - top center */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[150px] opacity-40 animate-float" 
          style={{ animationDuration: '8s' }} 
        />
        
        {/* Secondary animated blur - right */}
        <div 
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px] opacity-30 animate-float" 
          style={{ animationDuration: '10s', animationDelay: '1s' }}
        />
        
        {/* Tertiary animated blur - bottom left */}
        <div 
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[160px] opacity-35 animate-float" 
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />

        {/* Additional moving orb */}
        <div 
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-25 animate-float" 
          style={{ animationDuration: '15s', animationDelay: '3s' }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none"></div>
    </>
  );
};

export default AnimatedBackground;
