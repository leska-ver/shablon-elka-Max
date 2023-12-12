<?
  // Подключение "Базы данных", тот же код. ПРОФИ КОД. Скопировали и закинули в файл list.php
  // Исправляем код на своё ci54422_elochka 1GmHsZV
  $dbname = 'ci54422_elochka';//Из сайта имя "Базы данных MySQL"/
  $dbuser = 'ci54422_elochka';//Из сайта имя "Базы данных MySQL"/
  $dbpass = '1GmHsZV';//Пароль из сайта "Базы данных"/
  $pdo = new PDO("mysql:host=localhost;dbname=$dbname", $dbuser, $dbpass);

  

  //Делаем запрос.
  // $stmt = $pdo->prepare('INSERT INTO orders(name, phone, email) VALUES(:name, :phone, :email)');
  $stmt = $pdo->prepare('INSERT INTO orders(name, tel, email, message) VALUES(:name, :tel, :email, :message)');
  $stmt->bindValue(':name', $_POST['name']);
  $stmt->bindValue(':tel', $_POST['tel']);
  $stmt->bindValue(':email', $_POST['email']);
  $stmt->bindValue(':message', $_POST['message']);

  // Проверим сохраняются у нас данные на сервере. Выполнили запрос execute()
  if ($stmt->execute()) {
    echo '1';
  }
?>


<!-- --- --- --- -->

<? 
// Отправка на почту ввиде письма.
require_once 'PHPMailer/PHPMailerAutoload.php';

$admin_email = array();
foreach ( $_POST["admin_email"] as $key => $value ) {
	array_push($admin_email, $value);
}

$form_subject = trim($_POST["form_subject"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';



$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject" ) {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}
$message = "<table style='width: 100%;'>$message</table>";


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Из сайта:');
 
// Кому
foreach ( $admin_email as $key => $value ) {
	$mail->addAddress($value);
}
// Тема письма
$mail->Subject = $form_subject;
 
// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);




$mail->send();
?>

