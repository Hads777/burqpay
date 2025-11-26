export let sideBarUtils = {};
export function setSideBarUtils(data) {
  sideBarUtils = data;
}
export let filterUtils = "";
export function setFilterUtils(data) {
  filterUtils = data;
}
export const NumberFormatter = (value) => {
  const formattedNumber = new Intl.NumberFormat("en-US").format(value);
  return formattedNumber;
};
let navigator;

export const setNavigator = (navFn) => {
  navigator = navFn;
};

export const navigate = (...args) => {
  if (navigator) {
    navigator(...args);
  }
};