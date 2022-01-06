<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Settings extends Model
{
    protected $table = 'settings';
	
	protected $fillable = ['group_id', 'group_link', 'min_pay', 'fk_id', 'fk_secret1', 'fk_secret2', 'free_case', 'd_price'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}