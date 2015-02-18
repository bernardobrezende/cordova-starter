/*
 * AQUI FICAM AS INICIALIZACOES DO APLICATIVO, BEM COMO
 * OS VALORES FIXOS E EVENTOS GLOBAIS.
*/

/**
 * Nome da aplicaçao.
*/
var APPLICATION_ID = "HermesPardiniConsultaExamesApp";

/*=============================================
                BOOTSTRAPER
===============================================*/
var appBootstrap = {
    
    initialize: function() {

    	if (window.cordova) {
    		window.setLoadEvent(function(){
            	angular.bootstrap(document, [APPLICATION_ID]);
        	});	
    	} else {
            angular.bootstrap(document, [APPLICATION_ID]);
    	}

    }
}

/**
 * Configura uma função para ser executada no load do aplicativo.
 * @fn(Function): a função a ser executada.
*/
window.setLoadEvent = function(fn) {
    document.addEventListener('deviceready', fn, true);
}