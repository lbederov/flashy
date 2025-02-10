export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
export const findRandom = (array) => {
  if (array.length === 0) return [];
  const newArray = shuffleArray(array);
  return [newArray[0]];;
};
export const filterByTag = (array, str) => {
  let filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    const tags = array[i].tags;
    if (tags.some(tag => tag.toLowerCase().includes(str.toLowerCase()))) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

export const paginateArray = (array, pageSize, currPage) => {
  console.log('array: ', array, ' | pageSize: ', pageSize, ' | currPage: ', currPage);
  console.log('array AFTER: ', array.slice((currPage - 1) * pageSize, currPage * pageSize));
  return array.slice((currPage - 1) * pageSize, currPage * pageSize);
}

export const findLastPage = (array, itemsPerPage) => {
  const pages = Math.ceil(array.length / itemsPerPage);
  return pages;
}
export const updateSearchParam = (params, query, term) => {
  if (term && term !== '') {
    params.set(query, term);
  } else {
    params.delete(query);
  }
};