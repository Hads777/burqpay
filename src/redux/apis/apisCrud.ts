import { AnyARecord } from "dns";
import axios from "../../utils/axios";

// const token = localStorage.getItem("token");

export function customerLogin(body: any) {
  return axios.post(`/api/admin/login`, body);
}
export function customerReset(body: any) {
  return axios.post(`/api/reset-password-link`, body);
}
export function resetPassword(body: any) {
  return axios.post(`/api/reset-password`, body);
}
export function refreshToken(body: any) {
  return axios.post(`/api/refresh-token`, body);
}
export function allCustomerStatusChange(body: any, id: any) {
  return axios.post(`/api/admin/customer/${id}`, body);
}

export function customersList(page: any, pageSize: any, type: any) {
  return axios.get(
    `/api/admin/customer?type=${type}&page=${page}&per_page=${pageSize}`
  );
}
export function serviceDashboardList(filter: any, from: any, to: any) {
  return axios.get(
    `/api/service-report?filter_type=${
      from && to
        ? `custom&start_date=${from}&end_date=${to}`
        : filter
        ? filter
        : "today"
    }`
  );
}
export function gameCenterDashboardList() {
  return axios.get(`/api/game-center?filter_type=last_7_days`);
}
export function onboardingDashboardList(filter: any, from: any, to: any) {
  return axios.get(
    `/api/onboarding-report?filter_type=${
      from && to
        ? `custom&start_date=${from}&end_date=${to}`
        : filter
        ? filter
        : "today"
    }`
  );
}
export function incomingOutgoingDashboardList(filter: any, from: any, to: any) {
  return axios.get(
    `/api/fund-report?filter_type=${
      from && to
        ? `custom&start_date=${from}&end_date=${to}`
        : filter
        ? filter
        : "today"
    }`
  );
}

export function gamecenterLists(filter: any, from: any, to: any) {
  return axios.get(
    `/api/game-center/stats?filter_type=${
      from && to
        ? `custom&start_date=${from}&end_date=${to}`
        : filter
        ? filter
        : "today"
    }`
  );
}
export function mainDashboardList(filter: any, from: any, to: any) {
  return axios.get(
    `/api/main-dashboard?filter_type=${
      from && to
        ? `custom&start_date=${from}&end_date=${to}`
        : filter
        ? filter
        : "today"
    }`
  );
}
export function getAllRewards() {
  return axios.get(`api/portal/user-reward/list`);
}
export function getAllReferral() {
  return axios.get(`api/portal/referral`);
}
export function getAllFaq(page?: any, pageSize?: any) {
  return axios.get(`api/portal/faq?page=${page}&per_page=${pageSize}`);
}
export function getAllFaqCreate(body: any) {
  return axios.post(`api/portal/faq/create`, body);
}
export function updateFaqList(id: any, body: any) {
  return axios.post(`api/portal/faq/edit/${id}`, body);
}

export function deleteFaq(id: any) {
  return axios.delete(`/api/portal/faq/delete/${id}`);
}

export function getRole(page: any, pageSize: any) {
  return axios.get(`/api/admin/roles?page=${page}`);
}
export function getAllDepartments(page: any, pageSize: any) {
  return axios.get(`/api/admin/departments?page=${page}`);
}
export function createRole(body: any) {
  return axios.post(`/api/admin/roles`, body);
}
export function createDepartment(body: any) {
  return axios.post(`/api/admin/departments`, body);
}
export function updateRole(body: any) {
  return axios.post(`/api/admin/roles`, body);
}
export function updateDepartent(id: any, body: any) {
  return axios.put(`/api/admin/departments/${id}`, body);
}
export function getPermissionList() {
  return axios.get(`/api/admin/permissions`);
}
export function getPermissionForAllWeb(id: any) {
  return axios.get(`/api/admin/permissions${id && `?role_id=${id}`}`);
}
export function updatePermission(body: any) {
  return axios.post(`/api/admin/permissions`, body);
}
export function getPermissionListByRole(id: any) {
  return axios.get(`/api/admin/permissions?role_id=${id}`);
}

