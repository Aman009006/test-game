<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Items extends Model
{
    protected $table = 'items';
	
	protected $fillable = ['name', 'price', 'type', 'image', 'case', 'in_shop'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}
