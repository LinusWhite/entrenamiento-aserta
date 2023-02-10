"use strict";
const axios = require("axios");
module.exports = {
  metadata: () => ({
    name: "pedido",
    properties: {
      alpha_usuario: { required: true, type: "string" }
    },
    supportedActions: ["success", "error"],
  }),

  invoke: async (conversation, done) => {

  },
};

function editAlpha(alpha, arrayJsons) {
  let dic = { ...alpha };
  for (let json of arrayJsons) {
    dic[json.key] = json.value;
  }
  return dic;
}

function httpCodes(status, error) {
  return `Status: ${status}, Error: ${JSON.stringify(error)}`;
}


