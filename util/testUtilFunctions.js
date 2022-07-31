/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/*
isInAscendingOrder
This function checks if a passed  in array is sorted in ascending
*/
function isInAscendingOrder(arr, size, paramNextIndex, test) {
  let result = test;
  let nextIndex = paramNextIndex;
  // Loops the likes and if i > i + 1, the test will fail
  for (let i = 0; i < size && result; i++) {
    if (arr[i].likes > arr[nextIndex].likes) {
      result = false;
    }
    nextIndex += 1;
  }
  return result;
}
exports.isInAscendingOrder = isInAscendingOrder;

/*
isInDescendingOrder
This function checks if a passed  in array is sorted in descending order
*/
function isInDescendingOrder(arr, size, paramNextIndex, test) {
  let result = test;
  let nextIndex = paramNextIndex;
  // Loops the likes and if i < i + 1, the test will fail
  for (let i = 0; i < size && result; i++) {
    if (arr[i].likes < arr[nextIndex].likes) {
      result = false;
    }
    nextIndex += 1;
  }
  return result;
}
exports.isInDescendingOrder = isInDescendingOrder;

/*
isSorted
This function checks if a passed  in array is sorted in ascending or descending order
*/
function isSorted(body, direction) {
  const { posts } = JSON.parse(body);
  let test = true;
  const nextIndex = 1;
  const size = posts.length - 1;
  const ascending = 'asc';
  const descending = 'desc';
  if (direction === ascending) {
    test = isInAscendingOrder(posts, size, nextIndex, test);
  } else if (direction === descending) {
    test = isInDescendingOrder(posts, size, nextIndex, test);
  } else {
    test = false;
  }

  return test;
}
exports.isSorted = isSorted;

/*
arrayIsASet
This function determines if an array contains only unique items
*/
function arrayIsASet(body) {
  const { posts } = JSON.parse(body);
  let test = true;
  const currentIndex = 0;
  const increment = 1;
  const size = posts.length;
  // sort post array
  posts.sort((a, b) => b.id - a.id);
  let last = posts[currentIndex].id;
  for (let i = currentIndex + increment; i < size && test; i++) {
    if (posts[i].id === last) {
      test = false;
    }
    last = posts[i].id;
  }
  return test;
}
exports.arrayIsASet = arrayIsASet;
