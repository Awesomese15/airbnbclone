import terrace from './assets/terrace.png';
import livingRoom from './assets/living-room.png';
import kitchen from './assets/kitchen.png';
import bedroom from './assets/bedroom.png';
import bathroom from './assets/bathroom.png';
import exterior from './assets/exterior.png';

const assets = {
  terrace,
  livingRoom,
  kitchen,
  bedroom,
  bathroom,
  exterior,
};

const photo = (id, label, detail, assetKey, alt = label, crop = '50% 50%') => ({
  id,
  label,
  detail,
  src: assets[assetKey],
  alt,
  crop,
});

const heroPhotos = [
  photo('terrace', 'Terrace lounge', 'Outdoor seating · Garden view', 'terrace', 'Terrace lounge with tropical garden view', '48% 42%'),
  photo('living', 'Living room 1', 'Air conditioning · Smart TV · Ceiling fan', 'livingRoom', 'Living room with balcony view'),
  photo('kitchen', 'Full kitchen', 'Cooking basics · Refrigerator', 'kitchen', 'Compact full kitchen'),
  photo('bedroom', 'Bedroom', 'Queen bed · Blackout curtains', 'bedroom', 'Bedroom with queen bed and balcony view'),
  photo('bathroom', 'Full bathroom', 'Walk-in shower · Hot water', 'bathroom', 'Full bathroom with walk-in shower'),
];

const rooms = [
  {
    id: 'living-room-1',
    label: 'Living room 1',
    detail: 'Sofa · Smart TV · Balcony',
    photos: [
      photo('living-1a', 'Living room 1', 'Sofa · Smart TV · Balcony', 'livingRoom', 'Living room with balcony view'),
      photo('living-1b', 'Living room 1', 'Seating · Ceiling fan', 'livingRoom', 'Living room seating angle', '62% 38%'),
      photo('living-1c', 'Living room 1', 'Balcony doors · Natural light', 'livingRoom', 'Living room natural light', '30% 55%'),
      photo('living-1d', 'Living room 1', 'Entertainment area', 'livingRoom', 'Living room TV wall', '70% 45%'),
      photo('living-1e', 'Living room 1', 'Coffee table · Decor', 'livingRoom', 'Living room coffee table', '45% 65%'),
      photo('living-1f', 'Living room 1', 'Sofa detail', 'livingRoom', 'Living room sofa detail', '55% 30%'),
      photo('living-1g', 'Living room 1', 'Wide view', 'livingRoom', 'Living room wide view', '40% 40%'),
    ],
  },
  {
    id: 'living-room-2',
    label: 'Living room 2',
    detail: 'Seating area · Coffee table · Ceiling fan',
    photos: [
      photo('living-2a', 'Living room 2', 'Seating area · Coffee table', 'livingRoom', 'Living room seating area', '35% 50%'),
      photo('living-2b', 'Living room 2', 'Ceiling fan · Lounge', 'livingRoom', 'Living room lounge corner', '75% 35%'),
      photo('living-2c', 'Living room 2', 'Side seating', 'livingRoom', 'Living room side seating', '25% 60%'),
      photo('living-2d', 'Living room 2', 'Window light', 'livingRoom', 'Living room window light', '50% 25%'),
      photo('living-2e', 'Living room 2', 'Evening setup', 'livingRoom', 'Living room evening setup', '65% 55%'),
    ],
  },
  {
    id: 'full-kitchen',
    label: 'Full kitchen',
    detail: 'Cookware · Refrigerator · Essentials',
    photos: [
      photo('kitchen-1a', 'Full kitchen', 'Cookware · Refrigerator', 'kitchen', 'Full kitchen'),
      photo('kitchen-1b', 'Full kitchen', 'Counter workspace', 'kitchen', 'Kitchen counter workspace', '40% 45%'),
      photo('kitchen-1c', 'Full kitchen', 'Appliances', 'kitchen', 'Kitchen appliances', '60% 50%'),
      photo('kitchen-1d', 'Full kitchen', 'Storage · Essentials', 'kitchen', 'Kitchen storage', '55% 35%'),
      photo('kitchen-1e', 'Full kitchen', 'Prep area', 'kitchen', 'Kitchen prep area', '30% 55%'),
    ],
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    detail: '1 double bed · Blackout curtains',
    photos: [
      photo('bedroom-1a', 'Bedroom', '1 double bed · Blackout curtains', 'bedroom', 'Bedroom with queen bed'),
      photo('bedroom-1b', 'Bedroom', 'Balcony access', 'bedroom', 'Bedroom balcony access', '35% 40%'),
      photo('bedroom-1c', 'Bedroom', 'Bedside setup', 'bedroom', 'Bedroom bedside', '70% 45%'),
      photo('bedroom-1d', 'Bedroom', 'Closet area', 'bedroom', 'Bedroom closet', '45% 60%'),
      photo('bedroom-1e', 'Bedroom', 'Morning light', 'bedroom', 'Bedroom morning light', '50% 30%'),
      photo('bedroom-1f', 'Bedroom', 'Restful corner', 'bedroom', 'Bedroom restful corner', '60% 65%'),
    ],
  },
  {
    id: 'full-bathroom',
    label: 'Full bathroom',
    detail: 'Walk-in shower · Hot water',
    photos: [
      photo('bathroom-1a', 'Full bathroom', 'Walk-in shower · Hot water', 'bathroom', 'Full bathroom with walk-in shower'),
      photo('bathroom-1b', 'Full bathroom', 'Vanity · Mirror', 'bathroom', 'Bathroom vanity', '55% 40%'),
      photo('bathroom-1c', 'Full bathroom', 'Shower detail', 'bathroom', 'Walk-in shower detail', '40% 55%'),
      photo('bathroom-1d', 'Full bathroom', 'Fresh towels', 'bathroom', 'Bathroom towels', '65% 50%'),
    ],
  },
  {
    id: 'gym',
    label: 'Gym',
    detail: 'Shared fitness area',
    photos: [
      photo('gym-1a', 'Gym', 'Shared fitness area', 'exterior', 'Shared fitness area entrance', '45% 45%'),
      photo('gym-1b', 'Gym', 'Equipment zone', 'exterior', 'Fitness equipment zone', '60% 35%'),
      photo('gym-1c', 'Gym', 'Workout space', 'livingRoom', 'Compact workout space', '80% 50%'),
    ],
  },
  {
    id: 'exterior',
    label: 'Exterior',
    detail: 'Shared garden · Building entry',
    photos: [
      photo('exterior-1a', 'Exterior', 'Shared garden · Building entry', 'exterior', 'Exterior path through the property garden'),
      photo('exterior-1b', 'Exterior', 'Garden path', 'exterior', 'Garden path', '35% 50%'),
      photo('exterior-1c', 'Exterior', 'Building facade', 'exterior', 'Building facade', '50% 35%'),
      photo('exterior-1d', 'Exterior', 'Entry walkway', 'exterior', 'Entry walkway', '65% 55%'),
      photo('exterior-1e', 'Exterior', 'Landscaping', 'exterior', 'Tropical landscaping', '40% 40%'),
    ],
  },
  {
    id: 'pool',
    label: 'Pool',
    detail: 'Shared outdoor area',
    photos: [
      photo('pool-1a', 'Pool', 'Shared outdoor area', 'terrace', 'Pool and outdoor lounge', '42% 48%'),
      photo('pool-1b', 'Pool', 'Loungers · Shade', 'terrace', 'Pool loungers', '55% 35%'),
      photo('pool-1c', 'Pool', 'Deck seating', 'terrace', 'Pool deck seating', '30% 60%'),
      photo('pool-1d', 'Pool', 'Evening poolside', 'exterior', 'Poolside exterior view', '50% 45%'),
    ],
  },
  {
    id: 'additional-photos',
    label: 'Additional photos',
    detail: 'Terrace · Garden view',
    photos: [
      photo('terrace-1a', 'Additional photos', 'Terrace · Garden view', 'terrace', 'Terrace lounge with tropical garden view'),
      photo('terrace-1b', 'Additional photos', 'Outdoor dining', 'terrace', 'Terrace outdoor dining', '60% 42%'),
      photo('terrace-1c', 'Additional photos', 'Garden outlook', 'terrace', 'Terrace garden outlook', '35% 55%'),
      photo('terrace-1d', 'Additional photos', 'Sunset corner', 'terrace', 'Terrace sunset corner', '48% 30%'),
    ],
  },
];

