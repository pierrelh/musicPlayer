<?php

	class SQL {
		public $db = null;

		public function __construct(){
			$db_url = getenv("DATABASE_URL") ?: "postgres://user:pass@host:port/dbname";
			$this->db = pg_connect($db_url);
			if(!$this->db)
				die('Erreur : '.$e->getMessage());
		}

		public function Request($request, $data) {
			return pg_query_params(
				$this->db,
				$request,
				$data
			);
		}

		private function Filter($str) {
			return htmlentities($str, ENT_QUOTES);
		}
	}

?>
