import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import queryString from "query-string";
import fakeAuth from "fake-auth";

import { useUser, createUser, updateUser } from "./db";
import { history } from "./router";
import PageLoader from "./../components/PageLoader";
import { getFriendlyPlanId } from "./prices";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import CONFIG from '../config';

// Whether to merge extra user data from database into `auth.user`
const MERGE_DB_USER = true;

const api = axios.create({
  baseURL: CONFIG.baseUrl
})
// Create a `useAuth` hook and `AuthProvider` that enables
// any component to subscribe to auth and re-render when it changes.
const authContext = createContext();
export const useAuth = () => useContext(authContext);
// This should wrap the app in `src/pages/_app.js`
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that creates the `auth` object and handles state
// This is called from `AuthProvider` above (extracted out for readability)
function useAuthProvider() {
  // Store auth user in state
  // `user` will be object, `null` (loading) or `false` (logged out)
  const [user, setUser] = useState(null);

  // Merge extra user data from the database
  // This means extra user data (such as payment plan) is available as part
  // of `auth.user` and doesn't need to be fetched separately. Convenient!
  let finalUser = useMergeExtraData(user, { enabled: MERGE_DB_USER });

  // Add custom fields and formatting to the `user` object
  finalUser = useFormatUser(finalUser);

  // Handle response from auth functions
  const handleAuth = async (user) => {
    const token = user.headers.authorization;
    localStorage.setItem('auth_token', token.split(" ")[1])
    localStorage.setItem('email', user.data.data.attributes.email)
    setUser(user);
    return user;
  };

  const signup = (email, password) => {
    return api.post(`/signup`, {
      user: {
        email, password
      }
    }).then(response => handleAuth(response))
  };

  const signin = (email, password) => {
    return api.post(`/login`, {
      user: {
        email, password
      }
    }).then(response => handleAuth(response))
  };

  const signinWithProvider = (name) => {
    return fakeAuth
      .signinWithProvider(name)
      .then((response) => handleAuth(response.user));
  };

  const signout = () => {
    localStorage.clear();
    setUser(false);
  };

  const sendPasswordResetEmail = (email) => {
    return fakeAuth.sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (password, code) => {
    // [INTEGRATING AN AUTH SERVICE]: If not passing in "code" as the second
    // arg above then make sure getFromQueryString() below has the correct
    // url parameter name (it might not be "code").

    // Get code from query string object
    const resetCode = code || getFromQueryString("code");
    return fakeAuth.confirmPasswordReset(password, resetCode);
  };

  const updatePassword = (password) => {
    return fakeAuth.updatePassword(password);
  };

  // Update auth user and persist data to database
  // Call this function instead of multiple auth/db update functions
  const updateProfile = async (data) => {
    const { email, name, picture } = data;

    // Update auth email
    if (email) {
      await fakeAuth.updateEmail(email);
    }

    // Update built-in auth profile fields
    // These fields are renamed in `useFormatUser`, so when updating we
    // need to make sure to use their original names (`name`, `picture`, etc)
    if (name || picture) {
      let fields = {};
      if (name) fields.name = name;
      if (picture) fields.picture = picture;
      await fakeAuth.updateProfile(fields);
    }

    // Persist all data to the database
    await updateUser(user.uid, data);

    // Update user in state
    const currentUser = await fakeAuth.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    console.log('Start application');

    const isAuth = localStorage.getItem('auth_token')

    if (isAuth) {
      setUser(true)
    } else {
      setUser(false)
    }
    
    // Unsubscribe on cleanup
    // return () => unsubscribe();
  }, []);

  return {
    user: finalUser,
    signup,
    signin,
    signinWithProvider,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updatePassword,
    updateProfile,
  };
}

function useFormatUser(user) {
  // Memoize so returned object has a stable identity
  return useMemo(() => {
    // Return if auth user is `null` (loading) or `false` (not authenticated)
    if (!user) return user;

    // Create an array of user's auth providers by id, such as ["password", "google", etc]
    // Components can read this to prompt user to re-auth with the correct provider
    const providers = [user.provider];

    return {
      // Include full auth user data
      ...user,

      // User's auth providers
      providers: providers,
      // Add `planId` (starter, pro, etc) if we have a `stripePriceId`
      ...(user.stripePriceId && {
        planId: getFriendlyPlanId(user.stripePriceId),
      }),
      // Add `planIsActive: true` if subscription status is active or trialing
      planIsActive: ["active", "trialing"].includes(
        user.stripe_status
      ),
    };
  }, [user]);
}

function useMergeExtraData(user, { enabled }) {
  // Get extra user data from database
  const { data, status, error } = useUser(enabled && user && user.uid);

  // Memoize so returned object has a stable identity
  return useMemo(() => {
    // If disabled or no auth user (yet) then just return
    if (!enabled || !user) return user;

    switch (status) {
      case "success":
        // If successful, but `data` is `null`, that means user just signed up and the `createUser`
        // function hasn't populated the db yet. Return `null` to indicate auth is still loading.
        // The above call to `useUser` will re-render things once the data comes in.
        if (data === null) return null;
        // Return auth `user` merged with extra user `data`
        return { ...user, ...data };
      case "error":
        // Uh oh.. Let's at least show a helpful error.
        throw new Error(`
          Error: ${error.message}
          This happened while attempting to fetch extra user data from the database
          to include with the authenticated user. Make sure the database is setup or
          disable merging extra user data by setting MERGE_DB_USER to false.
        `);
      default:
        // We have an `idle` or `loading` status so return `null`
        // to indicate that auth is still loading.
        return null;
    }
  }, [user, enabled, data, status, error]);
}

// A Higher Order Component for requiring authentication
export const requireAuth = (Component) => {
  return (props) => {
    // Get authenticated user
    const auth = useAuth();

    useEffect(() => {
      // Redirect if not signed in
      if (auth.user === false) {
        history.replace("/auth/signin");
      }
    }, [auth]);

    // Show loading indicator
    // We're either loading (user is `null`) or about to redirect from above `useEffect` (user is `false`)
    if (!auth.user) {
      return <PageLoader />;
    }

    // Render component now that we have user
    return <Component {...props} />;
  };
};

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