export const listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  location: 'Candolim, Goa, India',
  rating: '4.95',
  reviews: 19,
  price: '₹28,499',
  description: 'Plan your relaxing holiday in the heart of Candolim. This cozy one-bedroom stay has a private jacuzzi, high-speed WiFi, Smart TV, pet-friendly comfort, and easy access to beaches, cafés, restaurants, and nightlife.',
  guests: '3 guests',
  bedrooms: '1 bedroom',
  beds: '1 bed',
  bathrooms: '1 bathroom',
  host: { name: 'Mirashya Homes', years: '2 years hosting', initials: 'MH', responseRate: '100%' },
  features: [
    { icon: 'pool', title: 'Dive right in', description: 'This is one of the few places in the area with a pool.' },
    { icon: 'key', title: 'Self check-in', description: 'You can check in with the building staff.' },
    { icon: 'snowflake', title: 'Peace and quiet', description: 'Guests say this home is in a quiet area.' },
  ],
  heroPhotos,
  rooms,
  photoToRoom: {
    terrace: 'additional-photos',
    living: 'living-room-1',
    kitchen: 'full-kitchen',
    bedroom: 'bedroom',
    bathroom: 'full-bathroom',
  },
  ratingBreakdown: [
    { label: 'Cleanliness', value: 5.0 },
    { label: 'Accuracy', value: 4.9 },
    { label: 'Check-in', value: 4.9 },
    { label: 'Communication', value: 4.9 },
    { label: 'Location', value: 4.9 },
    { label: 'Value', value: 4.9 },
  ],
  reviewSnippets: [
    {
      initials: 'P',
      name: 'Priya',
      meta: 'March 2025 · 4 nights',
      text: 'The jacuzzi and terrace made this feel like a mini resort. Candolim beach was a short ride away and the apartment was spotless.',
    },
    {
      initials: 'J',
      name: 'James',
      meta: 'January 2025 · 3 nights',
      text: 'Great host communication and a calm neighborhood. Kitchen had everything we needed for longer stays.',
    },
  ],
  map: {
    lat: 15.5189,
    lng: 73.7622,
    label: 'Candolim',
  },
};

export const galleryPhotos = listing.rooms.flatMap((room) => room.photos);
