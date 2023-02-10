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
          context.addMessage("Para continuar necesito saber el nombre de aquien se le entregara la pizza por favor.");
        },
        validate: async (event, context) => {
          let nombreValue = event.newValue;
          let alpha_usuario = context._response.context.variables.alpha_usuario.value;
          console.log({ alpha_usuario });
          console.log({ nombreValue });

          context.setVariable(
            "alpha_usuario",
            editAlpha(alpha_usuario, [
              { key: "nombre_cliente", value: nombreValue },
            ])
          );
          return true;
        },

      },

      numero_cliente: {
        publishPromptMessage: async (event, context) => {
          context.addMessage("¿Podria proporcionarme su numero telefonico?");
        },
        validate: async (event, context) => {
          let numeroValue = event.newValue.value;
          let alpha_usuario = context._response.context.variables.alpha_usuario.value;
          console.log({ alpha_usuario });
          console.log({ numeroValue });
          context.setVariable(
            "alpha_usuario",
            editAlpha(alpha_usuario, [
              { key: "numero_cliente", value: numeroValue },
            ])
          );
          return true;
        },
      },

      direccion_cliente: {
        publishPromptMessage: async (event, context) => {
          context.addMessage("Me podria dar la direccion a donde tiene que legar su pedido.");
        },
        validate: async (event, context) => {
          let direccionValue = event.newValue;
          let alpha_usuario = context._response.context.variables.alpha_usuario.value;
          console.log({ alpha_usuario });
          console.log({ direccionValue });

          context.setVariable(
            "alpha_usuario",
            editAlpha(alpha_usuario, [
              { key: "direccion_cliente", value: direccionValue },
            ])
          );
          return true;
        },
      },
      corfirmacion_datos: {
        publishPromptMessage: async (event, context) => {
          let alpha_usuario = context._response.context.variables.alpha_usuario.value;
          let payload = {
            type: "text",
            text: "¿Son correctos sus datos?",
            actions: [
              {
                type: "postback",
                label: "Si, continuar",
                postback: { variables: { cliente: "Si" } },
              },
              {
                type: "postback",
                label: "No, corregir",
                postback: { variables: { cliente: "No" } },
              },
            ],
          };
          context.addMessage(`Datos cliente\n Nombre: ${alpha_usuario.nombre_cliente}\n Telefono: ${alpha_usuario.numero_cliente}\n Direccion: ${alpha_usuario.direccion_cliente}`)
          context.addMessage(payload);
        },
        validate: async (event, context) => {
          let corfirmacion_datos = event.newValue;
          console.log({corfirmacion_datos})
          if(corfirmacion_datos = "Si"){
            return true;
          }else{
            context.clearItemValue("nombre_cliente");
            context.clearItemValue("numero_cliente");
            context.clearItemValue("direccion_cliente");
            context.clearItemValue("corfirmacion_datos");
            return false;
          }
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

