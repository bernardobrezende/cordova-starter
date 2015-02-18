# Instalação e configuração de ambiente

1. Instalar [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
2. Instalar [NodeJS](http://nodejs.org/)
3. (**Apenas Windows**): Instalar [GIT](http://git-scm.com/downloads)
4. Instalar [Android SDK](http://developer.android.com/sdk/index.html#Other)
5. Instalar [Ant](http://ant.apache.org/bindownload.cgi)
6. Criar uma variável de ambiente chamada **ANDROID_HOME** que aponta para **android-sdk** (é preciso apontar o endereço completo onde foi instalado o SDK do passo 2)
7. Editar a variável de ambiente **PATH** e adicionar ao final:
	1. `;%ANDROID_%HOME\tools`
8. Abrir o Windows PowerShell / Terminal / Bash e digitar:
	1. `$ android`
9. No gerenciador de SDKs Android, baixe o "**SDK Platform**" da API 19. (não é necessário baixar os outros itens)
10. No gerenciador de SDKs Android, baixe o "**SDK Build Tools**" da API 19.1
11. Baixar o repositório no TFS
12. No Windows PowerShell / Terminal / Bash, navegar até a pasta **src** onde está o código baixado do projeto.
13. `$ npm install -g grunt-cli bower cordova`
14. `$ npm install`
16. `$ bower install`
17. `$ cordova platform add android`
18. (**Apenas MacOSX**): `$ cordova platform add ios`

# Executar aplicativo em dispositivos

## Android

`$ cordova run android`

## iOS

`$ cordova build ios`  
`$ cordova run ios`

# Tarefas para desenvolvimento local

## Rodar servidor web local

`$ grunt s`

## Executar testes

`$ grunt test`

# Gerenciar dependências

## Instalar biblioteca com versão específica

`$ bower install angular#1.3.13 -S`

**Importante**: Sempre utilizar -S, para salvar no arquivo bower.json. Após instalar um pacote, avisar os colegas de projeto para que executem "bower install" quando baixarem o código.