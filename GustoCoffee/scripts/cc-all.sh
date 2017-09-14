#!/usr/bin/env bash
php bin/console cache:clear --no-warmup
php bin/console cache:clear --env=PROD --no-warmup