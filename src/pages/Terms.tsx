import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
export default function Terms() {
  return <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10 bg-[#4b0456]">
          <h1 className="font-bold mb-6 text-2xl text-center">Terms & Conditions</h1>
          
          <div className="prose prose-invert max-w-none text-sm">
            <h2 className="font-semibold mb-4 text-lg px-[21px] text-center">SERVICE CONDITIONS FOR HOTEL-LIVING.COM CUSTOMERS</h2>
            <p className="text-xs text-right text-gray-400 mb-6">Updated on 12/11/2024</p>
            
            <p className="mb-4 px-[17px]">
              By completing your Reservation, you are accepting these Conditions and any other provisions that have been provided to you during the booking process.
            </p>
            
            <p className="mb-4 px-[20px]">
              If any provision of these Conditions is (or becomes) invalid or unenforceable:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li className="px-[5px]">it will continue to have effect to the maximum extent permitted by law;</li>
              <li>you will remain bound by the rest of the provisions of the Conditions.</li>
            </ul>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-slate-50 text-center">ABOUT HOTEL-LIVING</h3>
              <p className="mb-4 px-[16px]">
                When you book accommodation, Hotel-Living.com is the provider and responsible for the Platform, but not for the Travel Experience itself (see section A4.4).
              </p>
              <p className="mb-4 px-[18px]">
                We work with companies that offer local attention services (e.g., Customer Service or account management). They do not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>control or manage our Platform;</li>
                <li>have their own platform;</li>
                <li className="px-0">formalize a legal or contractual relationship with you;</li>
                <li>offer Travel Experiences;</li>
                <li>represent us, or enter into contracts or accept legal documents on our behalf;</li>
                <li>operate as our "service or process agents".</li>
              </ul>
              <p className="mb-4 px-[20px]">
                We take reasonable precautions when offering our Platform, but we cannot guarantee that all content is accurate (we obtain information from Service Providers). To the extent permitted by law, we will not be responsible for any errors, interruptions, or if information is missing, although we will do our best to correct and resolve these situations as quickly as we can.
              </p>
              <p className="mb-4">
                Our Platform does not imply the recommendation or approval of any Service Provider or their products, services, facilities, vehicles, etc.
              </p>
              <p className="mb-4">
                We are not a party to the terms agreement that you and the Service Provider enter into, and the latter is solely responsible for the Travel Experience.
              </p>
              <p className="mb-4">
                You may need to create an Account to make a Reservation. Make sure all information (including payment and contact details) is correct and up to date, or you may not be able to access your Travel Experiences. You are solely responsible for everything that happens with your Account, so you should prevent anyone else from using it and keep your username and password secret.
              </p>
              <p className="mb-4">
                We will show you the offers available to you in the language (that we believe is) appropriate for you. However, you can change it at any time.
              </p>
              <p className="mb-4">
                Unless otherwise indicated, you must be at least 16 years old to use the Platform.
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#f6e7f8]">OUR VALUES</h3>
              <p className="mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>adhere to Our values;</li>
                <li>comply with all applicable laws;</li>
                <li>cooperate in any anti-fraud/anti-money laundering checks we need to carry out;</li>
                <li>not use the Platform to cause harm or make false Reservations;</li>
                <li>use the Travel Experience and/or our Platform for the intended purpose;</li>
                <li>not cause harm or damage and not behave inappropriately with the Service Provider's staff (or with anyone, really).</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#e2dce2]">PRICES</h3>
              <p className="mb-4">
                When you make a Reservation, you agree to pay the cost of the Travel Experience, including all applicable charges and taxes.
              </p>
              <p className="mb-4">
                Some of the prices you see may have been rounded to the nearest whole number. The price you pay will be based on the original price, not the rounded one (although the actual difference between the two will be minimal).
              </p>
              <p className="mb-4">
                Obvious errors and typos are not binding. For example, if you book a luxury car or a night in a luxury suite that was erroneously offered for €1, we can simply cancel the Reservation and refund any amount you have paid.
              </p>
              <p className="mb-4">
                A crossed-out price indicates the price of an equivalent Reservation without the applied price reduction ("equivalent" means same dates, same conditions, same quality of accommodation/car/travel class, etc.).
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#efe6ef]">PAYMENT</h3>
              <p className="mb-4">
                We are responsible for charging you a non-refundable deposit for your reservation. We (or, sometimes, our affiliate in the country of origin of the payment) will be responsible for managing the payment and ensuring that the transaction with the Service Provider is completed.
              </p>
              <p className="mb-4">
                If the currency selected on the Platform is not the same as that of the Service Provider, we may:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>display prices in the currency you choose;</li>
                <li>offer you the option to pay in your currency.</li>
              </ul>
              <p className="mb-4">
                You can see our Currency Exchange Rate during the payment process, in your Reservation information from your Account or, if you don't have an Account, in the email we have sent you. If we charge you any fee in relation to any of these services, you will find such fee expressed as a percentage over the European Central Bank rates. Your card issuer might charge you a foreign transaction fee.
              </p>
              <p className="mb-4">
                We will store your Payment Method data for future transactions once you have given us your consent to do so.
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#faeefb]">CONDITIONS</h3>
              <p className="mb-4">
                When you make a Reservation, you are accepting the applicable conditions shown during the booking process. You will find the Service Providers' cancellation conditions, as well as any other conditions (age requirements, damage/security deposits, additional supplements for group Reservations, extra beds, breakfast, pets, accepted cards, etc.), on our Platform: on the Service Provider's information page, during the booking process, in the "Please note" section and/or in the confirmation email or ticket (if applicable).
              </p>
              <p className="mb-4">
                If you cancel a Reservation or do not show up, cancellation or no-show charges, as well as any refund, will depend on the Service Provider's cancellation and no-show conditions.
              </p>
              <p className="mb-4">
                Some Reservations cannot be canceled for free, while others can only be canceled for free before a specific deadline.
              </p>
              <p className="mb-4">
                If you think you won't arrive on time, contact the Service Provider and tell them when you will be able to arrive, so they don't cancel the Reservation. If you arrive late, we will not be responsible for the consequences such as, for example, the cancellation of the Reservation or any charge that the Service Provider may charge you.
              </p>
              <p className="mb-4">
                As the person making the Reservation, you are responsible for the actions and behavior (in relation to the Travel Experience) of each person in your group. You are also responsible for obtaining their permission before providing us with their personal data.
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#f2e1f4]">PRIVACY AND COOKIES</h3>
              <p className="mb-4">
                If you book accommodation, a flight, or a tourist attraction, consult our Privacy and Cookies Policy for more information about privacy, cookies, and how we can contact you and process your personal data.
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#eae2eb]">ACCESSIBILITY REQUESTS</h3>
              <p className="mb-4">
                If you have any accessibility requests:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>about our Platform and/or our services, contact our Customer Service team;</li>
                <li>about your Travel Experience (wheelchair access, walk-in bathtubs, etc.), contact the Service Provider, airport, train station, etc.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#f6e5f8]">INTELLECTUAL PROPERTY RIGHTS</h3>
              <p className="mb-4">
                Unless otherwise indicated, all rights to our Platform (technology, content, trademarks, appearance, etc.) are owned by Hotel-Living.com (or its licensors) and, by using our Platform, you agree to do so only for the intended purpose and respecting the conditions established below in paragraphs A14.2 and A14.3.
              </p>
              <p className="mb-4">
                You may not monitor, copy, scrape/track, download, reproduce, or use anything on our Platform for any commercial purpose without the written permission of Hotel-Living.com or its licensors.
              </p>
              <p className="mb-4">
                We closely monitor each visit to our Platform and will block anyone (and any automated system) that we suspect:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>performs an unreasonable number of searches;</li>
                <li>uses any device or software to collect prices or other information;</li>
                <li>does anything that puts undue strain on our Platform.</li>
              </ul>
              <p className="mb-4">
                By uploading any image to our Platform (with a comment, for example), you are confirming that you comply with our criteria and that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>it is truthful (you haven't altered the image, for example, or uploaded an image of a different accommodation);</li>
                <li>it does not contain viruses;</li>
                <li>you can share it with us;</li>
                <li>we are allowed to use it on our platform and in relation to other commercial purposes (even in a promotional context), everywhere, forever (when you tell us we can no longer use it, we will consider any reasonable request);</li>
                <li>it does not infringe on other people's privacy rights;</li>
                <li>you accept all responsibility for any legal claim against Hotel-Living.com related to this.</li>
              </ul>
              <p className="mb-4">
                To avoid any doubt: we are not responsible for any image uploaded to our Platform and may remove any image at our discretion (for example, if we detect that an image does not comply with the above criteria).
              </p>
            </section>
            
            <section className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-[#e9e1ea]">DICTIONARY</h3>
              <p className="mb-4">
                "Account" refers to an account (with Hotel-Living.com or a Group Company), through which you can book Travel Experiences on our Platform.
              </p>
              <p className="mb-4">
                "Accommodation" refers to the provision of an accommodation service by a Service Provider (in Section B, "Service Provider" refers to the provider of the accommodation service).
              </p>
              <p className="mb-4">
                "Reservation" refers to the booking of a Travel Experience from our Platform, whether you pay for it immediately or later.
              </p>
              <p className="mb-4">
                "Hotel-Living.com", "we", "us", or "our" refers to Hotel-Living.com.
              </p>
              <p className="mb-4">
                "Transferable Credit" refers to a benefit with a monetary value that you can "transfer" to the Payment Method you have registered with us, or that you can use to pay for the amount of a future Travel Experience.
              </p>
              <p className="mb-4">
                "Credit" refers to a benefit with a monetary value. There is "Transferable Credit" and "Travel Credit".
              </p>
              <p className="mb-4">
                "Credit Card Refund" refers to a benefit with a monetary value that can be redeemed on the credit card you have registered with us, but that cannot be used to pay for the amount of a future Travel Experience.
              </p>
              <p className="mb-4">
                "Currency Exchange Rate" refers to the exchange rate we use to convert currency; currently, it is the WM/Refinitiv End-of-Day Exchange Rate, but it may change.
              </p>
              <p className="mb-4">
                "Eligible Reservation" refers to a Reservation that meets the criteria to receive a Reward.
              </p>
              <p className="mb-4">
                "Particular Reward Criteria" refers to the rules that apply to certain Rewards, in addition to the general terms of "Rewards, Credit, and Wallet" (A13) above.
              </p>
              <p className="mb-4">
                "Pay in Your Currency" refers to the payment option we sometimes offer when a Service Provider does not use your currency. This option allows you to pay in your own currency.
              </p>
              <p className="mb-4">
                "Payment Method" refers to the method (credit card, debit card, bank account, PayPal, ApplePay, etc.) used to make a payment or transfer money.
              </p>
              <p className="mb-4">
                "Platform" refers to the website or app through which you can book Travel Experiences, whether owned by Hotel-Living.com or an external affiliate, or managed by these.
              </p>
              <p className="mb-4">
                "Reward" refers to a benefit that is promised to you. In most cases, Rewards will be Travel Credit, Transferable Credit, Credit Card Refunds, or a voucher for an item of some kind.
              </p>
              <p className="mb-4">
                "Service Provider" refers to the provider of a travel-related product or service from the Platform, which includes, among others: the owner of a hotel or other accommodation.
              </p>
              <p className="mb-4">
                "Conditions" refers to these service conditions.
              </p>
              <p className="mb-4">
                "External Aggregator" refers to a company that acts as (a) an intermediary between you and the Service Provider or (b) a reseller of the Travel Experience.
              </p>
              <p className="mb-4">
                "Third-Party Terms" (in the "Flights" section) refers to both the Intermediation Contract and the Transport Contract.
              </p>
              <p className="mb-4">
                "Travel Credit" refers to a benefit with a monetary value that you can use to pay for the amount of a future Travel Experience, but that you cannot "transfer".
              </p>
              <p className="mb-4">
                "Advance Payment" refers to a payment you make when you book a product or service (instead of when you actually use it).
              </p>
              <p className="mb-4">
                "Wallet" refers to a panel in your Account that shows your Rewards, Credit, and other incentives.
              </p>
              <p className="mb-6">
                We will update these service conditions regularly (once or twice a year).
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}