<?php

    class Initiator {
		public static function SQL() {
			require_once($_SERVER['DOCUMENT_ROOT'] . '/class/SQL.php');
			return new SQL();
		}

		public static function Storage() {
			require_once($_SERVER['DOCUMENT_ROOT'] . '/class/Storage.php');
			return new Storage();
		}
    }

?>