<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = [
            #Symfony Bundles
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),

            #Doctrine Bundles
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),

            #FOS Bundles
            new FOS\RestBundle\FOSRestBundle(),
            new FOS\UserBundle\FOSUserBundle(),
            new FOS\OAuthServerBundle\FOSOAuthServerBundle(),
            new FOS\JsRoutingBundle\FOSJsRoutingBundle(),

            #SSO
            new Http\HttplugBundle\HttplugBundle(), // If you require the php-http/httplug-bundle package.
            new HWI\Bundle\OAuthBundle\HWIOAuthBundle(),

            #JMS: Translation, routing, serialization
            new JMS\SerializerBundle\JMSSerializerBundle(),
            new JMS\DiExtraBundle\JMSDiExtraBundle(),
            new JMS\AopBundle\JMSAopBundle(),
            new JMS\I18nRoutingBundle\JMSI18nRoutingBundle(),
            new JMS\TranslationBundle\JMSTranslationBundle(),

            #Api, Doc, Upload Media Image, Ckeditor, Generating JWT Token
            new Nelmio\CorsBundle\NelmioCorsBundle(),
            new Nelmio\ApiDocBundle\NelmioApiDocBundle(),
            new Lexik\Bundle\JWTAuthenticationBundle\LexikJWTAuthenticationBundle(),
            new Knp\Bundle\SnappyBundle\KnpSnappyBundle(),
            new Ivory\CKEditorBundle\IvoryCKEditorBundle(),
            new Vich\UploaderBundle\VichUploaderBundle(),
            new EasyCorp\Bundle\EasyAdminBundle\EasyAdminBundle(),

            #VatNumber Check
            new Ddeboer\VatinBundle\DdeboerVatinBundle(),

            #Cookies consent - loi union européene
            new Indigo\Bundle\CookieConsentBundle\IndigoCookieConsentBundle(),

            # Our Bundles
            new AppBundle\AppBundle(),
            new GC\HomeBundle\GCHomeBundle(),
            new GC\EvenementBundle\GCEvenementBundle(),
            new GC\ReservationBundle\GCReservationBundle(),
            new GC\UserBundle\GCUserBundle(),
            new Webonaute\DoctrineFixturesGeneratorBundle\DoctrineFixturesGeneratorBundle(),
            new Bmatzner\FontAwesomeBundle\BmatznerFontAwesomeBundle(),
        ];
        if (in_array($this->getEnvironment(), array('prod'))) {
            $bundles[] = new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle();
        }
        if (in_array($this->getEnvironment(), ['dev', 'test'], true)) {
            $bundles[] = new Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle();

            if ('dev' === $this->getEnvironment()) {
                $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
                $bundles[] = new Symfony\Bundle\WebServerBundle\WebServerBundle();
            }
        }

        return $bundles;
    }

    public function getRootDir()
    {
        return __DIR__;
    }

    public function getCacheDir()
    {
        return dirname(__DIR__).'/var/cache/'.$this->getEnvironment();
    }

    public function getLogDir()
    {
        return dirname(__DIR__).'/var/logs';
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load($this->getRootDir().'/config/config_'.$this->getEnvironment().'.yml');
    }
}
