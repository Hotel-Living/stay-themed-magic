
export function AffinityStaysSlogans() {
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Updated logo with new green and yellow image - sized 150% larger than Hotel-Living logo */}
          <div className="flex justify-center mb-2">
            <img 
              src="/lovable-uploads/c0764ceb-5efd-4fa6-92f9-770560644e37.png" 
              alt="Affinity Stays Logo" 
              style={{ width: '375px', height: 'auto' }} // Setting width to 150% of Hotel-Living logo (250px * 150% = 375px)
            />
          </div>
          
          {/* Text "Created by" */}
          <p className="text-sm text-white mb-2">Created by</p>
          
          {/* Hotel-Living logo with text */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/2a32d624-2872-4a4c-9bd3-b46915ed74ba.png" 
              alt="Hotel-Living Logo" 
              className="h-10"
              style={{ width: '250px', maxWidth: '250px' }}
            />
          </div>
        </div>
        
        {/* Quote section - Modified to create two lines by breaking after "share" */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <p className="text-white italic text-sm">
            "When you surround yourself with like-minded people who share<br />
            a passionate commitment around a common purpose, anything is possible"
          </p>
          <p className="text-right text-white mt-2 mr-12 text-sm">Howard Schultz</p>
        </div>
        
        {/* Added more vertical spacing (mb-8) before slogans */}
        <div className="space-y-4 py-4 mb-8">
          {/* Slogans with yellow glow effect */}
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Not just a stay. A shared world</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Meet. Share. Belong</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Stay with those who get you</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Tired of random? Choose your people</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Stay, and connect through what you love</p>
        </div>
      </div>
    </>;
}
