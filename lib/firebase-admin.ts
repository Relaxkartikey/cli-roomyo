import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    // Try to initialize with full credentials if available
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      // Fall back to minimal config for build time or when credentials aren't available
      admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        credential: admin.credential.applicationDefault()
      });
    }
  } catch (error) {
    // If both methods fail, initialize with just the project ID
    console.warn('Falling back to minimal Firebase Admin initialization');
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
  }
}

// Export the admin instances
export const adminAuth = admin.auth();
export const adminDb = admin.firestore(); 