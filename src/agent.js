import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5",
  secret: "a5ab4ed2efdc772dca8d5636a26c0d897907df38cd92baa9067e57093d9596b5"
});

// require syntax
//const Unsplash = require('unsplash-js').default;

//const unsplash = new Unsplash({ accessKey: "aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5" });
/*
const unsplash = new Unsplash({
  accessKey: "{APP_ACCESS_KEY}",
  // Optionally you can also configure a custom header to be sent with every request
  headers: {
    "X-Custom-Header": "foo"
  },
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500 // values set in ms
}); */

/*
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://www.wasteometer.in/api';
//const API_ROOT = 'http://206.189.140.180/api';
//const API_ROOT = 'https://cleanbeach-server.herokuapp.com/api';
//const API_ROOT = 'http://localhost:3000/api';
const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};
*/

const User = {
    get: (keyword, page) => 
    unsplash.search.users(keyword, page, 20)
    .then(toJson),
    photos: (username)=>
    unsplash.users.photos(username, 1, 20, "latest", false)
    .then(toJson)
}



/*
const requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (email, password) =>
    requests.post('/users', {user: {email, password}}),
  save: (user) => requests.put('/user', {user}),
};

const User = {
  get: (type, page) =>
    requests.get(`/user?usertype=${encode(type)}&${limit(10, page)}`),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (job) => Object.assign({}, job, {slug: undefined});
const Jobs = {
  all: (page) => requests.get(`/jobs?${limit(10, page)}`),
  byCreator: (creator, page) =>
    requests.get(`/jobs?creator=${encode(creator)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/jobs?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug) => requests.del(`/jobs/${slug}`),
  favorite: (slug) => requests.post(`/jobs/${slug}/favorite`),
  favoritedBy: (creator, page) =>
    requests.get(`/jobs?favorited=${encode(creator)}&${limit(5, page)}`),
  feed: () => requests.get('/jobs/feed?limit=10&offset=0'),
  get: (slug) => requests.get(`/jobs/${slug}`),
  unfavorite: (slug) => requests.del(`/jobs/${slug}/favorite`),
  update: (job) => requests.put(`/jobs/${job.slug}`, {job: omitSlug(job)}),
  create: (job) => requests.post('/jobs', {job}),
};

const Activity = {
  create: (activity) => requests.post('/activity', {activity}),
  all: (page) => requests.get(`/activity?${limit(10, page)}`),
  byCreator: (creator, page) =>
    requests.get(`/activity?creator=${encode(creator)}&${limit(5, page)}`),
  download: (startDate, endDate, page) =>
    requests.get(
      `/activity/excel?startdate=${encode(startDate)}&enddate=${encode(
        endDate,
      )}&${limit(5, page)}`,
    ),
};

const Comments = {
  create: (slug, comment) => requests.post(`/jobs/${slug}/comments`, {comment}),
  delete: (slug, commentId) =>
    requests.del(`/jobs/${slug}/comments/${commentId}`),
  forJob: (slug, usertype, username) =>
    //requests.get(`/jobs/${slug}/comments`)
    //requests.get(`/jobs/comments?slug=${encode(slug)}&usertype=${encode(usertype)}&username=${encode(username)}`)
    requests.get(
      `/jobs/${slug}/comments?usertype=${encode(usertype)}&username=${encode(
        username,
      )}`,
    ),
};

const Profile = {
  follow: (username) => requests.post(`/profiles/${username}/follow`),
  get: (username) => requests.get(`/profiles/${username}`),
  unfollow: (username) => requests.del(`/profiles/${username}/follow`),
};
*/
export default {
User
};
