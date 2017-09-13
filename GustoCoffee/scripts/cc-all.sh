#!/usr/bin/env bash
php bin/console cache:clear --no-warmup
php bin/console cache:clear --env=prod --no-warmup
php bin/console cache:clear --env=test --no-warmup