<?php

namespace Adw\AdwWorker\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ComGroup_m extends Model 
{

    protected $table = 'com_group';

    protected $primaryKey = 'group_code';

    protected $guarded = [];

    public $timestamps = false;

    protected $keyType = 'string';
}
