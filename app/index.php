<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Blog.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT * FROM User');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $user) {
//    var_dump($post);
    $res[] = [
        'id' => $user['id'],
        "date" => $user['username']
    ];
}

echo json_encode($res);
