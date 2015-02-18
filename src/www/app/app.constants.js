'use strict';

/**
 * Valores globais da aplicacao.
*/
app.constant('globalValues', {

    /**
     * Url de acesso a API de clientes.
    */
    /*DEV*/
    URL_CUSTOMER_API: "http://private-anon-40482260a-hpmobileapi.apiary-mock.com/",

    /*HLG*/
    //URL_CUSTOMER_API: "http://private-anon-40482260a-hpmobileapi.apiary-mock.com/",

    /*PRD*/
    //URL_CUSTOMER_API: "http://private-anon-40482260a-hpmobileapi.apiary-mock.com/",

    /**
     * Se deve verificar e bloquear o acesso ‡ api de cliente se o certificado
     * digital estiver expirado ou inv·lido.
    */
    CHECK_CUSTOMER_API_CERTIFICATE: false,

    /**
     * Caminho dos arquivos de imagem.
    */
    CARD_IMG_PATH: "assets/img/"
});

/**
 * Status de autenticacao do usuario
*/
app.constant('customerStatusEnum', {
    // usuario ativo no sistema.
    ACTIVE: "ACTIVE",

    // usuario nao pode logar no sistema.
    UNAUTHORIZED: "UNAUTHORIZED",

    // usuario desativado
    DESACTIVED: "DESACTIVED"
});

/**
 * Eventos da aplicacao.
*/
app.constant('appEventsEnum', {

    // dispositivo nao conectado a internet.
    NO_NETWORK: 'NO_NETWORK',

    // o servico de clientes esta indisponÌvel ou com erro.
    CUSTOMER_API_ERROR: 'CUSTOMER_API_ERROR',

    // o dispositivo est· com internet, mas n„o obtÈm resposta de rede.
    CUSTOMER_API_CANT_REACHED: 'CUSTOMER_API_CANT_REACHED',

    // o usu·rio precisa se logar novamente na aplicaÁ„o.
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',

    // evento disparado quando o usu·rio trocar o cart„o selecionado.
    CHANGE_SELECTED_CARD: 'CHANGE_SELECTED_CARD',

    // erro disparado quando o certificado digital estiver inv·lido.
    SSL_CERTIFICATE_ERROR: 'SSL_CERTIFICATE_ERROR'

});