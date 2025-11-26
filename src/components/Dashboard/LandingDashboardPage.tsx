import React, { useState } from "react";
import icon1 from "../../assets/images/icon-1.png";
import icon2 from "../../assets/images/icon-2.png";
import icon3 from "../../assets/images/icon-3.png";
import { Images } from "../Config/Images";


const LandingDashboardPage: React.FC = () => {
  const [notificationTab, setNotificationTab] = useState<"all" | "new">("all");

  const allNotifications = [
    {
      id: 1,
      type: "success",
      title: "Wallet Top-up",
      text: "Amount : PKR 6,500.00  10-Nov-2023",
      time: "Now",
    },
    {
      id: 2,
      type: "warning",
      title: "System Under Maintenance",
      text: "Currently the system is under maintenance 10-Nov-2023",
      time: "6:09 pm",
    },
    {
      id: 3,
      type: "warning",
      title: "System Under Maintenance",
      text: "Currently the system is under maintenance 10-Nov-2023",
      time: "6:09 pm",
    },
  ];

  const newNotifications = allNotifications.slice(0, 1);
  const visibleNotifications =
    notificationTab === "all" ? allNotifications : newNotifications;

  // Static funds data for bar chart (values are in SAR)
  const fundsData = [
    { day: "Mon", received: 900000, transferred: 880000 },
    { day: "Tue", received: 1000000, transferred: 950000 },
    { day: "Wed", received: 900000, transferred: 880000 },
    { day: "Thu", received: 1000000, transferred: 950000 },
    { day: "Fri", received: 1000000, transferred: 950000 },
    { day: "Sat", received: 800000, transferred: 800000 },
    { day: "Sun", received: 800000, transferred: 800000 },
  ];

  const maxFundsValue = Math.max(
    ...fundsData.flatMap((d) => [d.received, d.transferred])
  );

  return (
    <div className="bp-dashboard">
      {/* Top stat cards */}
      <div className="bp-overview-grid">
        {/* Collection Balance */}
        <div className="bp-overview-card">
          <div className="bp-overview-card-header bp-overview-card-header--collection" style={{height:"63px"}}>
            <span className="bp-overview-title">Collection Balance</span>
            <span className="bp-overview-icon"><img src={Images.icon1} alt="" /></span>
          </div>
          <div className="bp-overview-card-body">
            <div className="bp-overview-value">SAR 201</div>
          </div>
        </div>

        {/* Collection to Wallet */}
        <div className="bp-overview-card">
          <div className="bp-overview-card-header bp-overview-card-header--wallet" style={{height:"63px"}}>
            <span className="bp-overview-title">Collection to Wallet</span>
              <span className="bp-overview-icon"><img src={Images.icon2} alt="" /></span>
          </div>
          <div className="bp-overview-card-body">
            <div className="d-flex justify-content-start gap-5 bp-overview-meta-row">
              <div>
                <div className="bp-overview-meta-label">Completed</div>
                <div className="bp-overview-value-sm">SAR 201</div>
              </div>
              <div>
                <div className="bp-overview-meta-label">Pending</div>
                <div className="bp-overview-value-sm">SAR 0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bp-overview-card">
          <div className="bp-overview-card-header bp-overview-card-header--invoices" style={{height:"63px"}}>
            <span className="bp-overview-title">Invoices
              <span className="bp-overview-count" style={{display:"block",marginTop:"5px"}}>3</span>
            </span>
            
             <span className="bp-overview-icon"><img src={Images.icon3} alt="" /></span>
          </div>
          <div className="bp-overview-card-body">
            <div className="bp-overview-meta-grid">
              <div>
                <div className="bp-overview-meta-label">Cards</div>
                <div className="bp-overview-value-sm">740</div>
              </div>
              <div>
                <div className="bp-overview-meta-label">Direct Bank</div>
                <div className="bp-overview-value-sm">40</div>
              </div>
              <div>
                <div className="bp-overview-meta-label">Wallet</div>
                <div className="bp-overview-value-sm">30</div>
              </div>
              <div>
                <div className="bp-overview-meta-label">I-Bill</div>
                <div className="bp-overview-value-sm">40</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + notifications */}
      <div className="bp-dashboard-row">
        <div className="bp-card bp-dashboard-chart">
          <div className="bp-card-header">
            <div>
              <div className="bp-card-title">Funds</div>
              <div className="bp-card-subtitle">Received vs Transferred</div>
            </div>
            <div className="bp-card-filters">
              <span className="bp-chip">2024</span>
              <span className="bp-chip bp-chip-outline">Week</span>
            </div>
          </div>

          {/* Simple static bar chart to match design */}
          <div className="bp-chart">
            <div className="bp-chart-inner">
              <div className="bp-chart-bars">
                {fundsData.map((item) => (
                  <div key={item.day} className="bp-chart-bar-group">
                    <div className="bp-chart-bar-pair">
                      <div
                        className="bp-chart-bar bp-chart-bar--received"
                        style={{
                          height: `${(item.received / maxFundsValue) * 90}%`,
                        }}
                      />
                      <div
                        className="bp-chart-bar bp-chart-bar--transferred"
                        style={{
                          height: `${(item.transferred / maxFundsValue) * 90}%`,
                        }}
                      />
                    </div>
                    <div className="bp-chart-x-label">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bp-chart-legend">
            <span className="bp-legend-dot bp-legend-dot--red" /> Received
            <span className="bp-legend-dot bp-legend-dot--green ms-4" />{" "}
            Transferred
          </div>
        </div>

        <div className="bp-card bp-dashboard-notifications">
          <div className="bp-card-header">
            <div className="bp-card-title">Notifications</div>
            <div className="bp-tabs-mini">
              <button
                className={
                  "bp-tab-mini" +
                  (notificationTab === "all" ? " bp-tab-mini--active" : "")
                }
                onClick={() => setNotificationTab("all")}
              >
                All
              </button>
              <button
                className={
                  "bp-tab-mini" +
                  (notificationTab === "new" ? " bp-tab-mini--active" : "")
                }
                onClick={() => setNotificationTab("new")}
              >
                New
              </button>
            </div>
          </div>

          <div className="bp-notification-list">
            {visibleNotifications.map((item) => (
              <div
                key={item.id}
                className={`bp-notification-item bp-notification-item--${item.type}`}
              >
                <div className="bp-notification-avatar">CS</div>
                <div className="bp-notification-content">
                  <div className="bp-notification-title">{item.title}</div>
                  <div className="bp-notification-text">{item.text}</div>
                </div>
                <div className="bp-notification-meta">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bp-card bp-dashboard-table">
        <div className="bp-card-header">
          <div className="bp-card-title">Transaction History</div>
        </div>
        <table className="bp-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Card</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
              <tr key={index}>
                <td>1755246645</td>
                <td className="bp-link">VISA</td>
                <td>COLLECTION_HYPERPAY_DEPOSIT</td>
                <td>SAR 51</td>
                <td>Aug 15 2025 01:30 PM</td>
                <td>
                  <span className="bp-badge-status">Status</span>
                </td>
                <td>
                  <button className="bp-btn-dropdown">Select ▾</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingDashboardPage;
