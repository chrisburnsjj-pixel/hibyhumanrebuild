import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { storage, db } from './config';
import { MediaAsset } from '../types/cms';

export async function uploadMediaImage(file: File, folder = 'cms-uploads'): Promise<MediaAsset> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${timestamp}_${safeName}`;
  const storageRef = ref(storage, path);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    const asset: MediaAsset = {
      id: '',
      fileName: file.name,
      downloadUrl,
      storagePath: path,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
    };

    // Record in Firestore media collection
    try {
      const docRef = await addDoc(collection(db, 'media'), asset);
      asset.id = docRef.id;
    } catch (dbErr) {
      console.warn('Could not record in media collection:', dbErr);
      asset.id = `${timestamp}`;
    }

    return asset;
  } catch (storageError) {
    console.warn('Firebase Storage upload error, generating local object URL for preview:', storageError);
    // Safe fallback: Convert file to Base64 data URL so admin can still use it immediately
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Url = reader.result as string;
        const fallbackAsset: MediaAsset = {
          id: `fallback-${timestamp}`,
          fileName: file.name,
          downloadUrl: base64Url,
          size: file.size,
          mimeType: file.type,
          uploadedAt: new Date().toISOString(),
        };
        try {
          const docRef = await addDoc(collection(db, 'media'), {
            ...fallbackAsset,
            downloadUrl: base64Url.length > 500000 ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' : base64Url
          });
          fallbackAsset.id = docRef.id;
        } catch (_) {}
        resolve(fallbackAsset);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  try {
    const colRef = collection(db, 'media');
    const q = query(colRef, orderBy('uploadedAt', 'desc'));
    const snap = await getDocs(q);
    const items: MediaAsset[] = [];
    snap.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as MediaAsset);
    });
    return items;
  } catch (err) {
    console.warn('Could not fetch media list from Firestore:', err);
    return [];
  }
}

export async function deleteMediaAsset(asset: MediaAsset): Promise<void> {
  if (asset.storagePath) {
    try {
      const storageRef = ref(storage, asset.storagePath);
      await deleteObject(storageRef);
    } catch (err) {
      console.warn('Could not delete from storage:', err);
    }
  }
  if (asset.id) {
    try {
      await deleteDoc(doc(db, 'media', asset.id));
    } catch (err) {
      console.warn('Could not delete media doc:', err);
    }
  }
}
