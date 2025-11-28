"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Contact } from "@/lib/types";
import { format } from "date-fns";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: Contact["status"]) => {
    try {
      const response = await fetch(`/api/contacts/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Status updated successfully");
        fetchContacts();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("An error occurred");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600 mt-2">
          View and manage customer inquiries
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Messages</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.filter((c) => c.status === "new").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {contacts.filter((c) => c.status === "in_progress").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {contact.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            contact.status
                          )}`}
                        >
                          {contact.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {format(new Date(contact.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedContact(contact);
                          setDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      <Select
                        value={contact.status}
                        onValueChange={(value) =>
                          handleStatusChange(contact.id, value as Contact["status"])
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900">{contact.subject}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {contact.message}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-blue-600"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-blue-600"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-600">
            Contact messages will appear here when customers submit the form
          </p>
        </Card>
      )}

      {/* Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Subject</h3>
                <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Message</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Status</h3>
                <Select
                  value={selectedContact.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedContact.id, value as Contact["status"]);
                    setDialogOpen(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submission Date */}
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Submitted on{" "}
                  {format(new Date(selectedContact.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t space-y-2">
                <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </a>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
