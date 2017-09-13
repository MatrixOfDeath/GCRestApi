<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 13/09/2017
 * Time: 15:42
 */

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RestRegistrationControllerTest extends WebTestCase
{
    public function testPostRegisterNewUser()
    {
        $data = [
            'username' => 'matko3',
            'email' => 'matko3@gmail.com',
            'plainPassword' => [
                'first' => 'test123', 'second' => 'test123'
            ]
        ];

        $client = $this->makePOSTRequest($data);

        $this->assertEquals(201, $client->getResponse()->getStatusCode());

    }

    public function testPostRegsiterNewUserWithInvalidEmail()
    {
        $data = [
            'username' => 'matko',
            'email' => 'matkasgasgashgamail.com',
            'plainPassword' => [
                'first' => 'test123', 'second' => 'test123'
            ]
        ];

        $client = $this->makePOSTRequest($data);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    private function makePOSTRequest($data)
    {
        $client = static::createClient();
        $client->request(
            'POST', '/api/user/register', array(), array(),
            array(
                'CONTENT_TYPE' => 'application/json',
            ),
            json_encode($data)
        );

        return $client;
    }
}