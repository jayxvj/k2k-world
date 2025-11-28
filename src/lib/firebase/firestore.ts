import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from './config';
import { Destination, CustomRequest, Contact } from '../types';

// Destinations
export async function getDestinations(featuredOnly: boolean = false) {
  try {
    const destinationsRef = collection(db, 'destinations');
    let q = query(destinationsRef, orderBy('createdAt', 'desc'));
    
    if (featuredOnly) {
      q = query(destinationsRef, where('featured', '==', true), orderBy('createdAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination));
  } catch (error) {
    console.error('Error getting destinations:', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    const destinationsRef = collection(db, 'destinations');
    const q = query(destinationsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Destination;
  } catch (error) {
    console.error('Error getting destination:', error);
    return null;
  }
}

export async function getDestinationById(id: string) {
  try {
    const docRef = doc(db, 'destinations', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return { id: docSnap.id, ...docSnap.data() } as Destination;
  } catch (error) {
    console.error('Error getting destination:', error);
    return null;
  }
}

export async function createDestination(data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, 'destinations'), {
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating destination:', error);
    throw error;
  }
}

export async function updateDestination(id: string, data: Partial<Destination>) {
  try {
    const docRef = doc(db, 'destinations', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
}

export async function deleteDestination(id: string) {
  try {
    await deleteDoc(doc(db, 'destinations', id));
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
}

// Custom Requests
export async function getCustomRequests() {
  try {
    const requestsRef = collection(db, 'customRequests');
    const q = query(requestsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomRequest));
  } catch (error) {
    console.error('Error getting custom requests:', error);
    return [];
  }
}

export async function createCustomRequest(data: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>) {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, 'customRequests'), {
      ...data,
      status: 'new',
      createdAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating custom request:', error);
    throw error;
  }
}

export async function updateCustomRequestStatus(id: string, status: CustomRequest['status']) {
  try {
    const docRef = doc(db, 'customRequests', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating custom request:', error);
    throw error;
  }
}

// Contacts
export async function getContacts() {
  try {
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
  } catch (error) {
    console.error('Error getting contacts:', error);
    return [];
  }
}

export async function createContact(data: Omit<Contact, 'id' | 'createdAt' | 'status'>) {
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      status: 'new',
      createdAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

export async function updateContactStatus(id: string, status: Contact['status']) {
  try {
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
}
