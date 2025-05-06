
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="py-4 px-4 md:py-8 md:px-8 w-full overflow-hidden">
      <div className="container mx-auto">
        <div className="relative z-10">
          {/* Hero content */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
            <div className="w-full md:max-w-[50%] grid grid-cols-1 gap-4">
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundImage: "url('/lovable-uploads/2626de45-cd10-455a-b822-be73d17a335b.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#810E96] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-[#810E96] font-semibold text-lg md:text-xl">Get rid of household chores!</h2>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundImage: "url('/lovable-uploads/2626de45-cd10-455a-b822-be73d17a335b.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#810E96] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-[#810E96] font-semibold text-lg md:text-xl">Select hotels based on favourite themes!</h2>
                </div>
              </div>
            </div>

            <div className="w-full md:max-w-[50%] grid grid-cols-1 gap-4">
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundImage: "url('/lovable-uploads/2626de45-cd10-455a-b822-be73d17a335b.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#810E96] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-[#810E96] font-semibold text-lg md:text-xl">Boost your social life!</h2>
                </div>
              </div>
              
              <div 
                className="p-4 rounded-lg"
                style={{
                  backgroundImage: "url('/lovable-uploads/2626de45-cd10-455a-b822-be73d17a335b.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#810E96] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-[#810E96] font-semibold text-lg md:text-xl">Meet and enjoy like-minded people!</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
