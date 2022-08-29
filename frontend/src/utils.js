import axios from "axios";
import { endpoint } from "./constants";

export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getItemList = () => {
  let itemList = localStorage.getItem("itemList");
  if (!itemList) itemList = [];
  else itemList = JSON.parse(itemList);
  return itemList;
};

function updateItemList(itemList) {
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

export const clearItemList = () => {
  localStorage.removeItem("itemList");
};

export const addItem = (item) => {
  let itemList = getItemList();
  let prevItem = itemList.find((each) => each.id === item?.id);
  itemList = itemList.filter((each) => each.id !== item?.id);
  if (prevItem) {
    prevItem.count += 1;
  } else {
    prevItem = { ...item, count: 1 };
  }
  updateItemList([...itemList, prevItem]);
  return true;
};

export const removeItem = (item) => {
  if (!item) return false;
  let itemList = getItemList();
  let prevItem = itemList.find((each) => each.id === item?.id);
  if (prevItem) {
    prevItem.count--;
    if (prevItem.count === 0) {
      itemList = itemList.filter((each) => each.id !== item?.id);
    }
  }
  updateItemList(itemList);
  return true;
};
