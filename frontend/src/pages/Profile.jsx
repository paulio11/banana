import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendAPI } from "../api/AxiosConfig";
import { formatDate } from "../utils/DateFormatting";
import Error404 from "./Error404";

const Profile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await backendAPI.get(`/profiles/${username}`);
        setProfileData(data);
      } catch (error) {
        if (error.status === 404) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    getProfileData();
  }, [username]);

  if (loading) {
    return;
  }

  if (error) {
    return <Error404 />;
  }

  return (
    <>
      <h2>{username}'s profile</h2>
      <img
        src={profileData.avatar}
        alt={`${username}'s avatar`}
        className="avatar"
      />
      <p>Member since: {formatDate(profileData.created)}</p>
      <h3>Bio:</h3>
      <p>{profileData.bio ? profileData.bio : "User has no bio."}</p>
    </>
  );
};

export default Profile;
