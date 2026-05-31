import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#03152F] text-gray-300 pt-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="text-yellow-400" size={28} />
              <h2 className="text-2xl font-medium text-white">
                Golden Harvest
              </h2>
            </div>

            <p className="text-gray-400 leading-8 text-[17px]">
              Premium organic turmeric wholesale supplier. Quality you can
              trust, service you can rely on.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-2xl mb-5 font-medium">
              Quick Links
            </h3>

            <ul className="space-y-4 text-[18px]">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Dashboard
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-2xl mb-5 font-medium">
              Resources
            </h3>

            <ul className="space-y-4 text-[18px]">
              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Certifications
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Quality Reports
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Shipping Info
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-2xl mb-5 font-medium">
              Contact
            </h3>

            <div className="space-y-5 text-[18px]">

              <div className="flex items-start gap-3">
                <Phone size={22} className="mt-1 text-gray-400" />
                <p>+91 7317643062</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={22} className="mt-1 text-gray-400" />
                <p>sales@pakaNafsa.com</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={22} className="mt-1 text-gray-400" />
                <p>
                  B39-40, Basement, Lajpat Nagar 1,
                  <br />
                  New Delhi, India
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12"></div>

        {/* Bottom */}
        <div className="py-8 text-center text-gray-500 text-lg">
          © 2026 Paka Nafsa Trading Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}