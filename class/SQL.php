<?php

	class SQL {
		public $db = null;
		public function __construct(){
			$db_url = getenv("DATABASE_URL") ?: "postgres://user:pass@host:port/dbname";
			$this->db = pg_connect($db_url);
			if($db)
				return $this->db;
			else
				die('Erreur : '.$e->getMessage());
		}

		private function Filter($str) {
			return htmlentities($str, ENT_QUOTES);
		}
	}

?>
