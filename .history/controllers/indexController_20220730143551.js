/* eslint-disable linebreak-style */
/*
ROUTE CONTROLLERS
The controllers defined below will be used by the route to
carry out user requests
*/

const axios = require('axios');
const utilFunctions = require('../util/controllerUtilFunctions');

/*
apiPing controller
This controller is for the api/ping route and
returns {"success": true} json object
*/
module.exports.apiPing = (req, res) => {
  const success = true;

  return res.json({ success });
};

/*
getPosts controller
This controller is for the api/posts route and
it returns a json object of posts that was filtered using the
user passed query
*/
module.exports.getPosts = async (req, res) => {
  let posts = []; // used to store the final edited results of the users query
  let requestResult = []; // used to get the user query information from the api
  const { tags, sortBy = 'id', direction = 'asc' } = req.query; // destructure assignment with default value of sortBy='id', direction='asc'
  const emptyString = '';
  const pattern = /\s/g; // used  for removing white space from a string
  let error = emptyString; // Stores error response message for a query
  let tagVal = '';
  const apiAddress = 'https://api.hatchways.io/assessment/blog/posts?tag=';

  /*
  Begin processing the users request by checking that the user includes a tag parameter
  in the query
  -If the user does include a tag parameter, further process the user request
  -else if the user does not include a tag parameter, return an error message
  */
  if (tags) {
    /*
    If the user odes include a tag parameter, check to ensure that the user
    keyed in valid query parameters
    -if the user keyed in valid query parameters, further process the user request
    -if the user input in an invalid value, return an appropriate error message
    */
    error = utilFunctions.noInvalidQueryParams(sortBy, direction);
    if (utilFunctions.equal(error, emptyString)) {
      // Ensure that the user keyed in a non empty string for the tags query parameter value
      tagVal = tags.replace(pattern, emptyString);
      const isNonEmptyTag = !utilFunctions.equal(tagVal, emptyString);

      /*
      if the tag parameter is a non empty string
      then, proceed to modify the posts array using the user query
      */
      if (isNonEmptyTag) {
        // put the tags supplied by the user inside an array for concurrent api calls
        const tagsArray = utilFunctions.getTags(tags);

        // make concurrent api requests
        const requests = tagsArray.map((tag) => axios.get(apiAddress + tag));
        try {
          // wait until all the api request calls resolves
          requestResult = await Promise.all(requests);

          // push items from api call into posts array
          requestResult.map((item) => item.data && posts.push(...item.data.posts));

          // remove duplicates from posts array
          posts = utilFunctions.removeDuplicates(posts);

          // sort the post array by user supplied parameters
          posts = utilFunctions.sort(posts, sortBy, direction);
        } catch (err) {
          return res.status(500).json({ error: String(err) });
        }
      }
    }
  } else {
    /*
    If the user did not key in proper tag,return a user must
    fill in tag error
    */
    error = 'Tags parameter is required';
  }

  /*
  if the user query parameter is invalid, return appropriate
  error message
  */
  if (error !== emptyString) {
    return res.status(400).json({ error });
  }

  /*
  if the user query parameter is valid, return the final results
  of the user query that is stored in the posts object
  */
  return res.json({ posts });
};
