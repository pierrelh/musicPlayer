<?php

	class User {

		public function __construct(){
			require_once($_SERVER['DOCUMENT_ROOT'] . '/class/Initiator.php');
		}

		public function CheckIdentification() {
			$request = 'SELECT user_session_id
						FROM users
						WHERE user_session_id = $1';
			$result = Initiator::SQL()->Request($request, array($_COOKIE['SESSION_ID']));
			$rows = pg_fetch_all($result);
			if (empty($rows)) {
				setcookie('SESSION_ID', null, -1, '/');
				echo '<script>window.location.assign(\'https://'.$_SERVER['HTTP_HOST'].'\')</script>';
			}
			return false;
		}

		public function CreateAccount($login, $password) {
			$request = 'INSERT INTO users (user_login, user_password, user_session_id)
						VALUES ($1, $2, $3)';
			$result = Initiator::SQL()->Request(
				$request,
				array(
					$login,
					hash('sha256', $password),
					$this->CreateSessionId()
				)
			);

			if (is_resource($result))
				return true;
			return false;
		}

		public function Login($login, $password){
			$request = 'SELECT user_session_id
						FROM users
						WHERE user_login = $1 AND user_password = $2';
			$result = Initiator::SQL()->Request(
				$request,
				array(
					$login,
					hash('sha256', $password)
				)
			);

			$rows = pg_fetch_all($result);
			if (empty($rows))
				return false;
				
			$row = $rows[0];
			setcookie(
				'SESSION_ID',
				$row['user_session_id'],
				array(
					'expires' => time() + 60*60*24*30,
					'path' => '/',
					'secure' => true,
					'httponly' => true,
					'samesite' => 'Strict'
				)
			);
			echo '<script>window.location.assign(\'https://'.$_SERVER['HTTP_HOST'].'\')</script>';
		}

		public function EditPassword($newPassword) {
			$request = 'UPDATE users
						SET user_password = $1
						WHERE user_session_id = $2';
			$result = Initiator::SQL()->Request(
				$request,
				array(
					hash('sha256', $newPassword),
					$_COOKIE['SESSION_ID']
				)
			);

			if (is_resource($result))
				return true;
			return false;
		}
		
		private function CreateSessionId(){
			return hash('sha256', date_timestamp_get(date_create()) . rand(1, 999999999));
		}
	}

?>