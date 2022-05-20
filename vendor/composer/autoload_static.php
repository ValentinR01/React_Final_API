<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd72471635b4a2a10eaa122186767188f
{
    public static $classMap = array (
        'BeforeValidException' => __DIR__ . '/..' . '/firebase/php-jwt/Exceptions/BeforeValidException.php',
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'ExpiredException' => __DIR__ . '/..' . '/firebase/php-jwt/Exceptions/ExpiredException.php',
        'JWT' => __DIR__ . '/..' . '/firebase/php-jwt/Authentication/JWT.php',
        'SignatureInvalidException' => __DIR__ . '/..' . '/firebase/php-jwt/Exceptions/SignatureInvalidException.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInitd72471635b4a2a10eaa122186767188f::$classMap;

        }, null, ClassLoader::class);
    }
}