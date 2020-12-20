<link rel="stylesheet" href="<?php echo $link ?>/styles/common/createAccountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/createAccountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/createAccountStyle.css">
<section id="CreateAccount">
    <img id="CrossCreateAccount" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
        <form>
            <h2>Créer un nouveau compte</h2>
            <h3 id="errorMsgCreateAccount"></h3>
            <ul>
                <li>
                    <label for="NewAccountEmail">Email</label>
                    <input id="NewAccountEmail" type="email">
                </li>
                <li>
                    <label for="NewAccountPasswordOne">Mot de passe</label>
                    <input id="NewAccountPasswordOne" autocomplete="new-password" type="password">
                </li>
                <li>
                    <label for="NewAccountPasswordTwo">Répétez le mot de passe</label>
                    <input id="NewAccountPasswordTwo" autocomplete="new-password" type="password">
                </li>
            </ul>
            <input id="CreateAccountButton" type="submit" value="Créer le compte">
        </form>
    </div>
	<script type="text/javascript" src="<?php echo $link ?>/js/create-account.js"></script>
</section>
