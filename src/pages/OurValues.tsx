import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
export default function OurValues() {
  return <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10 bg-[#4b0456]">
          <h1 className="text-3xl font-bold mb-6 text-center">Our Values and Standards</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[18px] text-center my-0">Respect</h2>
              <p className="text-center px-[28px]">We demand respect in the interactions between our employees, customers, and partners. We do not accept any form of harassment, discrimination, manipulation, physical violence, or any other abusive or threatening behavior.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[18px] text-center">Community</h2>
              <p className="text-center px-[37px]">When staying at an accommodation or using other Hotel-Living.com services, we ask that you consider the local community. Try to limit or minimize noise that might disturb the neighborhood, respect local laws and traditions, and be mindful of your impact on the environment.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[21px] text-center">Integrity</h2>
              <p className="text-center px-[31px]">At Hotel-Living.com, we expect our partners and customers to interact through our platform with honesty and professionalism, not to misrepresent themselves, and to respect the agreements they reach.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-center">Compliance with the Law</h2>
              <p className="text-center px-[26px]">Hotel-Living.com does not tolerate theft, vandalism, criminal activities, or extortion. Any type of illegal or dangerous activity may result in the blocking of the account or accommodation.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-center">Physical Safety</h2>
              <p className="text-center px-[33px]">At Hotel-Living.com, the physical safety of our customers, partners, and employees is our priority. Therefore, we ask you not to participate in or promote activities that may cause harm to others or be considered animal cruelty.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[23px] my-[8px] mx-[20px] py-[5px]">Personal Information</h2>
              <p className="text-center px-[41px]">Hotel-Living.com does not allow its partners or affiliates to use the personal data of third parties in ways that violate our agreement or applicable law.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[44px] text-center">Audio and Video Recordings</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="px-[11px]">When providing services to Hotel-Living.com or using its services, be mindful of others' personal space, privacy, and belongings. If you are staying at a hotel or someone's home, respect the accommodation and house rules.</li>
                <li className="px-[12px]">If an accommodation installs cameras, they must only be placed in common areas, positioned where they can be seen, and customers must be informed before their stay.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 px-[35px] text-center">Privacy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="px-[11px]">At Hotel-Living.com, we are committed to providing the best possible experience to those who use our travel services. This means we take privacy very seriously and are committed to protecting and safeguarding it in accordance with our Privacy Policy and Cookies and applicable law.</li>
                <li className="px-[13px]">The security of your data is important to us. That's why, at Hotel-Living.com, we protect your personal data and credit card information in accordance with applicable law, including GDPR and the Payment Card Industry Data Security Standards (PCI DSS).</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}