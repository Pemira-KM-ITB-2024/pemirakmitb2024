/* // filepath: /C:/Users/alvin/Documents/Alvin/projects/pemirakmitb2024/src/components/Profile.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchMicrosoftGraphData } from "../utils/microsoftGraph";

export default function Profile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetchMicrosoftGraphData(session.accessToken)
        .then((data) => setProfile(data))
        .catch((error) => console.error(error));
    }
  }, [session]);

  if (!session) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>Name: {profile.displayName}</p>
          <p>Email: {profile.mail}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
} */