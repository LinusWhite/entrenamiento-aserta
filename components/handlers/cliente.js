"use strict";
module.exports = {
  metadata: {
    name: "cliente",
    eventHandlerType: "ResolveEntities",
  },
  handlers: {
    entity: {},
    items: {
      nombre_cliente: {
        publishPromptMessage: async (event, context) => {

        },
        validate: async (event, context) => {

        },

      },

      numero_cliente: {
        publishPromptMessage: async (event, context) => {
       
        },
        validate: async (event, context) => {

        },
      },

      direccion_cliente: {
        publishPromptMessage: async (event, context) => {

        },
        validate: async (event, context) => {

        },
      },
      corfirmacion_datos: {
        publishPromptMessage: async (event, context) => {

        },
        validate: async (event, context) => {

        }
      }
    },
  },
};



function editAlpha(alpha, arrayJsons) {
  let dic = { ...alpha };
  for (let json of arrayJsons) {
    dic[json.key] = json.value;
  }
  return dic;
}

