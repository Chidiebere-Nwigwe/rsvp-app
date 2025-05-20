import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 

const useAuth = () => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Update user state when authentication state changes
      setLoading(false);  // Set loading to false once the auth check is complete
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
