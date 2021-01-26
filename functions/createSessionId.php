<?php

  // Create an entitee ID
  function createSessionId($accountType){
    $date = date_create();
    $sessionId =  $accountType . hash("sha256", date_timestamp_get($date) . rand(1, 999999999));
    return $sessionId;
  }

?>
