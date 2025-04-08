export function AffinityStaysSlogans() {
  return <>
      {/* Main header and quote section */}
      <div className="space-y-6 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AFFINITY STAYS</h1>
          <p className="text-xl text-white">Created by</p>
          
          {/* Hotel-Living logo with text */}
          <div className="bg-[#860493] inline-block p-4 rounded mt-4">
            <div className="flex items-center justify-center">
              <img alt="Hotel-Living Logo" src="/lovable-uploads/92795dbf-94a8-4af8-bfd8-e653eb7b43eb.png" className="h-16 object-scale-down" />
            </div>
          </div>
        </div>
        
        {/* Quote section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xl text-white italic">
            "When you surround yourself with like-minded people who share a passionate 
            commitment around a common purpose, anything is possible"
          </p>
          <p className="text-right text-white mt-2 mr-12">Howard Schultz</p>
        </div>
        
        {/* Slogans */}
        <div className="space-y-6 py-4">
          <p className="text-3xl text-center text-white font-bold">Not just a stay. A shared world</p>
          <p className="text-3xl text-center text-white font-bold">Meet. Share. Belong</p>
          <p className="text-3xl text-center text-white font-bold">Stay with those who get you</p>
          <p className="text-3xl text-center text-white font-bold">Tired of random? Choose your people</p>
          <p className="text-3xl text-center text-white font-bold">Stay, and connect through what you love</p>
        </div>
      </div>
    </>;
}