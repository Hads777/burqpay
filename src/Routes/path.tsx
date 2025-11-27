import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import NotFound from "../components/NotFound/NotFound";

import LayoutDashboard from "../Layout/LayoutDashboard";
import RoutetoDash from "../components/DashboardHeader/RoutetoDash";
import LandingDashboardPage from "../components/Dashboard/LandingDashboardPage";
import DashboardOnboarding from "../components/DashboardHeader/DashboardOnboarding";
import Service from "../components/Dashboard/Service";
import IncomingOutgoingFund from "../components/Dashboard/IncomingOutgoingFund";
import AllCustomers from "../components/Customer/AllCustomers";
import Login from "../components/Login/login";
import LayoutLogin from "../Layout/LayoutLogin";
import AllComplaints from "../components/Customer/AllComplaints";
import CustomerProfile from "../components/Customer/CustomerProfile";
import Role from "../components/UserAndRoleManagement/Role";
import AllRewards from "../components/Dashboard/AllRewards";
import DashboardGameCenter from "../components/DashboardHeader/DashboardGameCenter";

import FinancialLogs from "../components/System/Logs/FinancialLogs";
import DigittLogs from "../components/System/Logs/DigittLogs";
import SystemAudit from "../components/System/Logs/SystemAudit";
import ComplaintsType from "../components/Customer/ComplaintsType";
import DepartmentList from "../components/UserAndRoleManagement/DepartmentList";
import ComplaintSubType from "../components/Customer/ComplaintsSubType";
import VendorServices from "../components/System/CommissionSlabs/VendorServices";

import MobileTopup from "../components/Sales/MobileTopup";
import MobileBundle from "../components/Sales/MobileBundle";
import BusBooking from "../components/Sales/BusBooking";

