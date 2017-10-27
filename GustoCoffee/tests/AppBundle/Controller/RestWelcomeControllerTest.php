<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 13/09/2017
 * Time: 18:41
 */


namespace Tests\AppBundle\Controller;

use Tests\ApiTestCaseBase;

class RestWelcomeControllerTest extends ApiTestCaseBase
{
    //Chemin de notre route (récupéré la route automatiquement)
    private $route = '/api/user/welcome';

    public function testGETWelcomeMessageForUser()
    {
        $token = $this->getTokenForTestUser();

        $this->client->request(
            'GET',
            '/api/user/welcome',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json',
                'HTTP_AUTHORIZATION' => 'Bearer '.$token],
            []
        );

        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $this->assertEquals('Bonjour utilisateur.', json_decode($this->client->getResponse()->getContent(), true));
    }

    public function testGETWelocmeMessageAsUnauthorizedUser()
    {
        $this->client->request(
            'GET',
            '/api/user/welcome',
            [],
            [],
            ['CONTENT_TYPE' => 'application/json'],
            []
        );

        $this->assertEquals(401, $this->client->getResponse()->getStatusCode());
    }

    /**
     * Creates some user and returns his token
     *
     * @return string
     */
    private function getTokenForTestUser()
    {
        $userName = "kboubrit";
        $password = "testtest";

        $user = $this->createUser($userName, $password);

        $token = $this->getService('lexik_jwt_authentication.encoder.default')
            ->encode(['username' => 'kboubrit']);

        return $token;
    }
}