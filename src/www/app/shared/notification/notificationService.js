'use strict';

/**
 * Servico de notificacao do dispositivo.
*/
app.factory('notificationService', [function () {
    
    return {
            
        /**
         * Mostra uma mensagem para o usuario.
         * @message(Object)
         *      + message(String): a mensagem a ser exibida para o usuário.
         *      + onClose(Function): uma função a ser executada quando fechar a mensagem.
         *      + title(String): o titulo da mensagem.
         *      + btnText(String): o texto do botão.
        */
        alert: function(params) {
            
            var _params = {
                message: "",
                onClose: null,
                title: "Aviso",
                btnText: "Ok"
            };
            
            $.extend(_params, params);
            
            if(navigator.notification && navigator.notification.alert) {
                navigator.notification.alert(
                    _params.message, 
                    _params.onClose, 
                    _params.title, 
                    _params.btnText
                );
            }
            else {
                window.alert(_params.message);
                
                if(_params.onClose) {
                    _params.onClose();
                }
            }
            
        },
        
        /**
         * Mostra uma questão para o usuario.
         * @params(Object)
         *      + message(String): a mensagem a ser exibida para o usuário.
         *      + onConfirm(Function): uma função a ser executada quando confirmar.
         *      + title(String): o titulo da mensagem.
         *      + buttonLabels(Array): ["NomeBotaoOk", "NomeBotaoCancelar"].
        */
        confirm: function(params) {
            
            var _params = {
                message: "",
                //@result(Number): o numero do botao pressionado (começa em 1)
                onConfirm: function(result){},
                title: "Pergunta",
                buttonLabels: ["Ok", "Cancelar"]
            };
            
            $.extend(_params, params);
            
            if(navigator.notification && navigator.notification.confirm) {
                navigator.notification.confirm(
                    _params.message,
                    _params.onConfirm,
                    _params.title,
                    _params.buttonLabels
                );
            }
            else {
                var c = window.confirm(_params.message);
                
                if(c && _params.onConfirm) {
                    _params.onConfirm();
                }
            }
        }
        
    };
}]);




