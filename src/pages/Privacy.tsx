
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10 bg-[#4b0456] px-6 md:px-8">
          <h1 className="text-3xl font-bold mb-6">Privacy & Cookies</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
              <p>We are committed to protecting your privacy and ensuring the security of your data. This Privacy & Cookies Policy outlines how we collect, use, and safeguard your information.</p>
              <p>At Hotel-Living.com, we respect your privacy and are committed to protecting it through our compliance with this policy.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information such as name, email address, postal address, telephone number, and payment information when you register, make a booking, or contact us.</li>
                <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                <li>Information collected through cookies and other tracking technologies.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
              <p>We use information that we collect about you or that you provide to us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To present our website and its contents to you.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill any other purpose for which you provide it.</li>
                <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                <li>To notify you about changes to our website or any products or services we offer or provide.</li>
                <li>To improve our website and customer service.</li>
                <li>In any other way we may describe when you provide the information.</li>
                <li>For any other purpose with your consent.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar tracking technologies to track the activity on our website and hold certain information.</p>
              <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.</p>
              <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>
              <p>Types of cookies we use:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the operation of our website.</li>
                <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
                <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website.</li>
                <li><strong>Targeting Cookies:</strong> Record your visit to our website, the pages you have visited and the links you have followed.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
              <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.</p>
              <p>The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website, you are responsible for keeping this password confidential.</p>
              <p>Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal information.</li>
                <li>The right to rectify inaccurate personal information.</li>
                <li>The right to request the deletion of your personal information.</li>
                <li>The right to restrict the processing of your personal information.</li>
                <li>The right to data portability.</li>
                <li>The right to object to the processing of your personal information.</li>
              </ul>
              <p>To exercise any of these rights, please contact us using the information provided below.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Changes to Our Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
              <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: privacy@hotel-living.com</li>
                <li>By visiting the contact page on our website</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