export function createUser(body: any) {
  return axios.get(`/api/admin/permissions`);
}
export function getRolesList(page?: any, pageSize?: any) {
  return axios.get(
    `/api/portal/role-management/direct-list?page=${page}&per_page=${pageSize}`
  );
}
export function deleteRole(id: any, body: any) {
  return axios.post(`api/admin/roles/${id}`, body);
}
export function deleteDepartent(id: any, body: any) {
  return axios.delete(`api/admin/departments/${id}`);
}
export function activityLogsList(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/logs/activity?page=${page}&per_page=${pageSize}`
  );
}
export function financialLogsList(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/logs/financial?page=${page}&per_page=${pageSize}`
  );
}
export function digittLogsList(page: any, pageSize: any) {
  return axios.get(`/api/portal/logs/digitt?page=${page}&per_page=${pageSize}`);
}
export function systemAuditList(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/logs/system_audit?page=${page}&per_page=${pageSize}`
  );
}
export function complaintTypeList(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/complaint-type?page=${page}&per_page=${pageSize}`
  );
}
export function complaintID() {
  return axios.get(`/api/portal/complaint-type`);
}
export function createComplaintType(body: any) {
  return axios.post(`/api/portal/complaint-type/create`, body);
}
export function editComplaintType(body: any) {
  return axios.post(`/api/portal/complaint-type/edit/${body.id}`, body);
}
export function deleteComplaintType(id: any) {
  return axios.delete(`/api/portal/complaint-type/delete/${id}`);
}
export function leadsList(page: any, pageSize: any) {
  return axios.get(`/api/portal/leads?page=${page}&per_page=${pageSize}`);
}

