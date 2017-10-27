GustoCoffee Infos by KB
===========

Projet GustoCoffee  Symfony **3.3.9** -> to be migrated to  3.4LTS 

#Pre-requirements
Install composer and launch composer install after git clone of this project
Install Yarn for MacOSX, or Node npm
Install JWT with the scripts

Create database with command in the documentation below
Launch script

#Basic config 
php bin/console server:run
php bin/console security:check
php bin/console assets:install --symlink

#Cache clear
php bin/console cache:clear --no-warmup && php bin/console cache:clear --env=PROD --no-warmup

// Ne fonctionne plus : php bin/console cache:clear --no-warmup (--env=prod|dev)

#Scripts & Commands
sh scripts/cc-all.sh 

#Debug
php bin/console debug:config fos_rest
php bin/console debug:router
php bin/console debug:translation fr AppBundle 
bin/console debug:container jwt

php bin/console fos:js-routing:dump

phpunit
phpunit --filter name_of_test

#Database
php bin/console doctrine:database:drop --force --env=test
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force

#Doctrine migration
php bin/console doctrine:migrations:status
php bin/console doctrine:migrations:generate
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate

#Reverse (todo first correct all entity and database)
php bin/console assetic:dump --env=prod --no-debug

#Translations all at once
php bin/console translation:extract en fr --dir=./src/ --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing
php bin/console translation:extract en fr --dir=./app/Resources/views --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing --output-format=xlf

--> Translation fr:
php bin/console translation:extract fr --dir=./src/ --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing 
php bin/console translation:extract fr --dir=./app/Resources/views --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing

--> Translation en:
php bin/console translation:extract en --dir=./src/ --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing
php bin/console translation:extract en --dir=./app/Resources/views --output-dir=./app/Resources/translations --enable-extractor=jms_i18n_routing --output-format=xlf	

#Assetic 
 php bin/console assetic:dump
 php bin/console assetic:watch


#Compile les assets Sass !
yarn run encore dev
// Attends dés qu’un fichier source dans les assets est modifié il le recompile 

yarn run encore dev --watch
//Compile les sources et crée le fichier minifié! A versionner donc !
 yarn run encore production

Accessoirement j’ai mis des commandes dans script pour vous facilitez les commandes du dessus : 
//Pour compiler sans compressé pour suivre les debug
npm run dev 
// pour le minified 
npm run prod

#Fixtures 
php bin/console doctrine:fixtures:load --append  #append les données sinon Purge !!!

#Generate Fixtures from Entity and Database
php bin/console doctrine:generate:fixture --entity=AppBundle:Annonce--ids="12 534 124" --name="bug43" --order="1" #Exemple
php bin/console doctrine:generate:fixture --snapshot --overwrite


**TODO Bundles**
new Bazinga\Bundle\JsTranslationBundle\BazingaJsTranslationBundle(),

#Test unitaires PhPunit, CasperJS, JMeter
./vendor/bin/simple-phpunit

export PATH=/Applications/MAMP/bin/php/php7.1.8/bin:$PATH
passphrase: var/jwt : gustocoffee


#Numéro de TVA Intracommunautaire existant et valide
Exemple la FNAC: FR92428581755

#TVA Française calcule et exemples
-Comment calculer le Prix HT et la TVA à 20% à partir du prix TTC ?
Pour calculer le prix HT, il faut diviser le prix TTC par 1.20
Exemple : 100 euros TTC/1.20 = 83,33 Euros
TVA = 100 - 83,33 soit 16,67 euros

-Comment calculer le Prix TTC et la TVA 20% à partir du prix HT ?
Pour calculer le prix TTC, il faut multiplier le prix HT par 1.20
Exemple : 100 euros TTx1.20 =120 Euros
TVA = 120 - 100 soit 20 euros

-Comment calculer le Prix HT et la TVA à 10% à partir du prix TTC ?
Pour calculer le prix HT, il faut diviser le prix TTC par 1.10
Exemple : 100 euros TTC/1.10 = 90,91 Euros
TVA = 100 - 90,91 soit 9,09 euros. 

-Comment calculer le Prix TTC et la TVA à 10% à partir du prix HT ?
Pour calculer le prixTTC, il faut multiplier le prix HT par 1,.10
Exemple : 100 euros TTCx1.10 = 110Euros 
TVA = 110 - 100 soit 10 euros. 


#Card numbers available for testing Payment API
Using TEST mode, the following test cards are available for testing your integration:

Test cards numbers	Expected

`4242 4242 4242 4242` Visa  Success 

`5500 0055 5555 5559` MasterCard Success

`4000 0000 0000 0051` Visa	Failure code: card_declined

`4000 0000 0000 0085` Visa	Failure code: processing_error

`4000 0000 0000 0077` Visa	Failure code: insufficient_funds

`5184 6800 0000 0170` MasterCard	Failure code: ds_declined

`5184 6800 0000 0097` MasterCard	Failure code: incorrect_number

`5184 6800 0000 0121` MasterCard	Failure code: fraud_suspected

#Generating Factures PDF in /Facturation with command: 
php bin/console gustocoffee:facture "DateCommande"