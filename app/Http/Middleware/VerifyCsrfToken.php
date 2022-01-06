<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/sale',
		'/newGame',
		'/checkCard',
		'/sale2',
		'/getCard',
		'/checkCard2',
		'/getGarant',
		'/updateDelivery',
		'/deliverFast',
		'/open',
		'/takeBonus',
		'/activate',
		'/promo',
		'/api/stats',
		'/api/last'
    ];
}
