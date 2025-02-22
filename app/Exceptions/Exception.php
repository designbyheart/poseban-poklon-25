<?php

namespace App\Exceptions;
use Exception as DefaultException;

class Exception extends DefaultException
{
    public function report(Exception $exception)
    {
        parent::report($exception);
    }
}
