module.exports = {
  client: {
    service: {
      url: "http://localhost:4000/graphql",
      //local copy can be downloaded using localSchemaFile
      skipSSLValidation: true,
    },
  },
};
