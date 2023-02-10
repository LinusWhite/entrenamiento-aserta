"use strict";
module.exports = {
    metadata: {
        name: "orden",
        eventHandlerType: "ResolveEntities",
    },
    handlers: {
        entity: {},
        items: {
            pizza: {
                publishPromptMessage: async (event, context) => {
                    let payload = {
                        type: "text",
                        text: "¿Que pizza deseas? (precio $100)",
                        actions: [
                            {
                                type: "postback",
                                label: "Hawaina",
                                postback: { variables: { orden: "Hawaina" } },
                            },
                            {
                                type: "postback",
                                label: "Peperoni",
                                postback: { variables: { orden: "Peperoni" } },
                            },
                            {
                                type: "postback",
                                label: "Queso",
                                postback: { variables: { orden: "Queso" } },
                            },
                        ],
                    };
                    context.addMessage(payload);
                },
                validate: async (event, context) => {
                    let sabor_pizza = event.newValue.value;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    console.log({ alpha_usuario });
                    console.log({ sabor_pizza });

                    context.setVariable(
                        "alpha_usuario",
                        editAlpha(alpha_usuario, [
                            { key: "sabor_pizza", value: sabor_pizza },
                            { key: "pizza_precio", value: 100 }
                        ])
                    );
                    return true;
                },
            },
            queso_orilla: {
                publishPromptMessage: async (event, context) => {
                    let payload = {
                        type: "text",
                        text: "¿Deseas queso en las orillas? ( mas $15 )",
                        actions: [
                            {
                                type: "postback",
                                label: "Si, con queso en la orilla",
                                postback: { variables: { orden: "SI" } },
                            },
                            {
                                type: "postback",
                                label: "Sin queso en la orilla",
                                postback: { variables: { orden: "NO" } },
                            },
                        ],
                    };
                    context.addMessage(payload);
                },
                validate: async (event, context) => {
                    let quesoOrilla = event.newValue.value;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    console.log({ alpha_usuario });
                    console.log({ quesoOrilla });
                    if (quesoOrilla == "SI") {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "orilla_queso", value: true },
                                { key: "queso_precio", value: 15 }
                            ])
                        );
                        return true
                    } else {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "orilla_queso", value: false },
                                { key: "queso_precio", value: 0 }
                            ])
                        );
                        return true
                    }

                }
            },
            extras: {
                publishPromptMessage: async (event, context) => {
                    let payload = {
                        type: "text",
                        text: "¿Deseas algun complemento? (precio $55)",
                        actions: [
                            {
                                type: "postback",
                                label: "Papas a la francesa",
                                postback: { variables: { orden: "Papas" } },
                            },
                            {
                                type: "postback",
                                label: "Papas gajo",
                                postback: { variables: { orden: "Gajo" } },
                            },
                            {
                                type: "postback",
                                label: "Sin extra",
                                postback: { variables: { orden: "niguno" } },
                            },
                        ],
                    };
                    context.addMessage(payload);
                },
                validate: async (event, context) => {
                    let extras = event.newValue;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    console.log({ alpha_usuario });
                    console.log({ extras });
                    if (extras != "niguno") {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "extra", value: true },
                                { key: "nombre_extra", value: extras },
                                { key: "extra_precio", value: 55 }
                            ])
                        );
                        return true;
                    } else {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "extra", value: false },
                                { key: "nombre_extra", value: extras },
                                { key: "extra_precio", value: 0 }
                            ])
                        );
                        return true;
                    }

                },
            },
            servicio: {
                publishPromptMessage: async (event, context) => {
                    let payload = {
                        type: "text",
                        text: "¿Deseas incluir el sercio? ( servilletas, salsas y platos de carton, sin costo adicional )",
                        actions: [
                            {
                                type: "postback",
                                label: "Si, incluir servicio",
                                postback: { variables: { orden: "Si" } },
                            },
                            {
                                type: "postback",
                                label: "No sin servicio",
                                postback: { variables: { orden: "No" } },
                            },
                        ],
                    };
                    context.addMessage(payload);
                },
                validate: async (event, context) => {
                    let servicio = event.newValue.value;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    console.log({ alpha_usuario });
                    console.log({ servicio });
                    if (servicio == "SI") {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "servicio", value: true },
                            ])
                        );
                        return true;
                    } else {
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "servicio", value: false },
                            ])
                        );
                        return true;
                    }

                },
            },
            comentarios: {
                publishPromptMessage: async (event, context) => {
                    context.addMessage("Si tienes algun comentario agregar en este momento, si no tiene comentarios agregue la palabra 'ninguno'")
                },
                validate: async (event, context) => {
                    let comentario = event.newValue;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    console.log({ alpha_usuario });
                    console.log({ comentario });
                    context.setVariable(
                        "alpha_usuario",
                        editAlpha(alpha_usuario, [
                            { key: "comentario", value: comentario },
                        ])
                    );

                }
            },
            corfirmar_orden: {
                publishPromptMessage: async (event, context) => {
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    let orilla = alpha_usuario.orilla_queso ? "Con orilla de queso" : "Sin orilla de queso";
                    let extra = alpha_usuario.extra ? alpha_usuario.nombre_extra : "Sin extras";
                    let servicio = alpha_usuario.servicio ? "Con servicio" : "Sin servicio";
                    let suma = alpha_usuario.pizza_precio + alpha_usuario.pizza_precio + alpha_usuario.queso_precio + alpha_usuario.extra_precio
                    console.log({ suma })
                    let payload = {
                        type: "text",
                        text: "¿es correcta su orden?",
                        actions: [
                            {
                                type: "postback",
                                label: "Si, ordenar",
                                postback: { variables: { cliente: "Si" } },
                            },
                            {
                                type: "postback",
                                label: "No, corregir",
                                postback: { variables: { cliente: "No" } },
                            },
                        ],
                    };
                    context.addMessage(`Datos orden\n Pizza: ${alpha_usuario.sabor_pizza}\n queso_orilla: ${orilla}\n Extra: ${extra}\n servicio: ${servicio}\n comentarios: ${alpha_usuario.comentario}\n Total: ${suma}`)
                    context.addMessage(payload);
                },
                validate: async (event, context) => {
                    let confirmar = event.newValue.value;
                    let alpha_usuario = context._response.context.variables.alpha_usuario.value;
                    let suma = alpha_usuario.pizza_precio + alpha_usuario.pizza_precio + alpha_usuario.queso_precio + alpha_usuario.extra_precio;
                    console.log("*******************************************************************")
                    console.log("*******************************************************************")
                    console.log("*******************************************************************")
                    console.log("*******************************************************************")
                    console.log({ confirmar });
                    if (confirmar == "SI") {
                        console.log({ alpha_usuario });
                        console.log({ suma });
                        context.setVariable(
                            "alpha_usuario",
                            editAlpha(alpha_usuario, [
                                { key: "total", value: suma },
                            ])
                        );
                        return true;
                    } else {
                        context.clearItemValue("pizza");
                        context.clearItemValue("queso_orilla");
                        context.clearItemValue("extras");
                        context.clearItemValue("servicio");
                        context.clearItemValue("corfirmar_orden");
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

