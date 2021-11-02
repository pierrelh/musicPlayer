<?php

	class SQL {
		private $db = null;

		public function __construct(){
			$this->db = pg_connect(getenv("DATABASE_URL") ?: "postgres://user:pass@host:port/dbname");
			if(!$this->db)
				die('Erreur : '.$e->getMessage());
		}

		public function Request($request, $data = array()) {
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
