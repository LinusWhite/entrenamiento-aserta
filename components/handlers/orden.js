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

                },
                validate: async (event, context) => {

                },
            },
            queso_orilla: {
                publishPromptMessage: async (event, context) => {

                },
                validate: async (event, context) => {


                }
            },
            extras: {
                publishPromptMessage: async (event, context) => {

                },
                validate: async (event, context) => {


                },
            },
            servicio: {
                publishPromptMessage: async (event, context) => {
                    
                },
                validate: async (event, context) => {
                    

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

