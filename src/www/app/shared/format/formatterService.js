var app = angular.module(APPLICATION_ID);

/**
 * Servico de validacao de conteudo.
*/
app.factory('formatterService', [function () {

    return {

        /**
         * Remove os caracteres nao numericos de um texto.
         * @text(String): o texto a ser formatado.
         * 
         * @return(String): somente os numeros do texto informado.
        */
        removeNotNumbers: function (text) {
            return text.replace(/\D/g, '');
        },
        
        /**
         * Remove os caracteres que nao sao letras de um texto.
         * @text(String): o texto a ser formatado.
         * 
         * @return(String): somente as letras do texto informado.
        */
        removeNotLetters: function (text) {
            return text.replace(/[^A-Za-z]/g, '');
        },
        
        /**
         * Formata um objeto Number em uma string monetaria.
         * @number(Number): o numero a ser formatado.
         * @decimalSeparator(String): o separador decimal (default ',').
         * @thousandSeparador(String): o separador de milhar (default '.').
         * @options(Object):
         *      + prefix(String): o prefixo do valor (default 'R$').
         *
         * @return(String): o numero formatado.
        */
        formatToPTMoney: function(number, decimalSeparator, thousandSeparador, options){
            var n = number,
                c = 2, 
                d = decimalSeparator == undefined ? "," : d, 
                t = thousandSeparador == undefined ? "." : t, 
                s = n < 0 ? "-" : "", 
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
                j = (j = i.length) > 3 ? j % 3 : 0;
            
            var _options = {
                prefix: 'R$'
            };
            
            $.extend(_options, options);
            
            return _options.prefix + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
         }
    }
}]);