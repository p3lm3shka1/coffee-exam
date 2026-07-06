import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="profile-page">
      <div className="profile-page__wrapper">
        <h1 className="profile-page__title">
          This is your profile, {user?.name}
        </h1>
        <div className="profile-page__content">
          <ul className="profile-page__content__list">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
