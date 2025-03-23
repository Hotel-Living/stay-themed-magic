
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Privacy & Cookies</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg">Last updated: 12/11/2024</p>
            
            <p>First things first: we care deeply about your privacy. When you use Hotel-Living.com services, you're trusting us, and we value that trust greatly. That's why we're committed to protecting and safeguarding all the personal data you provide to us. We look after our customers' interests and are transparent when it comes to processing your personal data.</p>
            
            <p>This Privacy Policy applies to any type of customer information we collect.</p>
            
            <h2 className="text-2xl font-semibold mt-8">Terms We Use in this Privacy Policy</h2>
            
            <p>The term "Trip" refers to the different types of products and services from the Travel Provider that can be ordered, acquired, purchased, paid for, rented, offered, reserved, combined, or consumed.</p>
            
            <p>"Travel Provider" refers to the accommodation provider.</p>
            
            <p>"Travel Service" refers to the online purchasing, requesting, booking, or payment services (including the service to facilitate payments) offered or provided by Hotel-Living.com with respect to various products and services that Travel Providers make available on the platform from time to time.</p>
            
            <p>"Travel Booking" refers to the request, purchase, payment, or reservation of a Trip.</p>
            
            <h2 className="text-2xl font-semibold mt-8">What Types of Personal Data Does Hotel-Living.com Collect?</h2>
            
            <p>We cannot help you book the perfect Trip without certain information. That's why we ask for specific data while you use our services. This typically includes basic information like your name, contact details, the names of people traveling with you, and payment information. You can also provide additional information related to your upcoming Trip (for example, expected arrival time).</p>
            
            <p>We also collect information from your computer, phone, tablet, or other device you use to access our services. For example, IP address, browser, and language settings. There are some situations where we also receive information about you from others or collect information automatically.</p>
            
            <h2 className="text-2xl font-semibold mt-8">Why Does Hotel-Living.com Collect and Use Your Personal Data?</h2>
            
            <p>The main reason we ask for your personal data is to help you manage your online Travel Bookings and ensure you receive the best service possible.</p>
            
            <p>We also use your personal data to contact you and inform you about the latest discounts and special offers, as well as other products or services we may consider of interest to you, among other things.</p>
            
            <h2 className="text-2xl font-semibold mt-8">How Does Hotel-Living.com Share Your Data with Third Parties?</h2>
            
            <p>There are several parties that integrate Hotel-Living.com services in various ways and for different reasons. The main reason we share your data is to provide the Travel Provider with the information necessary to complete your Travel Booking.</p>
            
            <h2 className="text-2xl font-semibold mt-8">How Are Your Personal Data Shared and Processed to Provide Insurance Services?</h2>
            
            <p>We work with various companies when offering insurance services. Follow the link below to understand how your data is used and shared for insurance purposes and to learn about the responsibilities of the parties involved.</p>
            
            <h2 className="text-2xl font-semibold mt-8">How Does Hotel-Living.com Process Communications That You and the Travel Provider Send Through Hotel-Living.com?</h2>
            
            <p>Hotel-Living.com can help both you and Travel Providers exchange information and requests about services and Travel Bookings made through the Hotel-Living.com platform.</p>
            
            <h2 className="text-2xl font-semibold mt-8">How Does Hotel-Living.com Use Social Networks?</h2>
            
            <p>The use of social networks is integrated into Hotel-Living.com services in several ways. This allows us to collect some of your personal data or for the social network provider to receive some of your data.</p>
            
            <h2 className="text-2xl font-semibold mt-8">How Does Hotel-Living.com Handle Children's Personal Data?</h2>
            
            <p>Unless otherwise indicated, Hotel-Living.com is a service that you can only use if you are over 16 years of age. We only process information about children with the consent of parents or legal guardians, or when parents or the corresponding legal guardian share that information with us.</p>
            
            <h2 className="text-2xl font-semibold mt-8">Security and Data Retention</h2>
            
            <p>We have procedures to prevent unauthorized access to, and misuse of, personal data.</p>
            
            <p>We use appropriate commercial systems and procedures to safeguard the personal data you provide to us. We also use security procedures and technical and physical restrictions to access and use the personal data on our servers. Only authorized personnel have permission to access personal data during the course of their work.</p>
            
            <p>We will keep your personal data for as long as necessary to allow you to use our services, to provide you with our services (including maintaining Hotel-Living.com user accounts you may have), to comply with applicable legislation, to resolve disputes with other parties, and for everything that is necessary for the performance of our activities, including the detection and prevention of fraud or other illegal activities.</p>
            
            <h2 className="text-2xl font-semibold mt-8">Your Rights and Choices</h2>
            
            <p>We rely on you to ensure that your personal data is correct, complete, and up to date. We ask that you communicate any changes or inaccuracies in such data to us as soon as possible.</p>
            
            <p>If you have a Hotel-Living.com user account, you can access a large part of your personal data through our website and our apps. The account settings usually offer the option to add, update, or delete the information we have about you.</p>
            
            <p>If any of the personal data we have about you is not accessible through our website or our apps, you can send us a request.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
