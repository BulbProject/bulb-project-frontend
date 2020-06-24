const gitHubApiConfig = {
  baseUrl: 'https://udoc.eprocurement.systems/entries/BulbProject/bulb-project-frontend',
  branch: process.env.APP_ENV === 'STAGE' ? 'master' : 'develop',
};

export default gitHubApiConfig;
