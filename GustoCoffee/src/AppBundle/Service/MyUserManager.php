<?php
/**
 * Created by PhpStorm.
 * User: MatrixOfDeath
 * Date: 14/09/2017
 * Time: 02:44
 */

namespace AppBundle\Service;

use FOS\UserBundle\Doctrine\UserManager;

class MyUserManager extends UserManager
{
    /**
     * @inheritdoc
     */
    public function findUserByUsernameOrEmail($usernameOrEmail)
    {
        $user = parent::findUserByUsernameOrEmail($usernameOrEmail);
        if (null === $user) {
            $userAddOnEmailRepo = $this->objectManager->getRepository('AppBundle:PersonneAddOnEmail');
            $userAddOnEmail = $userAddOnEmailRepo->findOneBy(['email' => $usernameOrEmail]);
            if ($userAddOnEmail) {
                $user = $userAddOnEmail->getPersonne();
            }
        }
        return $user;
    }
}