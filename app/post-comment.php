<?php

require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Review.php';



/**
 * Je pourrais ne pas passer d'authorization en header
 * et simplement me servir du fait que le cookie d'auth
 * est passé également en requête !
 * Attention cependant à la validité du cookie.
 * Il faudrait le vérifier avant la requête, on en reparle
 * avec les Interceptor de Axios !
 */
$appSecret = 'unSuperSecret!';
$token = $_COOKIE['hetic_token'] ?? '';
$imdb_id = $_POST['imdb_id'] ?? '';
$rating = $_POST['rating']  ?? '';
$title = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';



if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post a review',
    ]);
    exit;
}

if (!$imdb_id || !$rating || !$title || !$content) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing field(s)'
    ]);
    exit;
}
$pdo = (new PDOFactory())->getPdo();
$jwt = JWT::decode($token, new Key($appSecret, 'HS256'));

try {
    //TODO use class

    $update = $pdo->prepare('INSERT INTO Ratings (user_id, imdb_id, rating, title, comment) VALUES (:user_id, :imdb_id, :rating, :title, :comment)');
    $update->bindValue('user_id', $jwt->user_id, PDO::PARAM_INT);
    $update->bindValue('imdb_id', $imdb_id, PDO::PARAM_STR);
    $update->bindValue('rating', $rating, PDO::PARAM_INT);
    $update->bindValue('title', $title, PDO::PARAM_STR);
    $update->bindValue('comment', $content, PDO::PARAM_STR);


    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Review saved'
        ]);
    };
}

catch (\Firebase\JWT\ExpiredException $expiredException) {
   echo json_encode([
       'status' => 'error',
       'message' => 'Expired Token'
    ]);
}

catch (Exception $e) {
     print_r($e->getMessage());

} finally {
    exit;
}
