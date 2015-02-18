app.factory('authService', ['$http', '$q', 'globalValues', 'customerStatusEnum', 'storageService', 'formatterService',
                function ($http, $q, globalValues, customerStatusEnum, storageService, formatterService) {
    
                    
    return {
            
        /**
         * Autentica o usuario no sistema.
         * @cpf(String): o cpf do usuario.
         * @password(String): a senha do usuario.
         *
         * @return(Object): retorna a promise da requisicao.
        */
        authenticate: function(cpf, password) {
            
            var deferred = $q.defer();

            $http.post(
                globalValues.URL_CUSTOMER_API + 'authentication', 
                {
                    CPF: formatterService.removeNotNumbers(cpf),
                    Password: password
                }
            ).then(
                // success
                function (response) {

                    // autenticado
                    if (response.data.CustomerStatus && response.data.CustomerStatus == customerStatusEnum.ACTIVE) {
                        deferred.resolve(response.data);
                    }
                    else {
                        deferred.reject({ message: 'Usuário inativo.' })
                    }
                },
                
                // error
                function(rejection) {
                    deferred.reject(rejection);
                }
            );

            return deferred.promise;
        }
        
    };
}]);