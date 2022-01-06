<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Promohistory extends Model
{
    protected $table = 'promo_history';
	
	protected $fillable = ['user', 'code'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}