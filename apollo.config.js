const { REACT_APP_SERVERPORT } = process.env;
module.exports = {
  client: {
    service: {
      url: `http://localhost:${REACT_APP_SERVERPORT}/graphql`,
      //local copy can be downloaded using localSchemaFile
      skipSSLValidation: true,
    },
  },
};
