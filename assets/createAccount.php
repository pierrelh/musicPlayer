<link rel="stylesheet" href="<?php echo $link ?>/styles/common/createAccountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/createAccountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/createAccountStyle.css">
<section id="CreateAccount">
    <img id="CrossCreateAccount" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
    <h2>Créer un nouveau compte</h2>
    <form>
        <h3 id="errorMsgCreateAccount"></h3>
        <ul>
            <li>
                <div class="fields-create-account">
                    <label for="NewAccountEmail">Email :</label>
                    <input id="NewAccountEmail" type="email">
                </div>
            </li>
            <li>
                <div class="fields-create-account">
                    <label for="NewAccountPasswordOne">Mot de passe :</label>
                    <input id="NewAccountPasswordOne" autocomplete="new-password" type="password">
                </div>
            </li>
            <li>
                <div class="fields-create-account">
                    <label for="NewAccountPasswordTwo">Répétez le mot de passe :</label>
                    <input id="NewAccountPasswordTwo" autocomplete="new-password" type="password">
                </div>
            </li>
        </ul>
        <input id="CreateAccountButton" type="submit" value="Créer le compte">
    </form>
	<script type="text/javascript" src="<?php echo $link ?>/js/create-account.js"></script>
</section>
