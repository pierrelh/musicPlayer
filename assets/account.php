<link rel="stylesheet" href="<?php echo $link ?>/styles/common/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/accountStyle.css">
<section id="Account">
<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/functions/getCloudinary.php");
    $result = $api->resources();
    var_dump($result->rate_limit_allowed);
    var_dump($result->rate_limit_remaining);
    var_dump($result->rate_limit_reset_at);
    var_dump($result);
?>
<script type="text/javascript" src="<?php echo $link ?>/js/uploadFile.js"></script>
</section>
