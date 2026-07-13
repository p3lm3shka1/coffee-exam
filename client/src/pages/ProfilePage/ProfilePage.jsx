import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineHome,
} from "react-icons/hi";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getMyOrders } from "../../api/orders";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const token = user?.token || null;
  const [activeTab, setActiveTab] = useState("account");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const tabs = useMemo(
    () => [
      { key: "account", label: t("profile.profile_information") },
      { key: "orders", label: t("profile.order_history") },
      { key: "settings", label: t("profile.settings") },
    ],
    [t],
  );

  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await getMyOrders(token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(t("profile.failed_to_load_orders"), err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [token, t]);

  const lastOrder = orders.length ? orders[orders.length - 1] : null;
  const shipping = lastOrder?.shippingAddress || {};
  const profileAddress = [
    shipping.country,
    shipping.city,
    shipping.address,
    shipping.zip,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="profile-page">
      <div className="profile-page__wrapper">
        <h1 className="profile-page__title">{t("profile.title")}</h1>
        <p className="profile-page__subtitle">{t("profile.subtitle")}</p>

        <div className="profile-page__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`profile-page__tabs__item ${
                activeTab === tab.key ? "is-active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="profile-page__panel">
          {activeTab === "account" && (
            <article className="profile-page__card">
              <h2 className="profile-page__card-title">
                {t("profile.profile_information")}
              </h2>

              <div className="profile-page__info-list">
                <div className="profile-page__info-item">
                  <HiOutlineUser size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">
                      {t("profile.name")}
                    </span>
                    <p className="profile-page__info-value">
                      {user?.name || t("common.not_set")}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlineMail size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">
                      {t("profile.email")}
                    </span>
                    <p className="profile-page__info-value">
                      {user?.email || t("common.not_set")}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlineHome size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">
                      {t("profile.address")}
                    </span>
                    <p className="profile-page__info-value">
                      {profileAddress || t("common.not_set")}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlinePhone size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">
                      {t("profile.phone")}
                    </span>
                    <p className="profile-page__info-value">
                      {user?.phone || shipping?.phone || t("common.not_set")}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {activeTab === "orders" && (
            <article className="profile-page__card">
              <h2 className="profile-page__card-title">
                {t("profile.order_history")}
              </h2>

              {loadingOrders ? (
                <p className="profile-page__empty-title">
                  {t("profile.loading_orders")}
                </p>
              ) : orders.length === 0 ? (
                <div className="profile-page__empty">
                  <p className="profile-page__empty-title">
                    {t("profile.no_purchases")}
                  </p>
                  <span className="profile-page__empty-text">
                    {t("profile.future_orders")}
                  </span>
                </div>
              ) : (
                <div className="profile-page__orders">
                  {orders.map((order) => (
                    <div className="profile-page__order-item" key={order._id}>
                      <div>
                        <strong>{t("profile.order")}</strong> #
                        {order._id.slice(-6).toUpperCase()}
                      </div>
                      <div>
                        <strong>{t("profile.date")}</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>{t("profile.status")}</strong>{" "}
                        {order.status || t("profile.pending")}
                      </div>
                      <div>
                        <strong>{t("common.total")}:</strong> $
                        {Number(order.totalPrice || 0).toFixed(2)}
                      </div>
                      <div>
                        <strong>{t("profile.items")}</strong>{" "}
                        {order.orderItems?.length || 0}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}

          {activeTab === "settings" && (
            <article className="profile-page__card">
              <h2 className="profile-page__card-title">
                {t("profile.settings")}
              </h2>
              <ul className="profile-page__settings-list">
                <li className="profile-page__settings-item">
                  {t("profile.change_password")}
                </li>
                <li className="profile-page__settings-item">
                  {t("profile.manage_addresses")}
                </li>
                <li className="profile-page__settings-item">
                  {t("profile.newsletter_preferences")}
                </li>
              </ul>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