export function getAllComplaints(page: any, pageSize: any) {
  return axios.get(`/api/portal/complaints?page=${page}&per_page=${pageSize}`);
}
export function createComplaints(body: any) {
  return axios.post(`/api/portal/complaints/create`, body);
}
export function departmentList(page?: any, pageSize?: any) {
  return axios.get(
    `/api/portal/department-management/direct-list?page=${page}&per_page=${pageSize}`
  );
}
export function createComplaintSubType(body: any) {
  return axios.post(`/api/portal/complain-subtype/create`, body);
}
export function editComplaintSubType(body: any) {
  return axios.post(`/api/portal/complain-subtype/edit/${body.id}`, body);
}
export function deleteComplaintSubType(id: any) {
  return axios.delete(`/api/portal/complain-subtype/delete/${id}`);
}
export function getAllVendors() {
  return axios.get(`/api/portal/vendor`);
}
export function getAllVendorServices(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/vendor-service?page=${page}&per_page=${pageSize}`
  );
}
export function createVendorService(body: any) {
  return axios.post(`/api/portal/vendor-service/create`, body);
}
export function editVendorService(body: any) {
  return axios.post(`/api/portal/vendor-service/edit/${body.id}`, body);
}
export function deleteVendorService(id: any) {
  return axios.delete(`/api/portal/vendor-service/delete/${id}`);
}
export function deleteComplaints(id: any) {
  return axios.delete(`/api/portal/complaints/delete/${id}`);
}
export function updateComplaints(id: any, body: any) {
  return axios.post(`api/portal/complaints/edit/${id}`, body);
}
export function getComplaintsSubType(page: any, pageSize: any = 15) {
  return axios.get(
    `api/portal/complain-subtype?page=${page}&per_page=${pageSize}`
  );
}
export function getGuestAccounts(page: any, pageSize: any) {
  return axios.get(
    `api/portal/customers/guest?page=${page}&per_page=${pageSize}`
  );
}
export function relationLovList(page: any, pageSize: any) {
  return axios.get(
    `/api/portal/relation-lov?page=${page}&per_page=${pageSize}`
  );
}
export function createRelationLov(body: any) {
  return axios.post(`/api/portal/relation-lov/create`, body);
}
export function editRelationLov(body: any) {
  return axios.post(`/api/portal/relation-lov/edit/${body.id}`, body);
}
export function deleteRelationLov(id: any) {
  return axios.delete(`/api/portal/relation-lov/delete/${id}`);
}
export function getIbft(page: any) {
  return axios.get(`api/admin/orders?type=air_ticketing&page=${page}`);
}
export function getMobileTopup(page: any) {
  return axios.get(`api/portal/transactions/topup?page=${page}`);
}
export function getMobileBundle(page: any) {
  return axios.get(`api/portal/transactions/bundle?page=${page}`);
}
export function getBusBooking(page: any) {
  return axios.get(`api/portal/transactions/bus-booking?page=${page}`);
}

export function getAirBooking(page: any) {
  return axios.get(`api/portal/transactions/air-booking?page=${page}`);
}
export function getBarqLiteAccounts(page: any, pageSize: any) {
  return axios.get(
    `api/portal/customers/barq-lite?page=${page}&per_page=${pageSize}`
  );
}
export function getBarqFlexAccounts(page: any, pageSize: any) {
  return axios.get(
    `api/portal/customers/barq-flex?page=${page}&per_page=${pageSize}`
  );
}
export function getBarqPrimeAccounts(page: any, pageSize: any) {
  return axios.get(
    `api/portal/customers/barq-prime?page=${page}&per_page=${pageSize}`
  );
}

export function getIncomeType(page: any, pageSize: any) {
  return axios.get(`/api/portal/income-type?page=${page}&per_page=${pageSize}`);
}
export function createIncomeType(body: any) {
  return axios.post(`/api/portal/income-type/create`, body);
}
export function editIncomeType(body: any) {
  return axios.post(`/api/portal/income-type/edit/${body.id}`, body);
}
export function deleteIncomeType(id: any) {
  return axios.delete(`/api/portal/income-type/delete/${id}`);
}

export function vendorList(page: any, pageSize: any) {
  return axios.get(`/api/portal/vendor?page=${page}&per_page=${pageSize}`);
}
export function createVendor(body: any) {
  return axios.post(`/api/portal/vendor/create`, body);
}
export function editVendor(body: any) {
  return axios.post(`/api/portal/vendor/edit/${body.id}`, body);
}
export function deleteVendor(id: any) {
  return axios.delete(`/api/portal/vendor/delete/${id}`);
}

export function getAllComplaintsAssign(page: any, pageSize, id: any) {
  return axios.get(
    `/api/portal/complaints-assign/${id}?page=${page}&per_page=${pageSize}`
  );
}
export function createComplaintsAssign(body: any) {
  return axios.post(`/api/portal/complaints-assign/create`, body);
}
export function getVendorCommissionList(page: any, pageSize: any) {
  return axios.get(
    `api/portal/vendor-commission?page=${page}&per_page=${pageSize}`
  );
}
export function getVendorCommissionForType() {
  return axios.get(`api/portal/vendor`);
}
export function createVendorCommission(body: any) {
  return axios.post(`api/portal/vendor-commission/create`, body);
}
export function editVendorCommission(id: any, body: any) {
  return axios.post(`api/portal/vendor-commission/edit/${id}`, body);
}
export function deleteVendorCommission(id: any) {
  return axios.delete(`api/portal/vendor-commission/delete/${id}`);
}
export function logOutApi(body: any) {
  return axios.post(`/api/logout`, body);
}
export function getAppVersion(page: any, pageSize: any) {
  return axios.get(`api/portal/app-version?page=${page}&per_page=${pageSize}`);
}
export function createAppVersion(body: any) {
  return axios.post(`api/portal/app-version/create`, body);
}
export function editAppVersion(body: any) {
  return axios.post(`api/portal/app-version/edit/${body.id}`, body);
}
export function deleteAppVersion(id: any) {
  return axios.delete(`api/portal/app-version/delete/${id}`);
}
export function getVendorCommissionSlab(page: any, pageSize: any) {
  return axios.get(
    `api/portal/vendor-commission-slab?page=${page}&per_page=${pageSize}`
  );
}
export function createVendorCommissionSlab(body: any) {
  return axios.post(`api/portal/vendor-commission-slab/create`, body);
}
export function editVendorCommissionSlab(body: any) {
  return axios.post(`api/portal/vendor-commission-slab/edit/${body.id}`, body);
}
export function deleteVendorCommissionSlab(id: any) {
  return axios.delete(`api/portal/vendor-commission-slab/delete/${id}`);
}
export function getIncomeProof(page: any, pageSize: any) {
  return axios.get(`api/portal/income-proof?page=${page}&per_page=${pageSize}`);
}
export function createIncomeProof(body: any) {
  return axios.post(`api/portal/income-proof/create`, body);
}
export function editIncomeProof(body: any) {
  return axios.post(`api/portal/income-proof/edit/${body.id}`, body);
}
export function deleteIncomeProof(id: any) {
  return axios.delete(`api/portal/income-proof/delete/${id}`);
}
export function getCampaign(page: any, pageSize: any) {
  return axios.get(`api/portal/campaign?page=${page}&per_page=${pageSize}`);
}
export function createCampaign(body: any) {
  return axios.post(`api/portal/campaign/create`, body);
}
export function editCampaign(body: any) {
  return axios.post(`api/portal/campaign/edit/${body.id}`, body);
}
export function deleteCampaign(id: any) {
  return axios.delete(`api/portal/campaign/delete/${id}`);
}

// export function getAlldepartments(page?: any, pageSize?: any) {
//   return axios.get(`/api/portal/department?page=${page}&per_page=${pageSize}`);
// }

export function getAssignList(id: any) {
  return axios.get(`/api/portal/department/${id}/users`);
}
export function updateAssignList(id: any, body: any) {
  return axios.post(`api/portal/complaints-assign/edit/${id}`, body);
}
export function getAlldepartments(
  page: any,
  pageSize: any,
  searchTerm: any,
  selectedFilters: any
) {
  return axios.get(
    `/api/portal/department?${
      searchTerm
        ? `search=${searchTerm}&${
            selectedFilters
              ? `filter_type=${selectedFilters}`
              : `page=${page}&per_page=${pageSize}`
          }`
        : `page=${page}&per_page=${pageSize}`
    }`
  );
}
export function addDepartments(body: any) {
  return axios.post(`api/portal/department/create`, body);
}
export function updateDepartments(id: any, body: any) {
  return axios.post(`api/portal/department/edit/${id}`, body);
}

export function deleteDepartment(id: any) {
  return axios.delete(`api/portal/department/delete/${id}`);
}

export function createContent(body: any) {
  return axios.post(`api/admin/content-pages`, body);
}
export function getEmployes(page: any, pageSize: any) {
  return axios.get(`/api/admin/employees?page=${page}&per_page=${pageSize}`);
}
export function createEmploye(body: any) {
  return axios.post(`api/admin/employees`, body);
}
export function UpdateEmployee(body: any, id: any) {
  return axios.put(`api/admin/employees/${id}`, body);
}
export function getDashboardData() {
  return axios.get(`api/admin/dashboard`);
}
export function getDashboardTableData(page: any, pageSize: any) {
  return axios.get(
    `api/admin/dashboard/last-ten-customers?page=${page}&per_page=${pageSize}`
  );
}
export function deleteEmploye(id: any) {
  return axios.delete(`api/admin/employees/${id}`);
}

export function getGraphData(type: any) {
  return axios.get(`api/admin/dashboard/customers-graph-data?type=${type}`);
}
export function getGraphDataPackage() {
  return axios.get(`api/admin/dashboard/packages-graph-data`);
}
export function getFaqs() {
  return axios.get(`/api/admin/faqs`);
}
export function addFaq(body: any) {
  return axios.post(`/api/admin/faqs`, body);
}
export function updateFaq(id: any, body: any) {
  return axios.put(`/api/admin/faqs/${id}`, body);
}
export function deleteFaqs(id: any) {
  return axios.delete(`/api/admin/faqs/${id}`);
}
export function getContent(type: any) {
  return axios.get(`api/admin/content-pages?type=${type}&status=1`);
}
export function getWalletTopUp({
  page,
  pageSize,
  from,
  to,
  search,
}: {
  page: any;
  pageSize: any;
  from: any;
  to: any;
  search: any;
}) {
  return axios.get(
    `api/admin/wallet-topup?type=1&search=${search}&page=${page}&pageSize=${pageSize}&from=${from}&to=${to}`
  );
}
export function getWalletCsv({
  page,
  pageSize,
  from,
  to,
  search,
}: {
  page: any;
  pageSize: any;
  from: any;
  to: any;
  search: any;
}) {
  return axios.get(
    `api/admin/wallet-topup/export?type=1&search=${search}&page=${page}&pageSize=${pageSize}&from=${from}&to=${to}`
  );
}
export function getPackagesList({
  page,
  pageSize,
  from,
  to,
  search,
}: {
  page: any;
  pageSize: any;
  from: any;
  to: any;
  search: any;
}) {
  return axios.get(
    `api/admin/packages?search=${search}&from=${from}&to=${to}&page=${page}&pageSize=${pageSize}`
  );
}
export function createPackage2(body: any) {
  return axios.post(`api/admin/packages`, body);
}
export function updatePackage2(id: any, body: any) {
  return axios.post(`api/admin/packages/${id}`, body);
}
export function deletePackage(id: any) {
  return axios.delete(`api/admin/packages/${id}`);
}
export function updatePackage(id: any, body: any) {
  return axios.post(`api/admin/packages/${id}`, body);
}

export function getCountries(per_page: any) {
  return axios.get(`api/admin/countries?&per_page=${per_page}`);
}

export function getCities(country_id) {
  return axios.get(`api/admin/cities?country_id=${country_id}`);
}
export function getHotels() {
  return axios.get(`api/admin/hotels`);
}

export function getPackageCategory() {
  return axios.get(`api/admin/packages/categories`);
}

export function getPackageTypes() {
  return axios.get(`api/admin/packages/types`);
}
export function updateProfileSetting(body: any) {
  const activity_user = localStorage.getItem("activity_user");
  return axios.post(`api/admin/profile-settings/${activity_user}`, body);
}
export function changePassword(formDataBody: any) {
  return axios.post("/api/change-password", formDataBody);
}
export function changePackageStatus(body: any, id: any) {
  return axios.post(`/api/admin/packages/update-package-status/${id}`, body);
}

export function getEcommerce() {
  return axios.get(`api/admin/orders?type=salla_product`);
}
export function getOrderPackages() {
  return axios.get(`api/admin/orders?type=packages`);
}
export function getPackagesbyId(id: any) {
  return axios.get(`api/admin/packages/${id}`);
}
export function getActivitLog(page: any, pageSize: any) {
  return axios.get(
    `api/admin/user_activities?&page=${page}&pageSize=${pageSize}`
  );
}
export function orderStatusChange(body: any) {
  return axios.put(`/admin/orders/update-status`, body);
}