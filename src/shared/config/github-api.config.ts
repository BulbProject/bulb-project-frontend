const gitHubApiConfig = {
  baseUrl: 'https://udoc.eprocurement.systems/entries/BulbProject/bulb-project-frontend',
  // eslint-disable-next-line no-process-env
  branch: process.env.NODE_ENV === 'development' ? 'develop' : 'master',
};

export default gitHubApiConfig;
