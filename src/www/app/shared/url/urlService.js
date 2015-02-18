'use strict';

/**
 * Servico com utilitários para URLs.
*/
app.factory('urlService', [function () {

  return {

    /**
     * Abre uma url no navegador do dispositivo.
     * @url(String): a url de destino.
     * @openExternal(Boolean): se deve abrir em uma nova guia/janela.
    */
    open: function (url) {
        
      window.open(url, '_system', 'location=no');
    }
  }
}]);