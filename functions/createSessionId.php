<?php

	// Create an entitee ID
	function createSessionId(){
		$date = date_create();
		$sessionId =  hash("sha256", date_timestamp_get($date) . rand(1, 999999999));
		return $sessionId;
	}

?>
