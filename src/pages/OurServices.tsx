
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";

export default function OurServices() {
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 text-white">
        <div className="container max-w-4xl mx-auto py-10">
          <h1 className="text-3xl font-bold mb-8">Our Services</h1>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mt-6 mb-4">How We Work at Hotel-Living</h2>
            <p className="text-sm text-right text-gray-400 mb-6">Updated on 12/11/2024</p>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">1. How Our Service Works</h3>
              <p className="mb-4">
                The Hotel-Living revolution connects hotels and society to drive new economic opportunities and new ways of living.
              </p>
              <p className="mb-4">
                When you make a Reservation through our Platform, you are entering into a contract with the Service Provider (unless otherwise stated).
              </p>
              <p className="mb-4">
                The information that appears on our Platform is based on the information provided to us by the Service Providers. We do our best to keep the information updated at all times; however, updates to content (such as descriptions and lists of services offered by Accommodations) may take a few hours to appear.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">2. Who We Work With</h3>
              <p className="mb-4">
                Only Service Providers with whom we have a contractual relationship will appear on our Platform. These may also offer other purchase options, generally for short stays outside our Platform, so the products they offer on our platform are not necessarily the only ones offered by the establishments.
              </p>
              <p className="mb-4">
                We do not own any accommodation. We and the Service Provider are independent companies that have agreed to work together in a specific way.
              </p>
              <p className="mb-4">
                On the Platform, you will find how many accommodations you can book worldwide through us, and on our search results page, you will find how many of them might be suitable for you based on what you've told us.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">3. How We Make Money</h3>
              <p className="mb-4">
                We do not buy or (re)sell any product or service. We simply charge a commission to the Service Provider, and we do not charge you any booking fee.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">4. Search Results</h3>
              <p className="mb-4">
                The search results we offer show all Accommodations (hotels, apartments, etc.) that match your search. If you wish, you can use different filters to narrow down the results.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">5. Reviews</h3>
              <p className="mb-4">
                Each review score ranges from 1 to 10. To obtain the overall score we show you, we simply add up the scores of the reviews we have received and divide the total by the number of review scores we have received.
              </p>
              <p className="mb-4">
                You can leave a review about an Accommodation you've booked through our Platform if you stayed there, or if you went to the accommodation but didn't stay there. To edit a review you've already submitted, contact our Customer Service team.
              </p>
              <p className="mb-4">
                We have specialized people and automated systems to detect fake reviews submitted on our platform. If we find any, we remove them and, if necessary, take action against the person responsible.
              </p>
              <p className="mb-4">
                If someone sees something suspicious, they can report it at any time to the Customer Service team so our Fraud team can investigate.
              </p>
              <p className="mb-4">
                Ideally, we will publish every review we receive from customers, whether positive or negative; however, we will not show any review that includes or references, among other things:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>sensitive political topics;</li>
                <li>promotional content;</li>
                <li>illegal activities;</li>
                <li>personal or sensitive information (e.g., emails, phone numbers, or credit card information);</li>
                <li>offensive, sexual, discriminatory, threatening, hateful, or violent language or content;</li>
                <li>spam and fake content;</li>
                <li>items related to animal cruelty;</li>
                <li>identity forgery (e.g., if the author claims to be someone else);</li>
              </ul>
              <p className="mb-4">
                To ensure reviews are relevant, we only accept those submitted within three months of check-out, and we stop showing them if they are more than 36 months old or if the Accommodation changes ownership.
              </p>
              <p className="mb-4">
                An Accommodation may decide to respond to reviews.
              </p>
              <p className="mb-4">
                When there are multiple reviews, the most recent ones will appear first, subject to other factors such as, for example, what language they have been submitted in, whether they only contain a rating or also contain observations, etc. If you wish, you can sort and/or filter them (by time of year, review score, etc.).
              </p>
              <p className="mb-4">
                Sometimes we show some external review scores from other well-known travel websites. When we do, we make it clear.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">6. Prices</h3>
              <p className="mb-4">
                Service Providers are responsible for setting the rates shown on our Platform. However, we may offer advantages or other benefits by assuming the cost of doing so.
              </p>
              <p className="mb-4">
                When you make a Reservation, you agree to pay the cost of the Travel Experience and any other applicable charges and taxes (e.g., charges for extras). Taxes and charges may vary for different reasons, such as the location of the Service Provider, the type of room chosen, and the number of people staying. The price description indicates whether taxes and charges are included in the price. You can find more information about the price during the booking process.
              </p>
              <p className="mb-4">
                On our Platform, descriptions of the equipment or facilities offered by the Service Provider are included (to the extent that the Provider communicates this information to us). It also indicates how much extra they will cost you, if applicable.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">7. Star Classification and Review Score</h3>
              <p className="mb-4">
                We do not assign the star classification. According to local regulations, the star classification is assigned by (a) the Service Provider itself or (b) independent third parties (e.g., hotel classification organizations). In any case, the star classification indicates the status of the Accommodation in terms of price, facilities, and available services, among other things. We do not impose our own standards on star classifications and do not review them, but if we discover that a star classification is inaccurate, we will ask the Service Provider to prove they deserve it... or adjust it!
              </p>
              <p className="mb-4">
                How the star classification is displayed: from 1 to 5 stars next to the accommodation name.
              </p>
              <p className="mb-4">
                We do not assign review scores. Our customers do. See the "Reviews" (1F) section above.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">8. Help</h3>
              <p className="mb-4">
                If you have any questions or something doesn't go as planned, contact us. You can do this by accessing your Reservation or through our Help page, where you will also find some frequently asked questions that will be helpful.
              </p>
              <p className="mb-4">
                You will help us help you much faster if you provide us with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>the confirmation number of your Reservation, your contact details, and the email address you used to book your stay;</li>
                <li>a summary of the situation you need help with, including how you would like us to help you;</li>
                <li>any supporting documents, such as bank statements, photographs, receipts, etc.</li>
              </ul>
              <p className="mb-4">
                Whatever the problem, we will try to offer assistance (including handling any request or claim) and do our best to help you.
              </p>
              <p className="mb-4">
                What happens if a Reservation shows an incorrect price? Sometimes (though very rarely) an incorrect price might be displayed on our Platform. If so, and if you make your Reservation before we correct this error, the Accommodation is obligated to contact you as soon as possible and, in any case, reasonably in advance of check-in. Additionally, if you need us to intervene, we will do our best to reach an agreement that satisfies both parties.
              </p>
              <p className="mb-4">
                Do we ever remove Service Providers from our Platform? Of course. We may do so if we learn they have breached their contractual obligations, for example, or if they have provided an inaccurate description of their Accommodation and do not correct it when we ask them to do so.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="text-xl font-medium mb-4 text-fuchsia-300">9. Overbooking</h3>
              <p className="mb-4">
                Once your Reservation is confirmed, the Service Provider is obligated to fulfill it. If the Service Provider has an "overbooking", they will be responsible for finding a solution as quickly as possible, although we will offer them certain guidelines and practical help.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
