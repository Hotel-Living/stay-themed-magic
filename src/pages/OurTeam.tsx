import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function OurTeam() {
  // New images (to be placed at the top), then previous images.
  const teamImages = [
    // Newly provided images, placed first
    {
      src: "/lovable-uploads/2fdb7478-8328-48aa-bb85-d1be8b1cb220.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/b5cc4615-9240-464d-a902-1ea6b5b808d4.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/67afbe54-a02e-44eb-b9dc-923a417337b8.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/f9f4d398-5a71-4cea-8295-905307327c2a.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/a75353dd-8ca3-42d4-860b-416162492bcc.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/27ca1d89-3684-44a4-a811-1a491be20854.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/46996385-d996-4c7a-817f-f4f463b462be.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/cf86508c-45fc-4b3e-8b7e-d1d499e35a19.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/7e2b7a11-8f81-4ce9-9547-611b8ff46897.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/5388e470-b276-49e7-9e5b-274b0bfdf16e.png",
      alt: "",
    },

    // Previous images (already on the page)
    {
      src: "/lovable-uploads/284baa20-4bf1-447d-80b0-355c3e9cc599.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/5d682bb6-816a-44ff-9cbd-0358a7e58ae8.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/cb83335f-9cd2-447c-915d-d7b3801ade69.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/7960ff42-e998-426e-aff3-b61fde09b911.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/bbd65434-07fe-4a4b-adc5-b8f3b07d4e1d.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/0c46127c-05ae-4160-b563-20539d9e8a81.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/b7517e27-3307-426e-848f-3362ebbc847e.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/9c973faa-9d48-47be-b82d-c91085b6e60e.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/2bb61a65-ca76-4d90-9c29-f1e823c390ce.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/19c91585-7a3a-45b4-9f08-35dd02efc091.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/2da5e23f-3d9b-49b1-bce1-57d5675c4e1b.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/67b3c544-8e11-45a7-b525-123adb52a331.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/d55a2feb-3221-48d9-8df8-7ff47bed6b01.png",
      alt: "",
    },
    {
      src: "/lovable-uploads/161e7cc3-af75-442b-abcd-67f353a5c427.png",
      alt: "",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 z-10 relative w-full">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-x-8 gap-y-12">
            {teamImages.map((img, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="border-[5px] border-gray-200 shadow-md object-contain"
                  // Set width to 35% (i.e., 50% smaller than 70%)
                  style={{
                    width: "35%",
                    height: "auto",
                    borderRadius: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
