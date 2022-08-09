<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use OwenIt\Auditing\Contracts\Auditable;

class UsrEmployee extends Authenticatable implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use \App\Traits\TraitUuid;

    protected $table = 'usr_employee';

    protected $primaryKey = 'uem_id';

    protected $guarded = [];
}