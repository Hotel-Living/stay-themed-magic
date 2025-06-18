
import React from "react";
import { useTranslation } from "react-i18next";

export function TermsConditionsContent() {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  if (isSpanish) {
    return (
      <div className="space-y-6">
        <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-purple-500/20">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">TÉRMINOS Y CONDICIONES – HOTEL‑LIVING (PARA PROPIETARIOS)</h2>
            
            <div className="space-y-8 text-gray-200">
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">1. Objeto y alcance</h3>
                <p className="leading-relaxed">
                  Los presentes Términos y Condiciones regulan la relación entre el proveedor de alojamiento (en adelante, el "Proveedor") y la plataforma Hotel‑Living, para la publicación y comercialización de estancias temáticas de media duración.
                </p>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">2. Obligaciones</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">2.1. Obligaciones del Proveedor</h4>
                  <p className="mb-3">El Proveedor se compromete a:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Publicar información veraz y actualizada de su alojamiento.</li>
                    <li>Cumplir con la normativa local vigente, incluyendo legislación fiscal, sanitaria y turística.</li>
                    <li>Mantener los estándares de calidad exigidos por Hotel‑Living.</li>
                    <li>Gestionar con diligencia las reservas y cobros recibidos del cliente.</li>
                    <li>Informar a Hotel‑Living si su régimen fiscal difiere significativamente del estándar aplicado (10%).</li>
                    <li>Asumir la <strong className="text-yellow-300">plena responsabilidad por la relación directa con el cliente</strong>, incluyendo el cumplimiento del servicio contratado, la gestión de cancelaciones, reclamaciones o incidencias surgidas durante la estancia.</li>
                    <li>Reconocer que <strong className="text-yellow-300">Hotel‑Living actúa exclusivamente como plataforma de intermediación</strong>, sin intervenir en la prestación efectiva del servicio de alojamiento. Cualquier disputa legal, contractual o de consumo entre cliente y establecimiento deberá resolverse entre ambas partes conforme a la legislación vigente.</li>
                    <li>No obstante, <strong className="text-yellow-300">Hotel‑Living podrá ofrecer mecanismos de mediación amistosa</strong>, si ambas partes lo solicitan expresamente, sin que ello implique asumir responsabilidad alguna.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-white mb-3">2.2. Obligaciones de Hotel‑Living</h4>
                  <p className="mb-3">Hotel‑Living se compromete a:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mostrar de forma clara y transparente el precio total al cliente, incluyendo impuestos estimados.</li>
                    <li>Aplicar al cliente un cobro anticipado del 15% sobre el precio total, del cual el 7% se transferirá al Proveedor como depósito no reembolsable.</li>
                    <li>Transferir mensualmente al Proveedor los depósitos acumulados correspondientes a reservas confirmadas.</li>
                    <li>Emitir facturas mensuales con detalle de las reservas gestionadas y los importes liquidados.</li>
                    <li>Atender con diligencia cualquier comunicación del Proveedor relativa a su cuenta, reservas o ajustes fiscales.</li>
                    <li>No modificar unilateralmente las condiciones económicas sin previo aviso y sin posibilidad de baja voluntaria por parte del Proveedor.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">3. Precios, impuestos y condiciones económicas</h3>
                
                <div className="space-y-4">
                  <div>
                    <p><strong>3.1.</strong> El precio final mostrado al cliente en la plataforma incluye:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>El precio del alojamiento</li>
                      <li>La comisión de Hotel‑Living</li>
                      <li>Impuestos estimados (por defecto, un 10%)</li>
                    </ul>
                  </div>

                  <div>
                    <p><strong>3.2.</strong> Hotel‑Living cobra una <strong className="text-yellow-300">comisión fija del 8% sobre el precio total final mostrado al cliente</strong>.</p>
                  </div>

                  <div>
                    <p><strong>3.3.</strong> El cliente paga <strong className="text-yellow-300">el 15% del precio total</strong> al momento de realizar la reserva.</p>
                    <p className="mt-2">Este pago anticipado se distribuye automáticamente así:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li><strong className="text-green-300">8% del total</strong> → Comisión de Hotel‑Living</li>
                      <li><strong className="text-green-300">7% del total</strong> → Depósito no reembolsable transferido al Proveedor</li>
                    </ul>
                  </div>

                  <div>
                    <p><strong>3.4.</strong> El <strong className="text-yellow-300">85% restante</strong> del precio total será pagado directamente por el cliente al alojamiento al momento del check-in o durante su estancia.</p>
                  </div>
                </div>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">4. Cancelaciones</h3>
                <div className="space-y-3">
                  <p><strong>4.1.</strong> En caso de cancelación por parte del cliente, el pago anticipado del 15% <strong className="text-red-300">no será reembolsado</strong>.</p>
                  <p><strong>4.2.</strong> El depósito del 7% será conservado por el hotel como compensación.</p>
                </div>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">5. Ajustes fiscales</h3>
                <div className="space-y-3">
                  <p><strong>5.1.</strong> Hotel‑Living aplica, por defecto, un tipo estimado del 10% de impuestos para calcular el precio final al cliente.</p>
                  <p><strong>5.2.</strong> Si el régimen fiscal del Proveedor difiere sustancialmente, este deberá comunicarlo por escrito antes de la publicación. Hotel‑Living ajustará entonces los precios y el reparto correspondiente.</p>
                </div>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">6. Facturación</h3>
                <p>Hotel‑Living emite mensualmente una factura al Proveedor con el detalle de las reservas y la suma total de los depósitos transferidos.</p>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">7. Modificaciones</h3>
                <p>Hotel‑Living podrá modificar estos Términos y Condiciones notificando al Proveedor con al menos 30 días de antelación. Si el Proveedor no acepta los cambios, podrá solicitar la baja siempre que no tenga reservas pendientes.</p>
              </section>

              <hr className="border-purple-500/30" />

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">8. Suspensión y cancelación</h3>
                <p>Hotel‑Living se reserva el derecho de suspender o cancelar la colaboración con cualquier Proveedor en caso de incumplimiento, mala praxis o quejas recurrentes por parte de los clientes.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // English version
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-8 bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border border-purple-500/20">
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
      </div>
    </div>
  );
}
