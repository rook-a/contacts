export const enum NameSpace {
  App = 'App',
  Users = 'Users',
  Posts = 'Posts',
}

export const enum AppRoute {
  Root = '/',
  User = '/user',
  NotFound = '*',
}

export const enum APIRoute {
  Users = '/users',
  Posts = '/posts',
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
