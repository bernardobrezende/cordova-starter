app.factory('storageService', ['localStorageService', function (localStorageService) {

    /* REGRAS DE IMPLEMENTACOES
     *
     * add: adiciona um novo valor ao storage.
     *      @key(String): a chave do objeto.
     *      @value(Object): o valor do objeto a ser armazenado.
     *      @return(Boolean): true se armazenou, false se nao.
     *
     * remove: remove um objeto do armazenamento pela chave.
     *      @key(String): a chave do objeto a ser removido.
     *      @return(Boolean): true se removeu, false se nao.
     *
     * get: busca um objeto do armazenamento por sua chave.
     *      @key(String): a chave do objecto no armazenamento.
     *      @return(Object): o objeto no armazenamento.
     *      @return(Boolean): true se eh suportado, false se nao.
     *
    */

    /**
     * Implementacao para armazenamento via local storage.
    */
    var localStorage = {

        add: function (key, value) {
            return localStorageService.set(key, value);
        },

        remove: function (key) {
            return localStorageService.remove(key);
        },

        get: function (key) {
            return localStorageService.get(key);
        }
    };


    return localStorage;

}]);