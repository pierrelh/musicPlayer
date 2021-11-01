<?php

	$GLOBALS['User'] = new class {
		public function CheckIdentification() {
			global $SQL;
			$request = 'SELECT user_session_id
						FROM users
						WHERE user_session_id = $1';
			$result = $SQL->Request($request, array($_COOKIE['SESSION_ID']));
			$rows = pg_fetch_all($result);
			if (empty($rows)) {
				setcookie('SESSION_ID', null, -1, '/');
				echo '<script>window.location.assign(\'https://'.$_SERVER['HTTP_HOST'].'\')</script>';
			}
			return false;
		}

		public function CreateAccount() {
			global $SQL;
			$request = 'INSERT INTO users (user_login, user_password, user_session_id)
						VALUES ($1, $2, $3)';
			$result = $SQL->Request(
				$request,
				array(
					$_POST['user_login'],
					hash('sha256', $_POST['user_password']),
					$this->CreateSessionId()
				)
			);

			if (is_resource($result))
				return true;
			return false;
		}

		public function Login(){
			global $SQL;
			$request = 'SELECT user_session_id
						FROM users
						WHERE user_login = $1 AND user_password = $2';
			$result = $SQL->Request(
				$request,
				array(
					$_POST['login'],
					hash('sha256', $_POST['password'])
				)
			);

			$rows = pg_fetch_all($result);
			if (empty($rows))
				return false;
				
			$row = $rows[0];
			$cookieOptions = array (
				'expires' => time() + 60*60*24*30,
				'path' => '/',
				'secure' => true,
				'httponly' => true,
				'samesite' => 'Strict'
			);
			setcookie('SESSION_ID', $row['user_session_id'], $cookieOptions);
			echo '<script>window.location.assign(\'https://'.$_SERVER['HTTP_HOST'].'\')</script>';
		}

		public function EditPassword() {
			global $SQL;
			$request = 'UPDATE users
						SET user_password = $1
						WHERE user_session_id = $2';
			$result = $SQL->Request(
				$request,
				array(
					hash('sha256', $_POST['user_password']),
					$_COOKIE['SESSION_ID']
				)
			);

			if (is_resource($result))
				return true;
			return false;
		}
		
		private static function CreateSessionId(){
			return hash('sha256', date_timestamp_get(date_create()) . rand(1, 999999999));
		}
	}

?>