export interface Destination {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: string;
  description: string;
  highlights: string[];
  images: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  showOnHomepage: boolean;
  rating: number;
  shortDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: {
    start: string;
    end: string;
  };
  groupSize: number;
  budget: string;
  preferences: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
}