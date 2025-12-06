const AnimatedBackground = () => {
  return (
    <>
      {/* Christmas animated gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Deep blue winter glow - top */}
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[180px] opacity-30 animate-float" 
          style={{ 
            animationDuration: '10s',
            background: 'radial-gradient(circle, hsl(220, 60%, 30%) 0%, transparent 70%)'
          }} 
        />
        
        {/* Warm red Christmas glow - right */}
        <div 
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 animate-float" 
          style={{ 
            animationDuration: '12s', 
            animationDelay: '1s',
            background: 'radial-gradient(circle, hsl(0, 72%, 45%) 0%, transparent 70%)'
          }}
        />
        
        {/* Golden accent - bottom left */}
        <div 
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 animate-float" 
          style={{ 
            animationDuration: '14s', 
            animationDelay: '2s',
            background: 'radial-gradient(circle, hsl(43, 96%, 50%) 0%, transparent 70%)'
          }}
        />

        {/* Soft winter blue - center */}
        <div 
          className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[140px] opacity-20 animate-float" 
          style={{ 
            animationDuration: '16s', 
            animationDelay: '3s',
            background: 'radial-gradient(circle, hsl(210, 70%, 40%) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Winter gradient overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none"></div>
    </>
  );
};

export default AnimatedBackground;
