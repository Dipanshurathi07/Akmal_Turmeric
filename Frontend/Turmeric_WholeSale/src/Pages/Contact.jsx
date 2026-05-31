import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const updateField = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact UI only");
  };

  return (
    <div className="py-12 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for inquiries,
            quotes, or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Send us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Your Name *
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">
                  Email Address *
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    updateField(
                      "email",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block mb-2 font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    updateField(
                      "company",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Company Ltd."
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-medium">
                  Message *
                </label>

                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    updateField(
                      "message",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">

            <div className="bg-white rounded-xl shadow-lg p-8">

              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">

                <InfoCard
                  icon={
                    <Phone
                      className="text-yellow-700"
                      size={20}
                    />
                  }
                  title="Phone/WhatsApp"
                  text={
                    <>
                      +91 7317643062
                    </>
                  }
                />

                <InfoCard
                  icon={
                    <Mail
                      className="text-yellow-700"
                      size={20}
                    />
                  }
                  title="Email"
                  text={
                    <>
                      sales@pakaNafsa.com
                      <br />
                      support@pakaNafsa.com
                    </>
                  }
                />

                <InfoCard
                  icon={
                    <MapPin
                      className="text-yellow-700"
                      size={20}
                    />
                  }
                  title="Office Address"
                  text={
                    <>
                      B39-40, Basement, Lajpat Nagar 1,
                      <br />
                      New Delhi, India
                    </>
                  }
                />

                <InfoCard
                  icon={
                    <Clock
                      className="text-yellow-700"
                      size={20}
                    />
                  }
                  title="Business Hours"
                  text={
                    <>
                      Mon - Fri: 8AM - 6PM
                      <br />
                      Saturday: 9AM - 2PM
                      <br />
                      Sunday: Closed
                    </>
                  }
                />

              </div>
            </div>

            {/* Bulk Order */}
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-8 text-white">

              <h3 className="text-2xl font-semibold mb-4">
                Bulk Order Inquiries
              </h3>

              <p className="mb-6 text-white/90">
                For large volume orders or custom
                requirements, contact our business team.
              </p>

              <a
                href="mailto:bulk@pakaNafsa.com"
                className="bg-white text-yellow-700 px-6 py-3 rounded-lg hover:bg-yellow-50 transition inline-block"
              >
                bulk@pakaNafsa.com
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">

      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold mb-1">
          {title}
        </h3>

        <p className="text-gray-600">
          {text}
        </p>
      </div>

    </div>
  );
}

export default Contact;