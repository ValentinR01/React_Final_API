<?php

require_once './vendor/autoload.php';
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Review.php';
require_once 'Classes/Comment.php';

//$token = str_replace('Bearer ', '', getallheaders()['Authorization'] ?? '') ?? '';

/**
 * Je pourrais ne pas passer d'authorization en header
 * et simplement me servir du fait que le cookie d'auth
 * est passé également en requête !
 * Attention cependant à la validité du cookie.
 * Il faudrait le vérifier avant la requête, on en reparle
 * avec les Interceptor de Axios !
 */

$imdb_id = $_GET['imdb_id'] ?? '';


if (!$imdb_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'IMDB ID is missing'
    ]);
    exit;
}

$pdo = (new PDOFactory())->getPdo();

try {
    $comments = $pdo->prepare('SELECT user_id, rating, title, comment FROM Ratings WHERE imdb_id = :imdb_id');
    $comments->bindValue('imdb_id', $imdb_id, PDO::PARAM_INT);
    $comments->setFetchMode(PDO::FETCH_ASSOC);


    if ($comments->execute()) {
        $res = [];

        foreach ($comments->fetchAll() as $comment) {
            $res[] = [
                'title' => $comment['title'],
                'commment' => $comment['comment'],
                'rating' => $comment['rating'],
                'user_id' => $comment['user_id']
            ];
        }
        echo json_encode($res);
    }


}

catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);

} finally {
    exit;
}

