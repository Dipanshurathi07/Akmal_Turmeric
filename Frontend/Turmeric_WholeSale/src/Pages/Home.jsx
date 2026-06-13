import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { TrendingUp, Award, Globe } from "lucide-react";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514996937319-344454492b37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Wholesale hing supply"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 to-orange-900/60"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">
                Wholesale Hing & Asafoetida
              </h1>

              <h2 className="text-3xl mb-6">
                Business-to-Business Supply
              </h2>

              <p className="text-xl mb-8 text-white/90">
                Source premium quality hing in bulk. Direct from trusted farms
                to your manufacturing, retail, or export business.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg transition-colors inline-block"
                >
                  View Catalog
                </Link>

                <Link
                  to="/contact"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg transition-colors inline-block"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-yellow-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              Why Partner With Us
            </h2>

            <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              Trusted by businesses worldwide for consistent quality and
              reliable supply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow dark:shadow-slate-900/40">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full mb-4">
                <TrendingUp size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Wholesale Pricing
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                Competitive bulk rates with volume discounts. Minimum order:
                10kg
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow dark:shadow-slate-900/40">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full mb-4">
                <Award size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Trusted Quality
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                Consistent grade control for food, pharma, and export clients.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center bg-white dark:bg-slate-800 p-6 rounded-xl shadow dark:shadow-slate-900/40">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full mb-4">
                <Globe size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Global Shipping
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                Reliable worldwide delivery with tracked shipments and custom
                documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our Product Range
            </h2>

            <p className="text-slate-600 dark:text-slate-300">
              Premium hing products designed for manufacturers, exporters, and
              wholesale buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5 dark:shadow-black/40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=1080"
                alt="Hing powder"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  Hing Powder
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Premium powder for spice blends, seasoning lines, and retail
                  packs.
                </p>

                <Link
                  to="/products"
                  className="text-yellow-700 hover:text-yellow-800"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5 dark:shadow-black/40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=1080"
                alt="Hing resin"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  Hing Resin
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Natural resin for bulk spice manufacturing and industrial use.
                </p>

                <Link
                  to="/products"
                  className="text-yellow-700 hover:text-yellow-800"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5 dark:shadow-black/40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?q=80&w=1080"
                alt="Hing extract"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  Hing Extract
                </h3>

                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Concentrated extract for flavors, fragrances, and pharma
                  applications.
                </p>

                <Link
                  to="/products"
                  className="text-yellow-700 hover:text-yellow-800"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-700 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Order?
          </h2>

          <p className="text-xl mb-8">
            Create an account to access wholesale pricing.
          </p>

          <div className="flex gap-4 justify-center">
            {user ? (
              <>
                <Link
                  to="/products"
                  className="bg-white text-yellow-700 px-8 py-3 rounded-lg hover:bg-yellow-50"
                >
                  View Catalog
                </Link>
                <Link
                  to="/orders"
                  className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-lg"
                >
                  My Orders
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/verify-email"
                  className="bg-white text-yellow-700 px-8 py-3 rounded-lg hover:bg-yellow-50"
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-lg"
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