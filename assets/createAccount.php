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
                <ul class="fields-create-account">
                    <li class="labels-create-account">
                        <label for="NewAccountEmail">Email :</label>
                    </li>
                    <li>
                        <input id="NewAccountEmail" type="email">
                    </li>
                </ul>
            </li>
            <li>
                <ul class="fields-create-account">
                    <li class="labels-create-account">
                        <label for="NewAccountPasswordOne">Mot de passe :</label>
                    </li>
                    <li>
                        <input id="NewAccountPasswordOne" autocomplete="new-password" type="password">
                    </li>
                </ul>
            </li>
            <li>
                <ul class="fields-create-account">
                    <li class="labels-create-account">
                        <label for="NewAccountPasswordTwo">Répétez le mot de passe :</label>
                    </li>
                    <li class="inputs-create-account">
                        <input id="NewAccountPasswordTwo" autocomplete="new-password" type="password">
                    </li>
                </ul>
            </li>
        </ul>
        <input id="CreateAccountButton" type="submit" value="Créer le compte">
    </form>
	<script type="text/javascript" src="<?php echo $link ?>/js/create-account.js"></script>
</section>
