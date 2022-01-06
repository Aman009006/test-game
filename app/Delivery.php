<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'delivery';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user','name', 'country', 'city', 'postalcode', 'dom', 'kvartira', 'street', 'phone'];

}
