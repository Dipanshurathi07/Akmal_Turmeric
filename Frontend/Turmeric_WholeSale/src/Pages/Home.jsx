import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TrendingUp, Award, Globe, ArrowRight, Leaf, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { getImageUrl } from "../Utils/getImageUrl";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  return (
    <div className="bg-white dark:bg-gray-950">

      {/* ── Hero ── */}
      <section className="bg-amber-950 dark:bg-amber-950 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-900/40 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-900/30 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-medium tracking-wide">Premium B2B Spice Supplier</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl">
            Wholesale Hing &{" "}
            <span className="text-amber-400">Asafoetida</span>
          </h1>

          <p className="text-amber-200/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            Direct from trusted farms to your manufacturing, retail, or export business. Consistent quality, bulk pricing, reliable supply.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              to="/products"
              className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 text-center text-sm sm:text-base flex items-center justify-center gap-2"
            >
              View catalog <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/25 text-white font-medium px-6 py-3 rounded-xl transition-all duration-150 text-center text-sm sm:text-base"
            >
              Get a bulk quote
            </Link>
          </div>

          {/* Trust stats */}
          <div className="flex flex-row gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { n: "500+", label: "Business clients" },
              { n: "1+ yr", label: "Experience" },
            ].map(({ n, label }) => (
              <div key={label}>
                <p className="text-xl sm:text-2xl font-bold text-amber-400">{n}</p>
                <p className="text-xs text-amber-300/70 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className="py-12 sm:py-16 bg-amber-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-2">
              Why choose us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Built for businesses
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: <Leaf size={20} strokeWidth={1.8} />, title: "Farm direct", desc: "Sourced from verified farms, no middlemen" },
              { icon: <Shield size={20} strokeWidth={1.8} />, title: "FSSAI certified", desc: "Meets food, pharma & export standards" },
              { icon: <Truck size={20} strokeWidth={1.8} />, title: "Bulk shipping", desc: "Pan-India & international logistics" },
              { icon: <HeadphonesIcon size={20} strokeWidth={1.8} />, title: "Dedicated support", desc: "Account manager for every B2B buyer" },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5"
              >
                <div className="w-9 h-9 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center text-amber-800 dark:text-amber-300 mb-3">
                  {icon}
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (3 big cards) ── */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-2">
              Our advantage
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Why partner with us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <TrendingUp size={24} strokeWidth={1.8} />,
                title: "Wholesale pricing",
                desc: "Competitive bulk rates with volume discounts. Minimum order: 10 kg.",
              },
              {
                icon: <Award size={24} strokeWidth={1.8} />,
                title: "Trusted quality",
                desc: "Consistent grade control for food, pharma, and export clients.",
              },
              {
                icon: <Globe size={24} strokeWidth={1.8} />,
                title: "Global shipping",
                desc: "Worldwide delivery with tracked shipments and custom documentation.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-amber-800 rounded-xl flex items-center justify-center text-amber-100 mb-4">
                  {icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-2">
                Products
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Our range
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-amber-800 dark:text-amber-400 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                img: getImageUrl(products[0]?.image) || "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=800",
                alt: "Hing powder",
                title: "Hing Powder",
                desc: "Premium powder for spice blends, seasoning lines, and retail packs.",
              },
              {
                img: getImageUrl(products[1]?.image) || "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=800",
                alt: "Hing resin",
                title: "Hing Resin",
                desc: "Natural resin for bulk spice manufacturing and industrial use.",
              },
              {
                img: getImageUrl(products[2]?.image) || "https://images.unsplash.com/photo-1599690925058-90e1a0b56154?q=80&w=800",
                alt: "Hing extract",
                title: "Hing Extract",
                desc: "Concentrated extract for flavors, fragrances, and pharma applications.",
              },
            ].map(({ img, alt, title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300"
              >
                <div className="h-44 sm:h-48 overflow-hidden bg-amber-50 dark:bg-gray-700">
                  <img
                    src={img}
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 text-sm text-amber-800 dark:text-amber-400 font-medium hover:gap-2.5 transition-all duration-150"
                  >
                    View details <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-12 sm:py-16 bg-amber-800 dark:bg-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            Ready to start your order?
          </h2>
          <p className="text-amber-200 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Create an account to access wholesale pricing and place bulk orders.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <>
                <Link
                  to="/products"
                  className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  View catalog
                </Link>
                <Link
                  to="/orders"
                  className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  My orders
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/verify-email"
                  className="bg-white text-amber-900 hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  Create account
                </Link>
                <Link
                  to="/login"
                  className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;