import PrivateRoute from "./PrivateRoute";
import Vendor from "../components/System/CommissionSlabs/Vendor";
import AirBooking from "../components/Sales/AirBooking";
import Referral from "../components/Dashboard/Referral";
import Faq from "../components/Campaign/Faq";
import VendorCommission from "../components/System/CommissionSlabs/VendorCommission";
import VendorComissionSlab from "../components/System/CommissionSlabs/VendorCommissionSlab";
import IncomeProof from "../components/System/IncomeProof";
import DashboardProfile from "../components/DashboardHeader/DashboardProfile";
import CampaignList from "../components/Campaign/CampaignList";
import SignUp from "../components/Login/SignUp";
import Saudi from "../components/Customer/Saudi";
import NonSaudi from "../components/Customer/NonSaudi";
import ProfileSetting from "../components/Dashboard/ProfileSetting";
import Packages from "../components/UserAccountTypes/Packages";
import NewPackages from "../components/UserAccountTypes/AddNewPackage";
import Employees from "../components/UserAndRoleManagement/Employees";
import Permission from "../components/UserAndRoleManagement/Permission";
import TermsPrivacyPolicy from "../components/System/TermsPrivacyPolicy";
import AboutMubrour from "../components/System/AboutMubrour";
import Faqs from "../components/System/Faqs";
import Companies from "../components/UserAccountTypes/Companies";
import AddNewCompany from "../components/UserAccountTypes/ViewCompanyList";
import ViewCompanyList from "../components/UserAccountTypes/ViewCompanyList";
import TopUp from "../components/Dashboard/TopUp";
import WalletTopUp from "../components/System/Logs/WalletTopUp";
import Flights from "../components/Sales/Flights";
import RedirectToAppropriatePage from "./RedirectToAppropriatePage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import PermissionRoute from "./PermissionRoute";
import ModulePermissionRoute from "./PermissionRoute";
import Visitors from "../components/Customer/Visitors";
import FlightDetails from "../components/Customer/FlightDetails";
import Ecommerce from "../components/Sales/Ecommerce";
import OrderPackages from "../components/Sales/OrderPackages";
import EcommerceDetails from "../components/Customer/EcommerceDetails";
import EditPackage from "../components/UserAccountTypes/EditPackage";
import PackageDetails from "../components/UserAccountTypes/PackageDetails";
import ActivityLogs from "../components/System/AcitivityLogs";
import OrderPackagesDetails from "../components/Customer/OrderPackagesDetails";
import PublicPrivacyPage from "../components/System/PublicPrivacyPage";
import LayoutPrivacy from "../Layout/PrivacyLayout";
import CustomerReports from "../components/Reports/CustomerReports";
import ChangePassword from "../components/Login/ChangePassword";
import OrderReports from "../components/Reports/OrderReports";
import ComplaintsReports from "../components/Reports/ComplaintsReports";
import PackagesReports from "../components/Reports/PackagesReports";
import WalletTopUpReports from "../components/Reports/WalletTopUpReports";
import SpendingReports from "../components/Reports/SpendingReports";
import PackagesList from "../components/Transactions/PackagesList";
import Vendors from "../components/Transactions/Vendors";
import CampaignSystem from "../components/System/CampaignSystem";
import CustomerForm from "../components/Customer/CustomerForm";
import CustomerInfo from "../components/Customer/CustomerInfo";
import Management from "../components/Management/Management";
import LedgerList from "../components/Ledger/LedgerList";
import Epos from "../components/Epos/Epos";
export const router = createBrowserRouter([
  {
    path: "/privacy-policy",
    element: <LayoutPrivacy />,
    children: [
      { path: "", element: <PublicPrivacyPage /> },
      { path: "*", element: <RedirectToAppropriatePage /> },
    
    ],
  },
  {
    path: "/",
    element: <LayoutLogin />,
    children: [
      { path: "", element: <RedirectToAppropriatePage /> },
      { path: "*", element: <RedirectToAppropriatePage /> },
      { path: "/login", element: <Login /> },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <LayoutDashboard />,
        children: [
          { path: "", element: <RoutetoDash /> },
          { path: "Dashboard", element: <LandingDashboardPage /> },
          { path: "Dashboard/ProfileSetting", element: <ProfileSetting /> },
          { path: "Dashboard/Onboarding", element: <DashboardOnboarding /> },
          { path: "Dashboard/Services", element: <Service /> },
          { path: "Dashboard/GameCenter", element: <DashboardGameCenter /> },
          {
            path: "Dashboard/IncomingOutgoingFunds",
            element: <IncomingOutgoingFund />,
          },
          { path: "Profile", element: <DashboardProfile /> },

          { path: "*", element: <NotFound /> },
        ],
      },

      {
        path: "",
        element: <Layout />,
        children: [
          { path: "Booking/Flights", element: <Flights /> },
          { path: "Booking/Flights/FlightDetails", element: <FlightDetails /> },
          { path: "Orders/Ecommerce", element: <Ecommerce /> },
          { path: "Orders/Ecommerce/Details", element: <EcommerceDetails /> },
          { path: "/Settings/ActivityLogs", element: <ActivityLogs /> },
          { path: "Orders/Packages", element: <OrderPackages /> },
          { path: "Orders/Packages/Details", element: <OrderPackagesDetails /> },
          { path: "sales/MobileTopup", element: <MobileTopup /> },
          { path: "sales/BusBooking", element: <BusBooking /> },
          { path: "sales/MobileBundle", element: <MobileBundle /> },

          {
            path: "System/CommissionSlabs/VendorCommissionType",
            element: <VendorComissionSlab />,
          },
          {
            path: `sales/airbooking`,
            element: <AirBooking />,
          },
          {
            path: "Customers/AllCustomers",
            element: (
                <AllCustomers />
            ),
          },
            {
              path: "/WithdrawalManagement/ManageBanks",
              element: (
                  <Management />
              ),
            },
            {
              path: "/Ledger/LedgerList",
              element: (
                  <LedgerList />
              ),
            },
             {
              path: "Epos/AllEpos",
              element: (
                  <Epos />
              ),
            },
          {
            path: "Customers/AllCustomers/Create",
            element: <CustomerForm />,
          },
          {
            path: "Customers/AllCustomers/Edit/:id",
            element: <CustomerForm />,
          },
          {
            path: "Customers/AllCustomers/Details/:id",
            element: <CustomerInfo />,
          },
          { path: "Packages/AllPackages", element: <Packages /> },
          { path: "Packages/AddNewPackage", element: <NewPackages /> },
          {
            path: "Packages/AddNewPackage/EditPackage/:id",
            element: <EditPackage />,
          },
          { path: "Packages/View/PackageDetails/:id", element: <PackageDetails/> },
          { path: "Packages/Companies", element: <Companies /> },
          { path: "Packages/CompanyView", element: <ViewCompanyList /> },
          { path: "GameCenter/AllRewards", element: <AllRewards /> },
          { path: "GameCenter/Referral", element: <Referral /> },
          { path: "Campaign/Faqs", element: <Faq /> },

          { path: "Customers/Citizens", element: <Saudi /> },
          { path: "Customers/Residents", element: <NonSaudi /> },
          { path: "Customers/Visitors", element: <Visitors /> },
          {
            path: "Customers/Visitors/CustomerDetails/:id",
            element: <CustomerProfile />,
          },
          { path: "UserRoleManagement/Employees", element: <Employees /> },
          { path: "UserRoleManagement/Permission", element: <Permission /> },
          {
            path: "UserRoleManagement/Departments",
            element: <DepartmentList />,
          },
          { path: "UserRoleManagement/Role", element: <Role /> },
          // { path: "UserRoleManagement/AddRole", element: <AddRole /> },
          { path: "Customers/AllComplaints", element: <AllComplaints /> },

          { path: "Customers/ComplaintsType", element: <ComplaintsType /> },
          { path: "Customers/ComplaintSubType", element: <ComplaintSubType /> },
          { path: "Wallet/TopUp", element: <WalletTopUp /> },
          { path: "System/Logs/FinancialLogs", element: <FinancialLogs /> },
          { path: "System/Logs/DigittLogs", element: <DigittLogs /> },
          { path: "System/Logs/SystemAudit", element: <SystemAudit /> },
          {
            path: "System/CommissionSlabs/VendorServices",
            element: <VendorServices />,
          },
          {
            path: "System/CommissionSlabs/VendorServices",
            element: <VendorServices />,
          },
          {
            path: "/System/CommissionSlabs/VendorCommission",
            element: <VendorCommission />,
          },
          { path: "System/IncomeProof", element: <IncomeProof /> },
          { path: "System/CommissionSlabs/Vendor", element: <Vendor /> },
          {
            path: "Settings/TermsPrivacyPolicy",
            element: <TermsPrivacyPolicy />,
          },
          { path: "Settings/AboutMabrour", element: <AboutMubrour /> },
          { path: "Settings/Faqs", element: <Faqs /> },
          { path: "Campaign/CampaignList", element: <CampaignList /> },
          { path: "Reports/CustomerReports", element: <CustomerReports /> },
          { path: "Reports/OrderReports", element: <OrderReports /> },
          { path: "Reports/ComplaintReports", element: <ComplaintsReports /> },
          { path: "Reports/PackagesReports", element: <PackagesReports /> },
          { path: "Reports/WalletTopUpReports", element: <WalletTopUpReports /> },
          { path: "Reports/SpendingReports", element: <SpendingReports /> },
          { path: "Transactions/PackagesList", element: <PackagesList /> },
          { path: "Transactions/Vendors", element: <Vendors /> },
          { path: "Settings/CampaignSystem", element: <CampaignSystem /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);
