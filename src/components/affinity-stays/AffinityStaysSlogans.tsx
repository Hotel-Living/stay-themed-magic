
export function AffinityStaysSlogans() {
  return <>
      {/* Main header and quote section */}
      <div className="space-y-4 mb-8">
        <div className="text-center mb-6">
          {/* Replace text with logo - resized 60% smaller */}
          <div className="flex justify-center mb-2">
            <img 
              src="/lovable-uploads/bd7e26b6-3e78-4c2e-8af9-7e1fcea8b588.png" 
              alt="Affinity Stays Logo" 
              className="h-10 w-auto" // Changed from h-24 to h-10 (approximately 60% smaller)
            />
          </div>
          
          <p className="text-xl text-white mb-2">Created by</p>
          
          {/* Hotel-Living logo with text */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/2a32d624-2872-4a4c-9bd3-b46915ed74ba.png" 
              alt="Hotel-Living Logo" 
              className="h-10"
              style={{ width: 'auto', maxWidth: '250px' }}
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
        
        {/* Slogans - reduced size by 40% */}
        <div className="space-y-4 py-4">
          <p className="text-xl text-center text-white font-bold">Not just a stay. A shared world</p>
          <p className="text-xl text-center text-white font-bold">Meet. Share. Belong</p>
          <p className="text-xl text-center text-white font-bold">Stay with those who get you</p>
          <p className="text-xl text-center text-white font-bold">Tired of random? Choose your people</p>
          <p className="text-xl text-center text-white font-bold">Stay, and connect through what you love</p>
        </div>
      </div>
    </>;
}
