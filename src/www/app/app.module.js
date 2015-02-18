'use strict';

var app = angular.module(APPLICATION_ID, ["LocalStorageModule", "cordovaHTTP"]);


/*===================================================
                    CONFIGURATIONS
=====================================================*/

app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('hermesPardiniConsultaExamesAppData')
        .setStorageType('localStorage')
        .setNotify(true, true);
}]);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});


/*===================================================
                   RUN ANGULAR
=====================================================*/

app.run(['$rootScope', '$location', '$timeout', 'globalValues', 'authService', 'storageService', 'appEventsEnum', 'notificationService', 'globalResource', 'deviceService', 'cordovaHTTP', 'loggedCustomerService', '$http',

    function ($rootScope, $location, $timeout, globalValues, authService, storageService, appEventsEnum, notificationService, globalResource, deviceService, cordovaHTTP, loggedCustomerService, $http) {

        if (globalValues.CHECK_CUSTOMER_API_CERTIFICATE) {
            /**
             * Configura para somente fazer chamadas â€¡ api em conexÄ±es seguras.
            */
            cordovaHTTP.enableSSLPinning(true)
                .then(function (r) {
                    console.log("SSL Pinning enabled!");
                });

        }


        /*===================================================
                            APP EVENTS
        =====================================================*/

        /**
         * Evento disparado quando o dispositivo nao estiver
         * conectado na internet.
        */
        $rootScope.$on(appEventsEnum.NO_NETWORK, function () {

            var msgAlert = {
                message: globalResource.NO_NETWORK_CONNECTION_ERROR,
                onClose: null,
                title: globalResource.APP_TITLE,
                btnText: "Ok"
            };

            notificationService.alert(msgAlert);
        });


        /**
         * Evento disparado quando o dispositivo nao estiver
         * conectado na internet.
        */
        $rootScope.$on(appEventsEnum.CUSTOMER_API_ERROR, function () {

            var msgAlert = {
                message: globalResource.CUSTOMER_API_ERROR,
                onClose: null,
                title: globalResource.APP_TITLE,
                btnText: "Ok"
            };

            notificationService.alert(msgAlert);
        });


        /**
         * Evento disparado quando o dispositivo estiver conectado â€¡ internet
         * mas nâ€žo estiver conseguindo chegar no servidor.
        */
        $rootScope.$on(appEventsEnum.CUSTOMER_API_CANT_REACHED, function () {

            var msgAlert = {
                message: globalResource.NETWORK_AVAILABLE_BUT_NOT_AUTHENTICATED,
                onClose: null,
                title: globalResource.APP_TITLE,
                btnText: "Ok"
            };

            notificationService.alert(msgAlert);
        });


        /**
         * Evento disparado quando o usuÂ·rio nâ€žo tiver acesso â€¡ uma
         * action pof falta de autenticaÃâ€žo.
        */
        $rootScope.$on(appEventsEnum.TOKEN_EXPIRED, function (event, data) {

            var msgAlert = {
                message: globalResource.TOKEN_EXPIRED,
                onClose: function () {
                    window.location = 'index.html';
                },
                title: globalResource.APP_TITLE,
                btnText: "Ok"
            };

            notificationService.alert(msgAlert);
        });


        /**
         * Evento disparado quando o usuÂ·rio nâ€žo tiver acesso â€¡ uma
         * action pof falta de autenticaÃâ€žo.
        */
        $rootScope.$on(appEventsEnum.SSL_CERTIFICATE_ERROR, function (event, data) {

            var msgAlert = {
                message: globalResource.SSL_CERTIFICATE_ERROR,
                onClose: function () {
                    window.location = 'index.html';
                },
                title: globalResource.APP_TITLE,
                btnText: "Ok"
            };

            notificationService.alert(msgAlert);
        });

        if (loggedCustomerService.isLogged()) {
            $http.defaults.headers.common.Authorization = 'Basic ' + loggedCustomerService.getLoggedCustomer().Token;
        }
    }
]);