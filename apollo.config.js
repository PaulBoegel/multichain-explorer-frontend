const { SERVERPORT } = process.env;
module.exports = {
  client: {
    service: {
      url: `http://localhost:${SERVERPORT}/graphql`,
      //local copy can be downloaded using localSchemaFile
      skipSSLValidation: true,
    },
  },
};
