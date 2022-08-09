<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ComGroup extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $table = 'com_group';

    protected $primaryKey = 'group_code';

    protected $guarded = [];

    public $timestamps = false;

    protected $keyType = 'string';
}
