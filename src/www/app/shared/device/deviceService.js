'use strict';

/**
 * Servico de informacao de infraestrutura do aparelho.
*/
app.factory('deviceService', [function() {
    
    /**
     * Informacoes de rede e conectividade.
    */
    var network = {
        
        /**
         * Verifica se o dispositivo esta conectado na internet.
         * @return(Boolean): true se estiver conectado, false se nao estiver.
        */
        online: function() {
            
            if(navigator.connection && navigator.connection.type) {
                return navigator.connection.type != Connection.NONE;
            }
            else if(navigator.onLine) {
                return navigator.onLine;
            }
            
            return false;
        },
        
        /**
         * Busca o tipo de conexao atual.
         * @return(String): o nome da conexao que esta abilitada no aparelho.
        */
        getConnectionType: function() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            return states[networkState];
        }
    };
    
    /**
     * Informacoes do aparelho.
    */
    var device = {
        
        /**
         * Busca o modelo do aparelho.
         * @return(String)
        */
        getModel: function(){
            
            if(!window.device) {
                return "";
            }
            
            return window.device.model;
        },
        
        /**
         * Busca o id universal do aparelho.
         * @return(String)
        */
        getUUID: function(){
            if(!window.device) {
                return "";
            }
            
            return window.device.uuid;   
        },
        
        /**
         * Busca o SO do dispositivo.
         * @return(String)
        */
        getPlatform: function(){
            
            if(!window.device) {
                return window.cordova ? window.cordova.platformId : "";
            }
            
            return window.device.platform;   
        },
        
        /**
         * Verifica se o dispositivo é IOS.
         * @return(Boolean)
        */
        isIOS: function() {
            return this.getPlatform().toUpperCase() === "IOS";
        }
    };
    
    return {
      network: network,
      device: device
    };  
}]);