const WinterBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* SVG Winter Landscape */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-auto"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background mountains - far */}
        <path 
          d="M0 400V280C100 260 200 220 350 240C500 260 600 200 750 180C900 160 1000 200 1150 220C1300 240 1400 200 1440 180V400H0Z" 
          fill="hsl(220, 50%, 15%)"
          opacity="0.4"
        />
        
        {/* Mountains - mid */}
        <path 
          d="M0 400V300C80 280 160 250 300 270C440 290 520 240 700 220C880 200 1000 260 1200 280C1350 295 1400 260 1440 240V400H0Z" 
          fill="hsl(220, 45%, 12%)"
          opacity="0.6"
        />
        
        {/* Snow hills - front */}
        <path 
          d="M0 400V340C120 320 240 350 400 340C560 330 680 360 850 350C1020 340 1140 370 1300 360C1380 355 1420 340 1440 330V400H0Z" 
          fill="hsl(220, 40%, 18%)"
          opacity="0.8"
        />
        
        {/* Ground snow */}
        <path 
          d="M0 400V370C200 360 400 380 600 375C800 370 1000 385 1200 380C1350 376 1400 365 1440 360V400H0Z" 
          fill="hsl(210, 30%, 95%)"
          opacity="0.15"
        />

        {/* Trees - stylized pine trees */}
        <g opacity="0.3">
          {/* Tree 1 */}
          <path d="M100 350L120 280L140 350H100Z" fill="hsl(150, 30%, 20%)" />
          <path d="M105 320L120 260L135 320H105Z" fill="hsl(150, 30%, 25%)" />
          <rect x="117" y="350" width="6" height="15" fill="hsl(20, 30%, 20%)" />
          
          {/* Tree 2 */}
          <path d="M250 360L280 270L310 360H250Z" fill="hsl(150, 30%, 18%)" />
          <path d="M258 315L280 240L302 315H258Z" fill="hsl(150, 30%, 22%)" />
          <rect x="276" y="360" width="8" height="18" fill="hsl(20, 30%, 18%)" />
          
          {/* Tree 3 */}
          <path d="M450 355L470 290L490 355H450Z" fill="hsl(150, 30%, 20%)" />
          <path d="M455 325L470 270L485 325H455Z" fill="hsl(150, 30%, 25%)" />
          <rect x="467" y="355" width="6" height="12" fill="hsl(20, 30%, 20%)" />
          
          {/* Tree 4 */}
          <path d="M700 365L735 260L770 365H700Z" fill="hsl(150, 30%, 16%)" />
          <path d="M712 310L735 220L758 310H712Z" fill="hsl(150, 30%, 20%)" />
          <rect x="730" y="365" width="10" height="20" fill="hsl(20, 30%, 16%)" />
          
          {/* Tree 5 */}
          <path d="M950 358L975 285L1000 358H950Z" fill="hsl(150, 30%, 19%)" />
          <path d="M957 320L975 260L993 320H957Z" fill="hsl(150, 30%, 24%)" />
          <rect x="972" y="358" width="6" height="14" fill="hsl(20, 30%, 19%)" />
          
          {/* Tree 6 */}
          <path d="M1150 352L1180 275L1210 352H1150Z" fill="hsl(150, 30%, 17%)" />
          <path d="M1160 310L1180 250L1200 310H1160Z" fill="hsl(150, 30%, 22%)" />
          <rect x="1176" y="352" width="8" height="16" fill="hsl(20, 30%, 17%)" />
          
          {/* Tree 7 */}
          <path d="M1320 360L1345 290L1370 360H1320Z" fill="hsl(150, 30%, 20%)" />
          <path d="M1328 325L1345 270L1362 325H1328Z" fill="hsl(150, 30%, 25%)" />
          <rect x="1342" y="360" width="6" height="15" fill="hsl(20, 30%, 20%)" />
        </g>

        {/* Snow on trees - white caps */}
        <g opacity="0.5">
          <path d="M115 280L120 275L125 280H115Z" fill="white" />
          <path d="M273 270L280 263L287 270H273Z" fill="white" />
          <path d="M465 290L470 285L475 290H465Z" fill="white" />
          <path d="M728 260L735 252L742 260H728Z" fill="white" />
          <path d="M970 285L975 278L980 285H970Z" fill="white" />
          <path d="M1173 275L1180 268L1187 275H1173Z" fill="white" />
          <path d="M1340 290L1345 283L1350 290H1340Z" fill="white" />
        </g>

        {/* Stars */}
        <g opacity="0.4">
          <circle cx="150" cy="80" r="1.5" fill="white" className="animate-twinkle" />
          <circle cx="300" cy="120" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '0.5s' }} />
          <circle cx="500" cy="60" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: '1s' }} />
          <circle cx="700" cy="100" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '1.5s' }} />
          <circle cx="850" cy="50" r="2" fill="white" className="animate-twinkle" style={{ animationDelay: '2s' }} />
          <circle cx="1000" cy="90" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '0.3s' }} />
          <circle cx="1200" cy="70" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: '0.8s' }} />
          <circle cx="1350" cy="110" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '1.3s' }} />
        </g>
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
    </div>
  );
};

export default WinterBackground;
