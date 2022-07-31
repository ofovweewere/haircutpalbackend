/*
USEFUL FUNCTIONS
These functions will be called by the controller to perform somewhat
commonly used tasks
*/

/*
removeDuplicates
This function removes duplicates from the result of the users query api
requests
*/
function removeDuplicates(arr) {
  return [...new Map(arr.map((item) => [item.id, item])).values()];
}
exports.removeDuplicates = removeDuplicates;

/*
sort
This function sorts the array that is from the result of the users
query api requests
*/
function sort(arr, property, direction) {
  return arr.sort((a, b) => {
    if (direction === 'asc') {
      return a[property] - b[property];
    }

    return b[property] - a[property];
  });
}
exports.sort = sort;

/*
getTags
This function puts the tags that the user supplied in an array,
so the tags can be used to make parallel api requests to
the server
*/
function getTags(tagString) {
  const tags = tagString.split(',');
  return tags;
}
exports.getTags = getTags;

/*
equal
This boolean function checks if the two arguments passed to it are
equal. If the two arguments are equal, it returns true. Else it returns
false
*/
function equal(arg1, arg2) {
  return arg1 === arg2;
}
exports.equal = equal;

/*
isValidSortBy
This function ensures that the user inputs a sortBy query parameter
that is valid. In other words, the user sortBy query parameter is
only allowed to be either 'id' or 'reads' or 'likes' or 'popularity'
*/
function isValidSortBy(sortBy) {
  const id = 'id';
  const reads = 'reads';
  const likes = 'likes';
  const popularity = 'popularity';

  return (
    equal(sortBy, id) || equal(sortBy, reads) || equal(sortBy, likes) || equal(sortBy, popularity)
  );
}
exports.isValidSortBy = isValidSortBy;

/*
isValidDirection
This function ensures that the user inputs a direction query parameter
that is valid. In other words, the user direction query parameter is
only allowed to be either 'asc' or 'desc'
*/
function isValidDirection(direction) {
  const asc = 'asc';
  const desc = 'desc';

  return equal(direction, asc) || equal(direction, desc);
}
exports.isValidDirection = isValidDirection;

/*
noInvalidQueryParams
This function checks if the direction or sortBy query parameters
input by the user are valid query parameters
*/
function noInvalidQueryParams(sortBy, direction) {
  let error = '';
  if (!isValidSortBy(sortBy)) {
    error = 'sortBy parameter is invalid';
  } else if (!isValidDirection(direction)) {
    error = 'direction parameter is invalid';
  }
  return error;
}
exports.noInvalidQueryParams = noInvalidQueryParams;
