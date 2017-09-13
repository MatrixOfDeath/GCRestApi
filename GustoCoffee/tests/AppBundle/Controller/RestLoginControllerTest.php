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
        $userName = "testuser";
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

}