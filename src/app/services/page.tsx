"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Mountain, Ticket, Plane, Hotel, Car, Umbrella } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const mainServices = [
    {
      icon: GraduationCap,
      title: "School & College Tours",
      description: "Educational and fun trips designed specifically for students. Safe, supervised, and enriching experiences that combine learning with adventure.",
      features: [
        "Experienced tour guides",
        "Safety-first approach",
        "Educational itineraries",
        "Group discounts available",
      ],
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: Briefcase,
      title: "Corporate Trips",
      description: "Team building experiences and corporate retreats that boost morale and productivity. Perfect for conferences, offsites, and incentive travel.",
      features: [
        "Customized packages",
        "Professional coordination",
        "Conference facilities",
        "Team building activities",
      ],
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Mountain,
      title: "Adventure Tours",
      description: "Thrilling expeditions for adventure enthusiasts. From trekking to rafting, we offer adrenaline-pumping experiences across stunning landscapes.",
      features: [
        "Experienced guides",
        "Safety equipment provided",
        "Multiple difficulty levels",
        "Small group sizes",
      ],
      color: "from-green-600 to-teal-600",
    },
    {
      icon: Ticket,
      title: "Theme Parks & Entertainment",
      description: "Fun-filled visits to India's best theme parks and entertainment venues. Perfect for families and groups looking for excitement.",
      features: [
        "Skip-the-line passes",
        "Package deals",
        "Transportation included",
        "Food options available",
      ],
      color: "from-orange-600 to-red-600",
    },
  ];

  const additionalServices = [
    {
      icon: Plane,
      title: "Flight Bookings",
      description: "Best deals on domestic and international flights",
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "Wide range of accommodations to suit every budget",
    },
    {
      icon: Car,
      title: "Car Rentals",
      description: "Self-drive and chauffeur-driven vehicles available",
    },
    {
      icon: Umbrella,
      title: "Travel Insurance",
      description: "Comprehensive coverage for peace of mind",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Comprehensive travel solutions tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Specialty Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expertly crafted experiences for every type of traveler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/custom-trip">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless travel experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow text-center group">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Experienced Team",
                description: "15+ years of expertise in creating unforgettable travel experiences",
              },
              {
                title: "Competitive Pricing",
                description: "Best value for money with transparent pricing and no hidden charges",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service to assist you throughout your journey",
              },
            ].map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-purple-600 mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-700">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let us help you create the perfect travel experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/custom-trip">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
                  Request Custom Trip
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
