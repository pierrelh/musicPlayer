<section id="CreateAccount">
	<button id="CrossCreateAccount" class="cross">
		<i class="bi bi-x-lg"></i>
	</button>
	<h2 class="form-title">Créer un nouveau compte</h2>
	<form>
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
<script type="text/javascript" src="<?php echo $rootURL ?>/scripts/create-account.js?cachev=<?php echo $cacheVersion ?>"></script>