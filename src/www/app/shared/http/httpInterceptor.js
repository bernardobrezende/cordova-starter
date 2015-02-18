'use strict';

/**
* Interceptor de requisições da aplicação.
*/
app.factory('httpInterceptor', ['$q', '$rootScope', 'deviceService', 'globalResource', 'appEventsEnum', 'globalValues', 'cordovaHTTP', function ($q, $rootScope, deviceService, globalResource, appEventsEnum, globalValues, cordovaHTTP) {

	return {
		/**
		 * Disparado em todas as requisições.
		 * @config(Object): parâmetros da requisição ajax.
		*/
		'request': function(config) {
			$rootScope.showSpinner = true;
			$rootScope.$broadcast('ajaxRequest');
			
			var deffered = $q.defer();
			
			if(!deviceService.network.online()) {
				$rootScope.$broadcast(appEventsEnum.NO_NETWORK);
				return $q.reject();
			}            
			
			if(globalValues.CHECK_CUSTOMER_API_CERTIFICATE) {
					
				var urlToCheck = globalValues.URL_CUSTOMER_API + 'system/check';

				cordovaHTTP.get(urlToCheck, {}, {})
					.then(function(response){
						deffered.resolve(config);
					})
					.catch(function(response){
						$rootScope.$broadcast(appEventsEnum.SSL_CERTIFICATE_ERROR);
						deffered.reject();
					});
			}
			else {
				deffered.resolve(config);
			}
			
			return deffered.promise;
		},

		/**
		 * Disparado quando uma requisição inválida é acionada.
		 * @rejection(Object): objeto contendo informações da requisição.
		*/
		'requestError': function(rejection) {
			$rootScope.showSpinner = false;
			$rootScope.$broadcast('ajaxRequestError');
			return $q.reject(rejection);
		},


		/**
		 * Disparado na resposta de todas as requisições que resultarem em sucesso.
		 * @response(Object): objeto contendo os dados de resposta da requisição.
		*/
		'response': function(response) {
			$rootScope.showSpinner = false;
			$rootScope.$broadcast('ajaxResponse');
			
			// todas as chamadas para a api de clientes retornam json.
			// se alguma retornar uma string, ocorreu um erro.
			// este erro é normalmente ocasionado por falta de autenticação na rede
			// de internet local.
			if(response.config.url.indexOf(globalValues.URL_CUSTOMER_API) > -1) {
					
				if(response.data && typeof response.data === 'string') {
					$rootScope.$broadcast(appEventsEnum.CUSTOMER_API_CANT_REACHED);
					return $q.reject();
				}
			}
			
			return response;
		},

		/**
		 * Disparado na resposta de todas as requisições que resultarem em erro.
		 * @rejection(Object): objeto contendo os dados de resposta da requisição.
		*/
		'responseError': function(rejection) {
			$rootScope.showSpinner = false;
			$rootScope.$broadcast('ajaxResponseError');
			
			// algumas requisições são tratadas por eventos globais,
			// como NO_NETWORK. Então o rejection vem 'undefined' porque já
			// foi tratado anteriormente.
			if(!rejection) {
				return $q.reject();
			}
			
			if(rejection.status >= 500 && rejection.status <= 600) {
				$rootScope.$broadcast(appEventsEnum.CUSTOMER_API_ERROR);
				return $q.reject();
			}
			
			if(rejection.status == 401) {
					
				if(rejection.data && rejection.data.TokenExpired) {
					$rootScope.$broadcast(appEventsEnum.TOKEN_EXPIRED); 
					return $q.reject();
				}
			}
			
			return $q.reject(rejection);
		}
	}
}]);