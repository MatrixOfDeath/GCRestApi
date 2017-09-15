<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 13/09/2017
 * Time: 16:51
 */

namespace Tests\AppBundle\Controller;

use Tests\ApiTestCaseBase;


class RestLoginControllerTest extends ApiTestCaseBase
{
    public function testPOSTLoginUser()
    {
        $userName = "karim.boubrit";
        $password = "test";

        $user = $this->createUser($userName, $password);

        $this->client->request(
            'POST',
            '/api/user/login',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'PHP_AUTH_USER' => $userName,
                'PHP_AUTH_PW'   => $password,
            ]
        );

        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $responseArr = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $responseArr);

    }

    public function testPOSTLoginUserWitAddOnEmail()
    {
        $userName = "karim.boubrit";
        $password = "test";
        $addOnEmail = "kboubrit2@gmail.com";
        $user = $this->createUser($userName, $password, $addOnEmail);
        $this->client->request(
            'POST',
            '/api/user/login',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'PHP_AUTH_USER' => $addOnEmail,
                'PHP_AUTH_PW'   => $password,
            ]
        );
        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $responseArr = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $responseArr);
    }

        public function testPOSTLoginUserWithWrongUsername()
    {
        $userName = "krim";
        $password = "test";
        $user = $this->createUser($userName, $password);
        $response = $this->client->request(
            'POST',
            '/api/user/login',
            [],
            [],
            [
                'CONTENT_TYPE' => 'application/json',
                'PHP_AUTH_USER' => $userName.'wrong_username',
                'PHP_AUTH_PW'   => $password,
            ]
        );
        $this->assertEquals(404, $this->client->getResponse()->getStatusCode());
        $responseArr = json_decode($this->client->getResponse()->getContent(), true);

        //$this->assertEquals('Not Found', $responseArr['error']['message']);


    }

}