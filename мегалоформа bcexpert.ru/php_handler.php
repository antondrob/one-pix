<?php
// просто файлик для имитации ответа от сервера
$post = $_POST;
echo 'Количество полей: ' . count($post) . PHP_EOL;
print_r($post);