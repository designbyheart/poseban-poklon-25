<?php

class CustomException extends \Exception
{
    public function report(Exception $exception)
    {
        parent::report($exception);
    }
}
