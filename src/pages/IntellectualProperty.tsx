import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

export default function IntellectualProperty() {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6">Intellectual Property Rights</h1>
            
            <div className="space-y-6 text-sm">
              <p>
                Hotel-Living.com and all of its contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Hotel-Living.com, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              
              <p>
                This site, as well as its innovative booking system, are internationally registered and protected both as Utility Models and by Copyright. Any reproduction or copy of the system will be legally pursued. Those interested in national franchises may contact us.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Trademarks</h2>
              <p>
                The Hotel-Living name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Hotel-Living.com or its affiliates or licensors. You must not use such marks without the prior written permission of Hotel-Living.com.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Copyright Notice</h2>
              <p>
                © {new Date().getFullYear()} Hotel-Living.com. All rights reserved. No part of this website may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the owner.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Patent Information</h2>
              <p>
                Various aspects of the Hotel-Living.com platform and booking system are patent protected or patent pending. Unauthorized use, reproduction, or distribution of these technologies is strictly prohibited.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
              <p>
                For inquiries regarding intellectual property rights, permissions, or franchising opportunities, please feel free to contact us completing the form you'll find in <Link to="/contact" className="text-fuchsia-400 hover:text-fuchsia-300">Contact</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
