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
import PaymentReports from "../components/Reports/PaymentReport";
import ChangePassword from "../components/Login/ChangePassword";
// import OrderReports from "../components/Reports/OrderReports";
// import ComplaintsReports from "../components/Reports/ComplaintsReports";
// import PackagesReports from "../components/Reports/PackagesReports";
// import WalletTopUpReports from "../components/Reports/WalletTopUpReports";
// import SpendingReports from "../components/Reports/SpendingReports";
import PackagesList from "../components/Transactions/PackagesList";
import Vendors from "../components/Transactions/Vendors";
import CampaignSystem from "../components/System/CampaignSystem";
import CustomerForm from "../components/Customer/CustomerForm";
import CustomerInfo from "../components/Customer/CustomerInfo";
import Management from "../components/Management/Management";
import AllInvoices from "../components/Invoices/AllInvoices";
import CreateInvoice from "../components/Invoices/CreateInvoice";
import LedgerList from "../components/Ledger/LedgerList";
import Epos from "../components/Epos/Epos";
import InvoiceDetail from "../components/Invoices/InvoiceDetail";
import InvoiceReports from "../components/Reports/InvoiceReport";
import WithdrawalReport from "../components/Reports/WithdrawalReport";
import PaymentGateway from "../components/System/PaymentGateway";
import CheckoutSettings from "../components/System/CheckoutSettings";
import TemplateManagement from "../components/TemplateMangement/TemplateManagement";
import BulkDisbursement from "../components/Disbursements/BulkDisbursement";
import AllEmployees from "../components/ManageEmployees/AllEmployees";
import CreateEditEmployee from "../components/ManageEmployees/CreateEditEmployee";
import IbftLedger from "../components/TransactionHistory/IbftLedger";
import BeneficiaryList from "../components/Disbursements/BeneficiaryList";
import InstantTransfer from "../components/Disbursements/InstantTransfer";
import LayoutOnboarding from "../Layout/LayoutOnboarding";
import PersonalInformation from "../components/OnboardingComponents/PersonalInformation";
import TermsConditions from "../components/OnboardingComponents/TermsConditions";
import Verification from "../components/OnboardingComponents/Verification";
import UploadDocument from "../components/OnboardingComponents/UploadDocument";
import BankInfo from "../components/OnboardingComponents/BankInfo";
import SetPassword from "../components/OnboardingComponents/SetPassword";
import Finish from "../components/OnboardingComponents/Finish";
import BusinessInformation from "../components/BusinessOnboardingComponents/BusinessInformation";
import BusinessTermsConditions from "../components/BusinessOnboardingComponents/TermsConditions";
import OwnerInformation from "../components/BusinessOnboardingComponents/OwnerInformation";
import PartnerInformation from "../components/BusinessOnboardingComponents/PartnerInformation";
import BusinessBankInfo from "../components/BusinessOnboardingComponents/BankInfo";
import BusinessSetPassword from "../components/BusinessOnboardingComponents/SetPassword";
import BusinessFinish from "../components/BusinessOnboardingComponents/Finish";
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
          { path: "Wallet/Dashboard", element: <LandingDashboardPage /> },
          {
            path: "Dashboard/IncomingOutgoingFunds",
            element: <IncomingOutgoingFund />,
          },
          { path: "Profile", element: <DashboardProfile /> },
          
          // Customers routes
          { path: "Customers/AllCustomers", element: <AllCustomers /> },
          
          // Invoices routes
          { path: "Invoices/AllInvoices", element: <AllInvoices /> },
          { path: "Invoices/CreateInvoice", element: <CreateInvoice /> },
          { path: "Invoices/InvoiceDetail/:id", element: <InvoiceDetail /> },
          
          // Withdrawal Management routes
          { path: "WithdrawalManagement/ManageBanks", element: <Management /> },
          
          // Ledger routes
          { path: "Ledger/LedgerList", element: <LedgerList /> },
          
          // Reports routes
          { path: "Reports/PaymentReports", element: <PaymentReports /> },
          { path: "Reports/InvoiceReports", element: <InvoiceReports /> },
          { path: "Reports/WithdrawalReports", element: <WithdrawalReport /> },
          
          // E-Pos routes
          { path: "Epos/AllEpos", element: <Epos /> },
          
          // Settings routes
          { path: "Settings/PaymentGateway", element: <PaymentGateway /> },
          { path: "Settings/CheckoutSettings", element: <CheckoutSettings /> },
          
          // Template Management routes
          { path: "TemplateE-Management/AllTemplate", element: <TemplateManagement /> },
          
          // User Role Management routes
          { path: "UserRoleManagement/Roles", element: <Role /> },
          { path: "UserRoleManagement/Users", element: <Employees /> },
          
          // Manage Employees routes
          { path: "ManageEmployees/AllEmployees", element: <AllEmployees /> },
          { path: "ManageEmployees/CreateEditEmployee", element: <CreateEditEmployee /> },
          { path: "ManageEmployees/CreateEditEmployee/:id", element: <CreateEditEmployee /> },
          
          // Transaction History routes
          { path: "TransactionHistory/IBFTLedger", element: <IbftLedger /> },
          
          // Disbursement routes
          { path: "Disbursement/BulkDisbursement", element: <BulkDisbursement /> },
          { path: "Disbursement/BeneficiaryList", element: <BeneficiaryList /> },
          { path: "Disbursement/InstantTransfer", element: <InstantTransfer /> },
 
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  {
    path: "/Onboarding",
    element: <LayoutOnboarding />,
    children: [
      { path: "PersonalInformation", element: <PersonalInformation/> },
      { path: "TermsConditions", element: <TermsConditions/> },
      { path: "Verification", element: <Verification/> },
      { path: "UploadDocument", element: <UploadDocument/> },
      { path: "BankInfo", element: <BankInfo/> },
      { path: "SetPassword", element: <SetPassword/> },
      { path: "Finish", element: <Finish/> },
    ],
  },
  {
    path: "/BusinessOnboarding",
    element: <LayoutOnboarding />,
    children: [
      { path: "BusinessInformation", element: <BusinessInformation/> },
      { path: "TermsConditions", element: <BusinessTermsConditions/> },
      { path: "OwnerInformation", element: <OwnerInformation/> },
      { path: "PartnerInformation", element: <PartnerInformation/> },
      { path: "BankInfo", element: <BusinessBankInfo/> },
      { path: "SetPassword", element: <BusinessSetPassword/> },
      { path: "Finish", element: <BusinessFinish/> },
    ],
  },
]);