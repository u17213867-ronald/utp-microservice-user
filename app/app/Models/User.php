<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // Definir la tabla (si no sigue la convención)
    protected $table = 'user';

    // Definir las columnas que pueden ser asignadas en masa
    protected $fillable = [
        'email',
        'password',
        'role',
        'activation_token',
        'expiration_token',
        'status',
    ];

    // Si no deseas que Eloquent gestione los campos 'created_at' y 'updated_at',
    // puedes deshabilitarlo
    public $timestamps = true;

    // Si los campos de fecha no tienen el formato de Laravel por defecto (Y-m-d H:i:s),
    // puedes especificar el formato de las fechas aquí:
    protected $dates = [
        'created_at',
        'updated_at',
        'expiration_token',
    ];

    // Si el campo de contraseña es siempre encriptado cuando se guarda, puedes hacerlo en el modelo:
    protected static function boot()
    {
        parent::boot();

        // Encriptar la contraseña antes de guardarla
        static::saving(function ($user) {
            if ($user->password) {
                $user->password = bcrypt($user->password);
            }
        });
    }
}
