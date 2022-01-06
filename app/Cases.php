<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Cases extends Model
{
    protected $table = 'cases';
	
	protected $fillable = ['name', 'price', 'type' , 'image' ,'color', 'chance'];
    
    protected $hidden = ['created_at', 'updated_at'];
    
}