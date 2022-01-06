<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Deliver extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'deliver';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user','item1', 'item2', 'item3', 'item4', 'item5', 'status','tracking'];

}
