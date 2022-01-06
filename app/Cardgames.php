<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Cardgames extends Model
{
    protected $table = 'cardgames';
	
	protected $fillable = ['bet', 'case' ,'user', 'status', 'type', 'opened', 'items', 'item_2', 'cards', 'garant', 'demo'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}