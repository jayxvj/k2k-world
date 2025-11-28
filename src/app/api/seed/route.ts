import { NextRequest, NextResponse } from 'next/server';
import { createDestination } from '@/lib/firebase/firestore';

const seedDestinations = [
  {
    name: "Kashmir - Paradise on Earth",
    slug: "kashmir",
    price: 25000,
    duration: "6 Days / 5 Nights",
    shortDescription: "Experience the breathtaking beauty of Dal Lake, Mughal gardens, and snow-capped mountains in the crown of India.",
    description: "Kashmir, often called 'Paradise on Earth', offers stunning landscapes, serene lakes, and rich cultural heritage. This tour takes you through Srinagar's famous Dal Lake, the beautiful valleys of Pahalgam and Gulmarg, and the pristine meadows that make Kashmir unforgettable.",
    highlights: [
      "Shikara ride on Dal Lake",
      "Stay in traditional houseboats",
      "Visit Mughal Gardens - Nishat, Shalimar",
      "Gondola ride in Gulmarg",
      "Betaab Valley exploration",
      "Shopping at Lal Chowk"
    ],
    images: [
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar",
        description: "Arrive at Srinagar airport, transfer to houseboat. Evening Shikara ride on Dal Lake. Overnight stay in houseboat."
      },
      {
        day: 2,
        title: "Srinagar Sightseeing",
        description: "Visit Mughal Gardens - Nishat Bagh, Shalimar Bagh, Chashme Shahi. Explore Shankaracharya Temple. Evening at leisure."
      },
      {
        day: 3,
        title: "Gulmarg Excursion",
        description: "Full day trip to Gulmarg. Enjoy Gondola ride to Apharwat Peak. Activities like skiing and snowboarding. Return to Srinagar."
      },
      {
        day: 4,
        title: "Pahalgam Day Trip",
        description: "Drive to Pahalgam. Visit Betaab Valley, Aru Valley, and Chandanwari. Enjoy the scenic beauty. Return to Srinagar."
      },
      {
        day: 5,
        title: "Sonmarg Visit",
        description: "Excursion to Sonmarg - 'Meadow of Gold'. Visit Thajiwas Glacier. Optional pony rides. Return to Srinagar for overnight stay."
      },
      {
        day: 6,
        title: "Departure",
        description: "After breakfast, transfer to Srinagar airport for your onward journey with beautiful memories."
      }
    ],
    inclusions: [
      "5 nights accommodation (2 nights houseboat + 3 nights hotel)",
      "Daily breakfast and dinner",
      "All transfers and sightseeing by private vehicle",
      "Shikara ride on Dal Lake",
      "All permit fees and parking charges",
      "Professional tour guide"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and beverages",
      "Gondola ride tickets",
      "Personal expenses and tips",
      "Travel insurance",
      "Any activity not mentioned in inclusions"
    ],
    featured: true,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Manali - Snow Paradise",
    slug: "manali",
    price: 18000,
    duration: "5 Days / 4 Nights",
    shortDescription: "Explore the stunning valleys, adventure activities, and serene landscapes of Manali in the Himalayas.",
    description: "Manali is a high-altitude Himalayan resort town known for its cool climate, snow-capped mountains, and adventure activities. Perfect for honeymooners, adventure seekers, and nature lovers.",
    highlights: [
      "Rohtang Pass adventure",
      "Solang Valley activities",
      "Hadimba Temple visit",
      "Mall Road shopping",
      "River rafting in Beas",
      "Vashisht hot springs"
    ],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        description: "Arrive in Manali, check into hotel. Evening walk on Mall Road. Overnight stay in Manali."
      },
      {
        day: 2,
        title: "Manali Local Sightseeing",
        description: "Visit Hadimba Temple, Manu Temple, Vashisht hot springs, Club House. Evening at leisure on Mall Road."
      },
      {
        day: 3,
        title: "Solang Valley",
        description: "Full day at Solang Valley. Enjoy paragliding, zorbing, horse riding. Cable car ride to snow point. Return to hotel."
      },
      {
        day: 4,
        title: "Rohtang Pass Excursion",
        description: "Early morning trip to Rohtang Pass. Enjoy snow activities. Visit local markets. Return to Manali for overnight stay."
      },
      {
        day: 5,
        title: "Departure",
        description: "After breakfast, check out from hotel and depart with wonderful memories of Manali."
      }
    ],
    inclusions: [
      "4 nights hotel accommodation",
      "Daily breakfast",
      "All transfers by private vehicle",
      "Sightseeing as per itinerary",
      "All permit fees",
      "Driver allowances"
    ],
    exclusions: [
      "Travel to/from Manali",
      "Lunch and dinner",
      "Adventure activity charges",
      "Personal expenses",
      "Travel insurance"
    ],
    featured: true,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Goa - Beach Paradise",
    slug: "goa",
    price: 15000,
    duration: "4 Days / 3 Nights",
    shortDescription: "Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa.",
    description: "Goa is India's beach capital with golden sands, Portuguese heritage, vibrant nightlife, and delicious seafood. Perfect blend of relaxation and adventure.",
    highlights: [
      "North Goa beaches - Baga, Calangute, Anjuna",
      "South Goa beaches - Palolem, Colva",
      "Water sports adventures",
      "Dudhsagar Waterfalls",
      "Old Goa churches",
      "Beach shacks and nightlife"
    ],
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & North Goa",
        description: "Arrive in Goa, check into hotel. Visit Calangute and Baga beaches. Evening at Anjuna Beach. Overnight stay."
      },
      {
        day: 2,
        title: "North Goa Sightseeing",
        description: "Visit Fort Aguada, Chapora Fort. Water sports at Baga Beach. Evening at Tito's Lane. Return to hotel."
      },
      {
        day: 3,
        title: "South Goa Tour",
        description: "Explore South Goa - Colva Beach, Palolem Beach. Visit old churches. Sunset cruise on Mandovi River."
      },
      {
        day: 4,
        title: "Departure",
        description: "Morning at leisure. Check out and transfer to airport/railway station for onward journey."
      }
    ],
    inclusions: [
      "3 nights hotel accommodation",
      "Daily breakfast",
      "Airport/station transfers",
      "Sightseeing by vehicle",
      "River cruise"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and dinner",
      "Water sports charges",
      "Entry fees to monuments",
      "Personal expenses"
    ],
    featured: true,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Kerala - God's Own Country",
    slug: "kerala",
    price: 22000,
    duration: "6 Days / 5 Nights",
    shortDescription: "Experience backwaters, lush greenery, tea plantations, and Ayurvedic wellness in Kerala.",
    description: "Kerala offers serene backwaters, exotic wildlife, pristine beaches, and rich cultural heritage. Experience houseboat cruises, Ayurvedic treatments, and warm hospitality.",
    highlights: [
      "Houseboat stay in Alleppey backwaters",
      "Munnar tea plantations",
      "Periyar wildlife sanctuary",
      "Kathakali dance performance",
      "Ayurvedic spa treatments",
      "Fort Kochi heritage walk"
    ],
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      "https://images.unsplash.com/photo-1580371217009-e4f9eeb81b3b?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cochin",
        description: "Arrive at Cochin airport, transfer to hotel. Visit Fort Kochi, Chinese fishing nets, St. Francis Church. Overnight stay."
      },
      {
        day: 2,
        title: "Cochin to Munnar",
        description: "Drive to Munnar. En route visit Cheeyappara and Valara waterfalls. Check into hotel. Evening at leisure."
      },
      {
        day: 3,
        title: "Munnar Sightseeing",
        description: "Visit tea gardens, Eravikulam National Park, Mattupetty Dam, Echo Point. Enjoy the scenic beauty."
      },
      {
        day: 4,
        title: "Munnar to Thekkady",
        description: "Drive to Thekkady. Visit spice plantations. Evening boat ride in Periyar Lake for wildlife viewing."
      },
      {
        day: 5,
        title: "Thekkady to Alleppey",
        description: "Transfer to Alleppey. Board luxury houseboat. Cruise through backwaters. Overnight stay in houseboat."
      },
      {
        day: 6,
        title: "Departure",
        description: "After breakfast, disembark from houseboat. Transfer to Cochin airport for departure."
      }
    ],
    inclusions: [
      "5 nights accommodation (4 nights hotel + 1 night houseboat)",
      "Daily breakfast and dinner",
      "All transfers by private vehicle",
      "Houseboat cruise with meals",
      "Entry fees to parks and monuments",
      "Boat ride at Periyar"
    ],
    exclusions: [
      "Airfare",
      "Lunch on non-houseboat days",
      "Ayurvedic treatments",
      "Personal expenses",
      "Camera fees",
      "Travel insurance"
    ],
    featured: true,
    rating: 4.9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Rajasthan - Royal Heritage",
    slug: "rajasthan",
    price: 28000,
    duration: "7 Days / 6 Nights",
    shortDescription: "Discover majestic forts, royal palaces, vibrant culture, and desert landscapes of Rajasthan.",
    description: "Rajasthan showcases India's royal heritage with magnificent forts, palaces, colorful bazaars, and the Thar Desert. Experience the grandeur of Rajput culture.",
    highlights: [
      "Jaipur City Palace & Hawa Mahal",
      "Amber Fort elephant ride",
      "Udaipur Lake Palace",
      "Jaisalmer Fort & sand dunes",
      "Jodhpur Mehrangarh Fort",
      "Camel safari in Thar Desert"
    ],
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      "https://images.unsplash.com/photo-1613048284143-c490bb533f75?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur",
        description: "Arrive in Jaipur, check into hotel. Evening visit to Birla Temple and local markets. Overnight stay."
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        description: "Visit Amber Fort, Hawa Mahal, City Palace, Jantar Mantar. Evening cultural show with Rajasthani dinner."
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur",
        description: "Drive to Jodhpur. Visit Mehrangarh Fort, Jaswant Thada. Explore Clock Tower and Sardar Market."
      },
      {
        day: 4,
        title: "Jodhpur to Jaisalmer",
        description: "Drive to Jaisalmer. Check into hotel. Evening walk around Gadisar Lake. Overnight in Jaisalmer."
      },
      {
        day: 5,
        title: "Jaisalmer Fort & Desert",
        description: "Visit Jaisalmer Fort, Patwon Ki Haveli. Evening camel safari and cultural program at Sam Sand Dunes."
      },
      {
        day: 6,
        title: "Jaisalmer to Udaipur",
        description: "Drive to Udaipur. En route visit Ranakpur Jain Temples. Check into hotel. Evening boat ride on Lake Pichola."
      },
      {
        day: 7,
        title: "Udaipur Sightseeing & Departure",
        description: "Visit City Palace, Jagdish Temple, Saheliyon Ki Bari. Transfer to airport for departure."
      }
    ],
    inclusions: [
      "6 nights hotel accommodation",
      "Daily breakfast",
      "All transfers and sightseeing by AC vehicle",
      "Elephant ride at Amber Fort",
      "Camel safari at Sam Sand Dunes",
      "Boat ride on Lake Pichola",
      "All monument entry fees"
    ],
    exclusions: [
      "Airfare",
      "Lunch and dinner",
      "Camera fees at monuments",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance"
    ],
    featured: true,
    rating: 4.8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Delhi - Agra - Taj Mahal Tour",
    slug: "delhi-agra",
    price: 12000,
    duration: "3 Days / 2 Nights",
    shortDescription: "Experience the iconic Taj Mahal, historic Delhi monuments, and Mughal architecture in this classic tour.",
    description: "Explore India's Golden Triangle with Delhi's bustling streets and monuments, and Agra's world-famous Taj Mahal. Perfect short tour for first-time visitors.",
    highlights: [
      "Taj Mahal at sunrise",
      "Agra Fort exploration",
      "India Gate & Rashtrapati Bhavan",
      "Qutub Minar",
      "Red Fort Delhi",
      "Chandni Chowk rickshaw ride"
    ],
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive in Delhi, check into hotel. Visit India Gate, Rashtrapati Bhavan, Lotus Temple. Evening at Connaught Place."
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Morning visit Red Fort and Jama Masjid. Drive to Agra. Visit Agra Fort. Sunset view of Taj Mahal from Mehtab Bagh."
      },
      {
        day: 3,
        title: "Taj Mahal & Departure",
        description: "Sunrise visit to Taj Mahal. After breakfast, visit Itmad-ud-Daulah. Return to Delhi for departure."
      }
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "Daily breakfast",
      "Delhi-Agra-Delhi by AC car",
      "All monument entry fees",
      "Professional guide",
      "Rickshaw ride in Chandni Chowk"
    ],
    exclusions: [
      "Airfare",
      "Lunch and dinner",
      "Personal expenses",
      "Tips",
      "Travel insurance"
    ],
    featured: false,
    rating: 4.7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Hyderabad - City of Pearls",
    slug: "hyderabad",
    price: 10000,
    duration: "3 Days / 2 Nights",
    shortDescription: "Explore the historic Charminar, taste authentic Hyderabadi biryani, and discover the city's rich culture.",
    description: "Hyderabad blends historic charm with modern development. Famous for Charminar, Golconda Fort, pearls, and delicious cuisine.",
    highlights: [
      "Charminar & Laad Bazaar",
      "Golconda Fort light & sound show",
      "Ramoji Film City",
      "Hussain Sagar Lake",
      "Authentic Hyderabadi Biryani",
      "Salar Jung Museum"
    ],
    images: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      "https://images.unsplash.com/photo-1580371217009-e4f9eeb81b3b?w=800",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hyderabad",
        description: "Arrive in Hyderabad, check into hotel. Visit Hussain Sagar Lake, Birla Mandir. Evening at Necklace Road."
      },
      {
        day: 2,
        title: "Hyderabad Sightseeing",
        description: "Visit Charminar, Mecca Masjid, Laad Bazaar. Afternoon at Salar Jung Museum. Evening Golconda Fort light show."
      },
      {
        day: 3,
        title: "Ramoji Film City & Departure",
        description: "Full day at Ramoji Film City. Evening transfer to airport/station for departure."
      }
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "Daily breakfast",
      "All transfers and sightseeing by AC vehicle",
      "Ramoji Film City guided tour",
      "All entry fees"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Shopping",
      "Travel insurance"
    ],
    featured: false,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Kanyakumari - Southern Tip",
    slug: "kanyakumari",
    price: 14000,
    duration: "4 Days / 3 Nights",
    shortDescription: "Witness the confluence of three seas, visit Vivekananda Rock Memorial, and explore the southern tip of India.",
    description: "Kanyakumari, where the Bay of Bengal, Arabian Sea, and Indian Ocean meet. Famous for stunning sunrises, sunsets, and spiritual significance.",
    highlights: [
      "Vivekananda Rock Memorial",
      "Thiruvalluvar Statue",
      "Sunrise & sunset viewing",
      "Padmanabhapuram Palace",
      "Suchindram Temple",
      "Trivandrum sightseeing"
    ],
    images: [
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Trivandrum",
        description: "Arrive at Trivandrum, visit Padmanabhaswamy Temple, Museum, Zoo. Drive to Kanyakumari. Check into hotel."
      },
      {
        day: 2,
        title: "Kanyakumari Sightseeing",
        description: "Early morning sunrise view. Visit Vivekananda Rock Memorial, Thiruvalluvar Statue. Evening sunset at beach."
      },
      {
        day: 3,
        title: "Kanyakumari Temples",
        description: "Visit Kumari Amman Temple, Gandhi Memorial, Suchindram Temple. Afternoon at leisure on beach."
      },
      {
        day: 4,
        title: "Departure",
        description: "After breakfast, transfer to Trivandrum airport/station for departure."
      }
    ],
    inclusions: [
      "3 nights hotel accommodation",
      "Daily breakfast",
      "All transfers by AC vehicle",
      "Ferry to Vivekananda Rock",
      "All entry fees"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance"
    ],
    featured: false,
    rating: 4.6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Mumbai - City of Dreams",
    slug: "mumbai",
    price: 11000,
    duration: "3 Days / 2 Nights",
    shortDescription: "Experience Bollywood, colonial architecture, street food, and the vibrant energy of India's financial capital.",
    description: "Mumbai, the city that never sleeps, offers a mix of colonial history, Bollywood glamour, street food, and modern skyscrapers.",
    highlights: [
      "Gateway of India",
      "Marine Drive sunset",
      "Bollywood studio tour",
      "Elephanta Caves",
      "Street food at Juhu Beach",
      "Colaba Causeway shopping"
    ],
    images: [
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800",
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Mumbai",
        description: "Arrive in Mumbai, check into hotel. Visit Gateway of India, Colaba area. Evening at Marine Drive for sunset."
      },
      {
        day: 2,
        title: "Mumbai Sightseeing",
        description: "Morning ferry to Elephanta Caves. Afternoon visit Haji Ali, Siddhivinayak Temple. Evening Bollywood studio tour."
      },
      {
        day: 3,
        title: "Mumbai & Departure",
        description: "Morning at Juhu Beach, visit Film City. Afternoon shopping at Linking Road. Transfer to airport for departure."
      }
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "Daily breakfast",
      "All transfers by AC vehicle",
      "Ferry to Elephanta Caves",
      "Bollywood studio tour",
      "All entry fees"
    ],
    exclusions: [
      "Airfare",
      "Lunch and dinner",
      "Personal expenses",
      "Shopping",
      "Travel insurance"
    ],
    featured: false,
    rating: 4.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: "Pune - Oxford of the East",
    slug: "pune",
    price: 9000,
    duration: "3 Days / 2 Nights",
    shortDescription: "Explore historic forts, vibrant culture, and the educational hub of Maharashtra in Pune.",
    description: "Pune combines historic forts, educational institutions, IT parks, and a vibrant cultural scene. Perfect weekend getaway from Mumbai.",
    highlights: [
      "Shaniwar Wada Fort",
      "Aga Khan Palace",
      "Sinhagad Fort trek",
      "Osho Ashram",
      "Koregaon Park cafes",
      "Dagdusheth Halwai Temple"
    ],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Pune",
        description: "Arrive in Pune, check into hotel. Visit Shaniwar Wada, Dagdusheth Temple. Evening at Koregaon Park."
      },
      {
        day: 2,
        title: "Pune Sightseeing",
        description: "Morning trek to Sinhagad Fort. Afternoon visit Aga Khan Palace, Osho Ashram. Evening at FC Road."
      },
      {
        day: 3,
        title: "Pune & Departure",
        description: "Visit Raja Dinkar Kelkar Museum, Pataleshwar Cave Temple. Transfer to airport/station for departure."
      }
    ],
    inclusions: [
      "2 nights hotel accommodation",
      "Daily breakfast",
      "All transfers by AC vehicle",
      "All entry fees"
    ],
    exclusions: [
      "Airfare/train tickets",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance"
    ],
    featured: false,
    rating: 4.4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function POST(request: NextRequest) {
  try {
    // Simple security check (in production, use proper authentication)
    const { secret } = await request.json();
    
    if (secret !== 'ktok-seed-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const results = [];
    
    for (const destination of seedDestinations) {
      try {
        const id = await createDestination(destination);
        results.push({ name: destination.name, id, success: true });
      } catch (error) {
        results.push({ name: destination.name, success: false, error: String(error) });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Seeded ${results.filter(r => r.success).length} destinations`,
      results
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}
