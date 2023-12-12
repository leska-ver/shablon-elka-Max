<?
  // Подключение "Базы данных", тот же код. ПРОФИ КОД. Скопировали и закинули в файл mail.php
  // Исправляем код на своё ci54422_elochka 1GmHsZV
  $dbname = 'ci54422_elochka';/*Из сайта имя "Базы данных MySQL"*/
  $dbuser = 'ci54422_elochka';/*Из сайта имя "Базы данных MySQL"*/
  $dbpass = '1GmHsZV';/*Пароль из сайта "Базы данных"*/
  $pdo = new PDO("mysql:host=localhost;dbname=$dbname", $dbuser, $dbpass);

  // Пишем наш SQL запрос SELECT. Позволит вывести заявки таблицы "Базы даных" в обратном порядке убывания числа.
  $stmt = $pdo->query('SELECT * FROM orders ORDER BY id DESC');
?>

<!-- Пишим таблицу через html код. Она выйдет по акуратнее и симпатичной в браузере(https://ссылка/list.php)-->
<!DOCTYPE html>
<html>
  <!--Результат таблицы http://ссылка/list.php -->
  <head>
    <title>Список заявок</title>
    <style>
      table {
        border: 1px solid darkgray;
        border-collapse: collapse;
      }

      th {
        color: #fff;
        background-color: #368c02;
      }

      th, td {
        padding: 5px;
        border: 1px solid #3da001;
      } 
    </style>
  </head>
  <body>
    <table>
      <tr>
        <th>ID</th>
        <th>Фамилия и Имя</th>
        <th>Ваш телефон</th>
        <th>Email</th>
        <th>Сообщение</th>
        <th>Дата и время</th>
      </tr>
      <?
        foreach ($stmt as $row) {
          echo '<tr>';
          echo '<td>' . $row['id'] . '</td>';
          echo '<td>' . $row['name'] . '</td>';
          echo '<td>' . $row['tel'] . '</td>';
          echo '<td>' . $row['email'] . '</td>';
          echo '<td>' . $row['message'] . '</td>';
          echo '<td>' . $row['date'] . '</td>';
          echo '</tr>';
        }
      ?>
    </table>
  </body>
</html>