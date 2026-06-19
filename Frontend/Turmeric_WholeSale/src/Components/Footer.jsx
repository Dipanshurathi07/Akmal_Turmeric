import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/asfoetida_hing?utm_source=qr";

const quickLinks = ["Products", "Dashboard", "Contact Us", "About Us"];
const resources = [
  "Certifications",
  "Quality Reports",
  "Shipping Info",
  "Terms & Conditions",
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1C1410] text-stone-300 pt-20 overflow-hidden">
      {/* Ambient saffron glow, signature accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #E8A33D 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Top: brand mark */}
        <div className="flex flex-col gap-3 mb-16 max-w-xl">
          <span className="text-[13px] tracking-[0.25em] uppercase text-[#E8A33D] font-medium">
            Est. Wholesale &amp; Export
          </span>
          <h2 className="font-serif text-[2rem] md:text-[2.5rem] leading-[1.1] text-stone-50">
            Paka Nafsa Trading
            <span className="block text-stone-500">Private Limited</span>
          </h2>
          <p className="text-stone-400 leading-7 text-[16px] mt-2">
            Sourced, graded, and shipped from Delhi &mdash; hing trusted by
            kitchens and traders across the country.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] gap-x-10 gap-y-12 pb-14 border-t border-stone-50/10 pt-14">
          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-[13px] tracking-[0.2em] uppercase text-stone-500 mb-6 font-medium">
              Quick Links
            </h3>
            <ul className="space-y-4 text-[16px]">
              {quickLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-stone-300 hover:text-[#E8A33D] transition-colors duration-200"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-[13px] tracking-[0.2em] uppercase text-stone-500 mb-6 font-medium">
              Resources
            </h3>
            <ul className="space-y-4 text-[16px]">
              {resources.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-stone-300 hover:text-[#E8A33D] transition-colors duration-200"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[13px] tracking-[0.2em] uppercase text-stone-500 mb-6 font-medium">
              Contact
            </h3>
            <div className="space-y-4 text-[16px]">
              <a
                href="tel:+917317643062"
                className="flex items-start gap-3 text-stone-300 hover:text-[#E8A33D] transition-colors duration-200 w-fit"
              >
                <Phone size={18} className="mt-0.5 text-stone-500" />
                +91 7317643062
              </a>

              <a
                href="mailto:sales@pakaNafsa.com"
                className="flex items-start gap-3 text-stone-300 hover:text-[#E8A33D] transition-colors duration-200 w-fit"
              >
                <Mail size={18} className="mt-0.5 text-stone-500" />
                sales@pakaNafsa.com
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-stone-500 shrink-0" />
                <p>
                  B39&ndash;40, Basement, Lajpat Nagar 1,
                  <br />
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>

          {/* Follow / social card */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-[13px] tracking-[0.2em] uppercase text-stone-500 mb-6 font-medium">
              Follow
            </h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-stone-50/10 bg-stone-50/[0.03] p-4 hover:border-[#E8A33D]/40 hover:bg-stone-50/[0.05] transition-all duration-200"
            >
              <span className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#E8A33D] via-[#D6573F] to-[#A23B6C] text-white text-lg">
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </span>
              <span className="flex flex-col">
                <span className="text-stone-100 group-hover:text-[#E8A33D] transition-colors duration-200">
                  @asfoetida_hing
                </span>
                <span className="text-stone-500 text-sm">
                  Behind the scenes &amp; new batches
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Divider with signature seed-pod motif */}
        <div className="relative flex items-center py-2">
          <div className="flex-1 h-px bg-stone-50/10" />
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="mx-4 shrink-0"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="3" fill="#E8A33D" />
            <circle
              cx="14"
              cy="14"
              r="9"
              stroke="#E8A33D"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </svg>
          <div className="flex-1 h-px bg-stone-50/10" />
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[14px]">
          <p>
            &copy; 2026 Paka Nafsa Trading Private Limited. All rights
            reserved.
          </p>
          <p className="text-stone-600">Wholesale hing, sourced with care.</p>
        </div>
      </div>
    </footer>
  );
}