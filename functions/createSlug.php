<?php

  // Create an entitee slug
  function createSlug($raw){
    // replace non letter or digits by -
    $raw = preg_replace('~[^\pL\d]+~u', '-', $raw);

    // transliterate
    $raw = iconv('utf-8', 'us-ascii//TRANSLIT', $raw);

    // remove unwanted characters
    $raw = preg_replace('~[^-\w]+~', '', $raw);

    // trim
    $raw = trim($raw, '-');

    // remove duplicate -
    $raw = preg_replace('~-+~', '-', $raw);

    // lowercase
    $slug = strtolower($raw);

    if (empty($slug)) {
      return 'n-a';
    }

    return $slug . rand(1, 999999999);

  }

?>
