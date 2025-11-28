"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, Check, X, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Destination } from "@/lib/types";
import Link from "next/link";

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchDestination() {
      try {
        const response = await fetch(`/api/destinations/slug/${slug}`);
        const data = await response.json();
        if (data.success) {
          setDestination(data.data);
        }
      } catch (error) {
        console.error("Error fetching destination:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Navbar />
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Navbar />
        <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The destination you're looking for doesn't exist.
          </p>
          <Link href="/destinations">
            <Button>View All Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
              <Image
                src={destination.images[selectedImage]}
                alt={destination.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{destination.rating}</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {destination.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-4 ring-purple-600" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {destination.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{destination.highlights[0]}</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {destination.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
                    <div className="space-y-6">
                      {destination.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                              {day.day}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">{day.title}</h3>
                            <p className="text-gray-700">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Inclusions & Exclusions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-green-700">
                        Inclusions
                      </h2>
                      <div className="space-y-2">
                        {destination.inclusions.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-red-700">
                        Exclusions
                      </h2>
                      <div className="space-y-2">
                        {destination.exclusions.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                <Card className="border-2 border-purple-200">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-1">Price per person</p>
                      <p className="text-4xl font-bold text-purple-600">
                        ₹{destination.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-3 border-b">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold">{destination.duration}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{destination.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href={`/custom-trip?destination=${destination.name}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book This Trip
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-700 text-center">
                        Need a custom itinerary? We can tailor this trip to your preferences!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
