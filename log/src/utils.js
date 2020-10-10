import { v4 as uuidv4, NIL } from 'uuid';

export const generateId = () => uuidv4();

export const getNullId = () => NIL;

export const sortObjectListByStringKey = (
  objectList = [],
  key,
  sortDirection = 'ascending',
) => {
  const list = [...objectList];

  const compareForAscending = (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    } else if (b[key] > a[key]) {
      return -1;
    } else {
      return 0;
    }
  };

  const compareForDescending = (a, b) => {
    if (b[key] > a[key]) {
      return 1;
    } else if (a[key] > b[key]) {
      return -1;
    } else {
      return 0;
    }
  };

  if (list.length > 1) {
    sortDirection === 'ascending'
      ? list.sort(compareForAscending)
      : list.sort(compareForDescending);
  }
  return list;
};
