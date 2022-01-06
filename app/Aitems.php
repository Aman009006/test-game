<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Aitems extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'aukcion_items';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['auc_id','name', 'image','price', 'desc'];

    public $timestamps = false;

}
