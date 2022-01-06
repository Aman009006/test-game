<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Promo extends Model
{
    protected $table = 'promocodes';
	
	protected $fillable = ['code', 'price', 'activation_count', 'activated'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}