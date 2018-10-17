// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hackernews_db: {
    databaseURL: 'https://hacker-news.firebaseio.com',
  },
  app_db: {
    apiKey: 'AIzaSyAonue_QoCXiE1w2_bK9htgaqaqSwAcNK0',
    authDomain: 'hacker-news-client-v4.firebaseapp.com',
    databaseURL: 'https://hacker-news-client-v4.firebaseio.com',
    projectId: 'hacker-news-client-v4',
    storageBucket: 'hacker-news-client-v4.appspot.com',
    messagingSenderId: '235153545323',
  },
};
