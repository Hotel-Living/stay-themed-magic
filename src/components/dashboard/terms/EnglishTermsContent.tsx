
import React from "react";

export function EnglishTermsContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold text-white mb-6">TERMS AND CONDITIONS – HOTEL‑LIVING (FOR PROPERTY OWNERS)</h2>
      
      <div className="space-y-8 text-gray-200">
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">1. Purpose and scope</h3>
          <p className="leading-relaxed">
            These Terms and Conditions govern the relationship between the accommodation provider (hereinafter, the "Provider") and the Hotel‑Living platform, for the publication and marketing of medium-term thematic stays.
          </p>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">2. Obligations</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3">2.1. Provider Obligations</h4>
            <p className="mb-3">The Provider commits to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Publish truthful and updated information about their accommodation.</li>
              <li>Comply with applicable local regulations, including tax, health, and tourism legislation.</li>
              <li>Maintain the quality standards required by Hotel‑Living.</li>
              <li>Manage bookings and payments received from clients with diligence.</li>
              <li>Inform Hotel‑Living if their tax regime differs significantly from the standard applied (10%).</li>
              <li>Assume <strong className="text-yellow-300">full responsibility for the direct relationship with the client</strong>, including fulfillment of the contracted service, management of cancellations, complaints, or incidents arising during the stay.</li>
              <li>Recognize that <strong className="text-yellow-300">Hotel‑Living acts exclusively as an intermediary platform</strong>, without intervening in the effective provision of accommodation services. Any legal, contractual, or consumer dispute between client and establishment must be resolved between both parties in accordance with applicable legislation.</li>
              <li>Nevertheless, <strong className="text-yellow-300">Hotel‑Living may offer amicable mediation mechanisms</strong>, if both parties expressly request it, without this implying assuming any responsibility.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-3">2.2. Hotel‑Living Obligations</h4>
            <p className="mb-3">Hotel‑Living commits to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Display the total price to the client clearly and transparently, including estimated taxes.</li>
              <li>Apply an advance charge of 15% of the total price to the client, of which 7% will be transferred to the Provider as a non-refundable deposit.</li>
              <li>Transfer monthly to the Provider accumulated deposits corresponding to confirmed bookings.</li>
              <li>Issue monthly invoices with details of managed bookings and liquidated amounts.</li>
              <li>Attend diligently to any communication from the Provider regarding their account, bookings, or tax adjustments.</li>
              <li>Not unilaterally modify economic conditions without prior notice and without possibility of voluntary withdrawal by the Provider.</li>
            </ul>
          </div>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">3. Prices, taxes, and economic conditions</h3>
          
          <div className="space-y-4">
            <div>
              <p><strong>3.1.</strong> The final price shown to the client on the platform includes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>The accommodation price</li>
                <li>Hotel‑Living commission</li>
                <li>Estimated taxes (by default, 10%)</li>
              </ul>
            </div>

            <div>
              <p><strong>3.2.</strong> Hotel‑Living charges a <strong className="text-yellow-300">fixed commission of 8% on the total final price shown to the client</strong>.</p>
            </div>

            <div>
              <p><strong>3.3.</strong> The client pays <strong className="text-yellow-300">15% of the total price</strong> at the time of making the booking.</p>
              <p className="mt-2">This advance payment is automatically distributed as follows:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li><strong className="text-green-300">8% of total</strong> → Hotel‑Living commission</li>
                <li><strong className="text-green-300">7% of total</strong> → Non-refundable deposit transferred to the Provider</li>
              </ul>
            </div>

            <div>
              <p><strong>3.4.</strong> The <strong className="text-yellow-300">remaining 85%</strong> of the total price will be paid directly by the client to the accommodation at check-in or during their stay.</p>
            </div>
          </div>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">4. Cancellations</h3>
          <div className="space-y-3">
            <p><strong>4.1.</strong> In case of cancellation by the client, the 15% advance payment <strong className="text-red-300">will not be refunded</strong>.</p>
            <p><strong>4.2.</strong> The 7% deposit will be retained by the hotel as compensation.</p>
          </div>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">5. Tax adjustments</h3>
          <div className="space-y-3">
            <p><strong>5.1.</strong> Hotel‑Living applies, by default, an estimated rate of 10% taxes to calculate the final price to the client.</p>
            <p><strong>5.2.</strong> If the Provider's tax regime differs substantially, they must communicate this in writing before publication. Hotel‑Living will then adjust prices and corresponding distribution.</p>
          </div>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">6. Billing</h3>
          <p>Hotel‑Living issues monthly invoices to the Provider with details of bookings and the total sum of transferred deposits.</p>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">7. Modifications</h3>
          <p>Hotel‑Living may modify these Terms and Conditions by notifying the Provider at least 30 days in advance. If the Provider does not accept the changes, they may request withdrawal provided they have no pending bookings.</p>
        </section>

        <hr className="border-purple-500/30" />

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">8. Suspension and cancellation</h3>
          <p>Hotel‑Living reserves the right to suspend or cancel collaboration with any Provider in case of non-compliance, malpractice, or recurring complaints from clients.</p>
        </section>
      </div>
    </div>
  );
}
