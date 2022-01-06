<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'history';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['item','user', 'case','status', 'type', 'chance'];

    public $timestamps = false;

}
