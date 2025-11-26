import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ApisState } from "./apisInterface";

const initialState: ApisState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  fromFilter: "",
  toFilter: "",
  theme: "today",
  dashboardStructure: {},
  compilanceDashboard: {},
  actionBoard: [],
  notificationStructure: {},
  toggled: false,
  closeSidebar: false,
  openSidebar: true,
  subscribeData: {},
  product: false,
  business: false,
  payment: false,
  password: false,
  prodId: {},
  individualCustomer: [],
  payInvoices: {},
  cities: {},
  countries: {},
  languages: {},
  relations: {},
  states: {},
  token: "",
  refreshToken: "",
  permissions: [],
  flightDetails: {},
  packageDetails: {},
  ecommerceDetails: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initiateRequest: (state: any) => {
      state.isLoading = true;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    setFromFilter: (state, action) => {
      state.fromFilter = action.payload.fromFilter;
    },
    setToFilter: (state, action) => {
      state.toFilter = action.payload.toFilter;
    },
    setDashboardStructure: (state, action) => {
      state.dashboardStructure = action.payload.data;
    },
    setIndividualCustomer: (state, action) => {
      state.individualCustomer = action.payload.individualCustomer;
    },
    setCompilanceDashboard: (state, action) => {
      state.compilanceDashboard = action.payload.compilanceData;
    },
    setSubscriptionData: (state, action) => {
      state.subscribeData = action.payload.data;
    },
    setProduct: (state, action) => {
      state.product = action.payload.product;
    },
    setPayment: (state, action) => {
      state.payment = action.payload.payment;
    },
    setPassword: (state, action) => {
      state.password = action.payload.password;
    },
    setBusiness: (state, action) => {
      state.business = action.payload.business;
    },
    setActionBoard: (state, action) => {
      state.actionBoard = action.payload.actionBoard;
    },
    setNotificationStructure: (state, action) => {
      state.notificationStructure = action.payload.notificationStructure;
    },
    setPayInvoices: (state, action) => {
      state.payInvoices = action.payload;
    },
    setProdId: (state, action) => {
      state.prodId = action.payload.business;
    },
    setCities: (state, action) => {
      state.cities = action.payload.cities;
    },
    setCountries: (state, action) => {
      state.countries = action.payload.countries;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload.languages;
    },
    setRelations: (state, action) => {
      state.relations = action.payload.relations;
    },
    setStates: (state, action) => {
      state.states = action.payload.states;
    },
    toggleSidebar: (state) => {
      state.toggled = !state.toggled;
    },
    openSidebar: (state) => {
      state.toggled = true;
    },
    closeSidebar: (state) => {
      state.toggled = false;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
    },
    setPermisssions: (state, action) => {
      state.permissions = action.payload.permissions;
    },
    setFlightDetails: (state, action) => {
      state.flightDetails = action.payload.flightDetails;
    },
    setPackageDetails: (state, action) => {
      state.packageDetails = action.payload.packageDetails;
    },
    setEcommerceDetails: (state, action) => {
      state.ecommerceDetails = action.payload.ecommerceDetails;
    },
    catchError: (state: any, action: PayloadAction<any>) => {
      state.isError = true;
      state.isLoading = false;
      state.message = action.payload.message;
    },
  },
});

export const {
  catchError,
  openSidebar,
  toggleSidebar,
  closeSidebar,
  initiateRequest,
  setTheme,

  setIndividualCustomer,
  setProdId,
  setPayInvoices,
  setDashboardStructure,
  setSubscriptionData,
  setProduct,
  setBusiness,
  setPassword,
  setCities,
  setCountries,
  setLanguages,
  setRelations,
  setStates,
  setFromFilter,
  setToFilter,
  setToken,
  setRefreshToken,
  setPermisssions,
  setFlightDetails,
  setPackageDetails,
  setEcommerceDetails,
} = authSlice.actions;

export default authSlice.reducer;
