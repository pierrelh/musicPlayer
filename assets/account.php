<link rel="stylesheet" href="<?php echo $link ?>/styles/common/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/accountStyle.css">
<section id="Account">
    <img id="CrossAccount" class="cross" src="../img/cross.png" alt="">    
    <?php
        include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");

        function get_web_page($url) {
            $options = array(
                CURLOPT_RETURNTRANSFER => true,   // return web page
                CURLOPT_HEADER         => false,  // don't return headers
                CURLOPT_FOLLOWLOCATION => true,   // follow redirects
                CURLOPT_MAXREDIRS      => 10,     // stop after 10 redirects
                CURLOPT_ENCODING       => "",     // handle compressed
                CURLOPT_USERAGENT      => "test", // name of client
                CURLOPT_AUTOREFERER    => true,   // set referrer on redirect
                CURLOPT_CONNECTTIMEOUT => 120,    // time-out on connect
                CURLOPT_TIMEOUT        => 120,    // time-out on response
            ); 

            $ch = curl_init($url);
            curl_setopt_array($ch, $options);

            $content  = curl_exec($ch);

            curl_close($ch);

            return $content;
        }

        $response = get_web_page("https://$key:$secret@api.cloudinary.com/v1_1/$name/usage");
        $resArr = array();
        $resArr = json_decode($response);
        $resArr = get_object_vars($resArr);
        echo "<pre>" . print_r($resArr) . "</pre>";
    ?>
	<script type="text/javascript" src="<?php echo $link ?>/js/account.js"></script>
</section>
