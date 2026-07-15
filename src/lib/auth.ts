import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

export type VerdictumUser = { email: string; name: string; createdAt: number };

export function useAuthUser() {
  const [user, setUser] = useState<VerdictumUser | null>(() => getCurrentUser());
  useEffect(() => {
    return auth.onAuthStateChanged((fbUser: User | null) => {
      if (fbUser && fbUser.email) {
        setUser({
          email: fbUser.email,
          name: fbUser.displayName || "Unknown Judge",
          createdAt: fbUser.metadata.creationTime ? new Date(fbUser.metadata.creationTime).getTime() : Date.now()
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

export function getCurrentUser(): VerdictumUser | null {
  const user = auth.currentUser;
  if (!user || !user.email) return null;
  return {
    email: user.email,
    name: user.displayName || "Unknown Judge",
    createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now()
  };
}

export async function signIn(email: string, password: string): Promise<VerdictumUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (!user.email) throw new Error("No email found on user.");
  return {
    email: user.email,
    name: user.displayName || "Unknown Judge",
    createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now()
  };
}

export async function signUp(email: string, password: string, name: string): Promise<VerdictumUser> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  await updateProfile(user, { displayName: name });
  
  if (!user.email) throw new Error("No email found on user.");
  return {
    email: user.email,
    name,
    createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now()
  };
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function signInWithGoogle(): Promise<VerdictumUser> {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  if (!user.email) throw new Error("No email found on user.");
  return {
    email: user.email,
    name: user.displayName || "Unknown Judge",
    createdAt: user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : Date.now()
  };
}
