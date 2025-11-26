import { useLocation, useParams } from "react-router-dom";

const HeadingHeader = () => {
  // const location = window.location.pathname;
  const location = useLocation();
  const { id } = useParams();

  const locationSplit =
    location.pathname.split("/").length > 3
      ? location.pathname.split("/")[3]
      : location.pathname.split("/")[2];
  if (
    location.pathname === `/Settings/TermsPrivacyPolicy` ||
    location.pathname === `/Settings/AboutMabrour` ||
    location.pathname === `/Settings/Faqs` ||
    location.pathname === "/Orders/Packages/Details"
  ) {
    return null;
  }
  return (
    <div className="service">
      <h3>{locationSplit.replace(/([a-z])([A-Z])/g, "$1 $2")}</h3>
    </div>
  );
};

export default HeadingHeader;
