"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, MessageSquare, Mail, Users, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Stats {
  destinations: number;
  customRequests: number;
  contacts: number;
  newRequests: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all data
        const [destRes, requestsRes, contactsRes] = await Promise.all([
          fetch("/api/destinations"),
          fetch("/api/custom-requests"),
          fetch("/api/contacts"),
        ]);

        const [destData, requestsData, contactsData] = await Promise.all([
          destRes.json(),
          requestsRes.json(),
          contactsRes.json(),
        ]);

        if (destData.success && requestsData.success && contactsData.success) {
          const newRequestsCount = requestsData.data.filter(
            (r: any) => r.status === "new"
          ).length;

          setStats({
            destinations: destData.data.length,
            customRequests: requestsData.data.length,
            contacts: contactsData.data.length,
            newRequests: newRequestsCount,
          });

          // Get recent requests (last 5)
          setRecentRequests(requestsData.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Destinations",
      value: stats?.destinations || 0,
      icon: MapPin,
      color: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Trip Requests",
      value: stats?.customRequests || 0,
      icon: MessageSquare,
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Contact Messages",
      value: stats?.contacts || 0,
      icon: Mail,
      color: "from-green-600 to-teal-600",
      bgColor: "bg-green-50",
    },
    {
      title: "New Requests",
      value: stats?.newRequests || 0,
      icon: TrendingUp,
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's an overview of your travel business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-12 rounded-full mb-4" />
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))
          : statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-full ${stat.bgColor}`}
                      >
                        <stat.icon className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trip Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Trip Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {request.name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {request.destination} • {request.groupSize} people
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            request.status === "new"
                              ? "bg-green-100 text-green-800"
                              : request.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {request.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(request.createdAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No trip requests yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/destinations"
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Destinations</p>
                  <p className="text-sm text-gray-600">
                    Add, edit or remove tour packages
                  </p>
                </div>
              </a>

              <a
                href="/admin/custom-requests"
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Trip Requests</p>
                  <p className="text-sm text-gray-600">
                    View and respond to custom trip requests
                  </p>
                </div>
              </a>

              <a
                href="/admin/contacts"
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Contact Messages</p>
                  <p className="text-sm text-gray-600">
                    Review and respond to inquiries
                  </p>
                </div>
              </a>

              <a
                href="/api/seed"
                onClick={async (e) => {
                  e.preventDefault();
                  if (confirm("Seed database with sample destinations?")) {
                    try {
                      const response = await fetch("/api/seed", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ secret: "ktok-seed-2024" }),
                      });
                      const data = await response.json();
                      if (data.success) {
                        alert("Database seeded successfully!");
                        window.location.reload();
                      } else {
                        alert("Failed to seed database");
                      }
                    } catch (error) {
                      alert("Error seeding database");
                    }
                  }
                }}
                className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Seed Database</p>
                  <p className="text-sm text-gray-600">
                    Add 10 sample destinations to get started
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
