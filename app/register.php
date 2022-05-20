<?php
use Firebase\JWT\JWT;

require_once './vendor/autoload.php';
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/TokenHelper.php';
require_once 'Classes/User.php';
require_once 'Classes/CookieHelper.php';
require_once './headers.php';



$username = $_REQUEST['username'] ?? '';
$password = $_REQUEST['password'] ?? '';

if (!$username || !$password) {
    echo json_encode([
        'status' => 'error',
        'message' => 'username or password parameters missing'
    ]);
    exit;
}


$pdo = (new PDOFactory())->getPdo();
$query = $pdo->prepare('SELECT COUNT(*) FROM `User` WHERE `username` = :username');
$query->bindValue('username', $username, PDO::PARAM_STR);
$query->execute();

$userAlreadyExists = (bool)$query->fetchAll(PDO::FETCH_ASSOC)[0]["COUNT(*)"];

if ($userAlreadyExists) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Username already exists'
    ]);
    exit;
}


$insert = $pdo->prepare('INSERT INTO User (`username`, `password`, token) VALUES (:username, :password, :token)');
$insert->bindValue('username', $username, PDO::PARAM_STR);
$insert->bindValue('password', password_hash($password, PASSWORD_BCRYPT), PDO::PARAM_STR);
$insert->bindValue('token', TokenHelper::buildToken(), PDO::PARAM_STR);

if ($insert->execute()) {
    $lastInsertId = $pdo->lastInsertId();
    $return = $pdo->query("SELECT * FROM User WHERE id = {$lastInsertId}");
    $return->setFetchMode(PDO::FETCH_CLASS, User::class);
    /** @var User $newUser */
    $newUser = $return->fetch();

    $issuedAt   = new DateTimeImmutable();
    $expire     = $issuedAt->modify('+1440 minutes')->getTimestamp();      // Add 60 seconds
    $serverName = "localhost";
    $appSecret = 'unSuperSecret!';

    $tokenData = [
        'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
        'iss'  => $serverName,                       // Issuer
        'nbf'  => $issuedAt->getTimestamp(),         // Not before
        'exp'  => $expire,                           // Expire
        'user_id' => $lastInsertId                    // User name
    ];

    $token = JWT::encode($tokenData, $appSecret, 'HS256');


    CookieHelper::setCookie($token, $newUser->getUsername());

    echo json_encode([
        'status' => 'success',
        'username' => $newUser->getUsername(),
        'token' => $token
    ]);
    exit;
}

