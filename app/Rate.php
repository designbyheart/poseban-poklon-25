<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $fillable = ['value', 'rate_date'];

    public function currency(){
        return $this->belongsTo('App\Currency');
    }

    public function validateDate($date, $currency_id){

        $existing_rate = Rate::where('rate_date', $date)->whereHas('currency', function($q) use ($currency_id){

            $q->where('id', $currency_id);

        })->first();


        if(empty($existing_rate)){
            return true;
        }
        else{
            return false;
        }

    }
}
