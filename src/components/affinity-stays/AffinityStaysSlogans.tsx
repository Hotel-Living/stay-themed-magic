
export function AffinityStaysSlogans() {
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Affinity Stays logo */}
          <div className="flex justify-center mb-2">
            <img 
              src="/lovable-uploads/1ad400e0-4421-4568-9217-859786412ea0.png" 
              alt="Affinity Stays Logo" 
              style={{ width: '250px', height: 'auto' }}
            />
          </div>
          
          {/* Removed "Created by" text and Hotel-Living logo */}
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
          {/* Added animate-pulse-glow class for yellow glow effect to all slogans */}
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Not just a stay. A shared world</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Meet. Share. Belong</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Stay with those who get you</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Tired of random? Choose your people</p>
          <p className="text-xl text-center text-yellow-300 font-bold animate-pulse-glow">Stay, and connect through what you love</p>
        </div>
      </div>
    </>;
}
