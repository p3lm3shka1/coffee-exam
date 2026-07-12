import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineHome,
} from "react-icons/hi";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/orders";

import "./ProfilePage.scss";

const tabs = [
  { key: "account", label: "Account Information" },
  { key: "orders", label: "Order History" },
  { key: "settings", label: "Settings" },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const token = user?.token || null;
  const [activeTab, setActiveTab] = useState("account");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!token) return;

    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await getMyOrders(token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load orders:", err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [token]);

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
        <h1 className="profile-page__title">My Profile</h1>
        <p className="profile-page__subtitle">
          Manage your account, check orders, and update settings
        </p>

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
              <h2 className="profile-page__card-title">Account information</h2>

              <div className="profile-page__info-list">
                <div className="profile-page__info-item">
                  <HiOutlineUser size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">Name</span>
                    <p className="profile-page__info-value">
                      {user?.name || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlineMail size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">Email</span>
                    <p className="profile-page__info-value">
                      {user?.email || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlineHome size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">Address</span>
                    <p className="profile-page__info-value">
                      {profileAddress || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="profile-page__info-item">
                  <HiOutlinePhone size={20} />
                  <div className="profile-page__info-text">
                    <span className="profile-page__info-label">Phone</span>
                    <p className="profile-page__info-value">
                      {user?.phone || shipping?.phone || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {activeTab === "orders" && (
            <article className="profile-page__card">
              <h2 className="profile-page__card-title">Order history</h2>

              {loadingOrders ? (
                <p className="profile-page__empty-title">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="profile-page__empty">
                  <p className="profile-page__empty-title">
                    No purchases for now.
                  </p>
                  <span className="profile-page__empty-text">
                    Your future orders will appear here.
                  </span>
                </div>
              ) : (
                <div className="profile-page__orders">
                  {orders.map((order) => (
                    <div className="profile-page__order-item" key={order._id}>
                      <div>
                        <strong>Order:</strong> #
                        {order._id.slice(-6).toUpperCase()}
                      </div>
                      <div>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Status:</strong> {order.status || "pending"}
                      </div>
                      <div>
                        <strong>Total:</strong> $
                        {Number(order.totalPrice || 0).toFixed(2)}
                      </div>
                      <div>
                        <strong>Items:</strong> {order.orderItems?.length || 0}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )}

          {activeTab === "settings" && (
            <article className="profile-page__card">
              <h2 className="profile-page__card-title">Settings</h2>
              <ul className="profile-page__settings-list">
                <li className="profile-page__settings-item">
                  Change password (coming soon)
                </li>
                <li className="profile-page__settings-item">
                  Manage addresses (coming soon)
                </li>
                <li className="profile-page__settings-item">
                  Newsletter preferences (coming soon)
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
