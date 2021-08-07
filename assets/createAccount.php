<section id="CreateAccount">
	<img id="CrossCreateAccount" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
	<h2 class="form-title">Créer un nouveau compte</h2>
	<form>
		<h3 class="error-msg" id="errorMsgCreateAccount"></h3>
		<ul class="form-list">
			<li>
				<div class="fields">
					<label for="NewAccountEmail">Email :</label>
					<input id="NewAccountEmail" type="email">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="NewAccountPasswordOne">Mot de passe :</label>
					<input id="NewAccountPasswordOne" autocomplete="new-password" type="password">
				</div>
			</li>
			<li>
				<div class="fields">
					<label for="NewAccountPasswordTwo">Répétez le mot de passe :</label>
					<input id="NewAccountPasswordTwo" autocomplete="new-password" type="password">
				</div>
			</li>
		</ul>
		<input class="send-form" id="CreateAccountButton" type="submit" value="Créer le compte">
	</form>
</section>
