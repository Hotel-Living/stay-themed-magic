
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function OurTeam() {
  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/2bb61a65-ca76-4d90-9c29-f1e823c390ce.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/0c46127c-05ae-4160-b563-20539d9e8a81.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/9c973faa-9d48-47be-b82d-c91085b6e60e.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/19c91585-7a3a-45b4-9f08-35dd02efc091.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/2da5e23f-3d9b-49b1-bce1-57d5675c4e1b.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/bbd65434-07fe-4a4b-adc5-b8f3b07d4e1d.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/67b3c544-8e11-45a7-b525-123adb52a331.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/b7517e27-3307-426e-848f-3362ebbc847e.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/d55a2feb-3221-48d9-8df8-7ff47bed6b01.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/lovable-uploads/161e7cc3-af75-442b-abcd-67f353a5c427.png"
                alt=""
                className="rounded-full border-[5px] border-gray-200 shadow-md w-48 h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
