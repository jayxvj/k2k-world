"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Users, DollarSign, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const customTripSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  destination: z.string().min(2, "Please enter a destination"),
  travelDates: z.object({
    start: z.string().min(1, "Start date is required"),
    end: z.string().min(1, "End date is required"),
  }),
  groupSize: z.number().min(1, "Group size must be at least 1"),
  budget: z.string().min(1, "Please specify your budget"),
  preferences: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type CustomTripForm = z.infer<typeof customTripSchema>;

function CustomTripFormContent() {
  const searchParams = useSearchParams();
  const prefilledDestination = searchParams.get("destination") || "";
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomTripForm>({
    resolver: zodResolver(customTripSchema),
    defaultValues: {
      destination: prefilledDestination,
      groupSize: 2,
    },
  });

  const onSubmit = async (data: CustomTripForm) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/custom-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success("Request submitted successfully! Check your email for confirmation.");
        reset();
      } else {
        toast.error(result.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <Card className="text-center">
            <CardContent className="p-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Request Submitted Successfully!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Thank you for choosing K to K World! We've received your custom trip request 
                and sent a confirmation email to your inbox.
              </p>
              <p className="text-gray-600 mb-8">
                Our travel experts will review your requirements and get back to you within 24 hours 
                with a personalized itinerary and quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                >
                  Submit Another Request
                </Button>
                <Button
                  onClick={() => window.location.href = "/"}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Plan Your Custom Trip
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Tell us about your dream vacation and we'll create a personalized itinerary just for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="John Doe"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination *
                      </label>
                      <Input
                        {...register("destination")}
                        placeholder="Kashmir, Goa, Kerala..."
                        className={errors.destination ? "border-red-500" : ""}
                      />
                      {errors.destination && (
                        <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Start Date *
                      </label>
                      <Input
                        {...register("travelDates.start")}
                        type="date"
                        className={errors.travelDates?.start ? "border-red-500" : ""}
                      />
                      {errors.travelDates?.start && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.travelDates.start.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        End Date *
                      </label>
                      <Input
                        {...register("travelDates.end")}
                        type="date"
                        className={errors.travelDates?.end ? "border-red-500" : ""}
                      />
                      {errors.travelDates?.end && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.travelDates.end.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Group Size & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Group Size *
                      </label>
                      <Input
                        {...register("groupSize", { valueAsNumber: true })}
                        type="number"
                        min="1"
                        placeholder="2"
                        className={errors.groupSize ? "border-red-500" : ""}
                      />
                      {errors.groupSize && (
                        <p className="text-red-500 text-sm mt-1">{errors.groupSize.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Budget *
                      </label>
                      <Input
                        {...register("budget")}
                        placeholder="₹50,000 - ₹100,000"
                        className={errors.budget ? "border-red-500" : ""}
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Preferences (Optional)
                    </label>
                    <Input
                      {...register("preferences")}
                      placeholder="Adventure activities, vegetarian food, luxury hotels..."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Additional Message *
                    </label>
                    <Textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us more about your travel plans, expectations, or any special requirements..."
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function CustomTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />
      <Suspense fallback={
        <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      }>
        <CustomTripFormContent />
      </Suspense>
      <Footer />
    </div>
  );
}