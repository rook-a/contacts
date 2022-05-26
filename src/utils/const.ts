export const MAX_COUNT_POSTS = 3;

export const enum NameSpace {
  App = 'App',
  Users = 'Users',
  Posts = 'Posts',
  Comments = 'Comments',
}

export const enum AppRoute {
  Root = '/',
  User = '/user',
  Posts = '/posts',
  NotFound = '*',
}

export const enum APIRoute {
  Users = '/users',
  Posts = '/posts',
  Comments = '/comments',
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

export const enum HttpCode {
  BadRequest = 400,
  NotFound = 404,
}
