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
    let {alpha_usuario} = conversation.properties();
    console.log(alpha_usuario);
    alpha_usuario = JSON.parse(alpha_usuario);
    console.log(alpha_usuario);
    console.log(alpha_usuario.nombre_cliente);
    let body = {
      nombre_cliente: alpha_usuario.nombre_cliente,
      numero_cliente: alpha_usuario.numero_cliente,
      direccion_cliente: alpha_usuario.direccion_cliente,
      pizza: alpha_usuario.sabor_pizza,
      queso_orilla: alpha_usuario.orilla_queso,
      extras: alpha_usuario.nombre_extra,
      servicio: alpha_usuario.servicio,
      comentarios: alpha_usuario.comentario,
      cuenta_total: alpha_usuario.total,
    };
console.log(body)
conversation.reply(body)
/*     let config = {
      method: "POST",
      url: "https://demo-oda-dot-tamias-sps-dev.uc.r.appspot.com/api/pedido/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    try {
      conversation.logger().debug(`Request Method: ${config.method} URL:${config.url}`);
      conversation.logger().debug(`Request Payload: ${JSON.stringify(body)}`);

      await axios(config)
        .then(function (response) {
          // handle success
          conversation.logger().error("response.status", response.status);
          if (response.status === 200) {
            conversation.logger().info("response.data", JSON.stringify(response.data));
            const data = response.data;
            conversation.transition("success");
            conversation.keepTurn(true);
            done();
          } else {
            conversation.logger().error("Send KO - STATUS:", response.status);
            conversation.transition("failure");
            conversation.keepTurn(true);
            done();
          }
        })
        .catch((error) => {
          conversation.logger().error("Error en la petición");
          conversation.logger().error(error);
          conversation.transition("failure");
          conversation.keepTurn(true);
          done();
        });
    } catch (error) {
      conversation.logger().error("Error General");
      conversation.logger().error(error);
      conversation.transition("failure");
      conversation.keepTurn(true);
      done();
    } */
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


