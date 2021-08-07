<link rel="stylesheet" href="<?php echo $link ?>/styles/common/accountStyle.css">
<section id="Account">
	<img id="CrossAccount" class="cross" src="<?php echo $link ?>/img/cross.png" alt="">
	<h2 class="form-title">Informations générales du compte</h2>
	<div class="div-account">
		<ul>
			<li class="account-element-title">
				<p>Plan:</p>
			</li>
			<li>
				<p id="AccountPlan"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Last Update:</p>
			</li>
			<li>
				<p id="AccountLastUpdate"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Requests:</p>
			</li>
			<li>
				<p id="AccountRequests"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Resources:</p>
			</li>
			<li>
				<p id="AccountResources"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Derived Resources:</p>
			</li>
			<li>
				<p id="AccountDerivedResources"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Transformations:</p>
			</li>
			<li>
				<p id="AccountTransformationUsage"></p>
			</li>
			<li class="account-progress-bar-element">
				<div class="progress">
					<div id="AccountTransformationProgressBar" class="progress-bar">
						<div id="AccountTransformationPercent" class="progress-bar-text"></div>
					</div>
				</div>
			</li>
			<li>
				<p id="AccountTransformationLimit"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Objects:</p>
			</li>
			<li>
				<p id="AccountObjectsUsage"></p>
			</li>
			<li class="account-progress-bar-element">
				<div class="progress">
					<div id="AccountObjectsProgressBar" class="progress-bar">
						<div id="AccountObjectsPercent" class="progress-bar-text"></div>
					</div>
				</div>
			</li>
			<li>
				<p id="AccountObjectsUsageLimit"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Bandwidth:</p>
			</li>
			<li>
				<p id="AccountBandwidthUsage"></p>
			</li>
			<li class="account-progress-bar-element">
				<div class="progress">
					<div id="AccountBandwidthProgressBar" class="progress-bar">
						<div id="AccountBandwidthPercent" class="progress-bar-text"></div>
					</div>
				</div>
			</li>
			<li>
				<p id="AccountBandwidthLimit"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Storage:</p>
			</li>
			<li>
				<p id="AccountStorageUsage"></p>
			</li>
			<li class="account-progress-bar-element">
				<div class="progress">
					<div id="AccountStorageProgressBar" class="progress-bar">
						<div id="AccountStoragePercent" class="progress-bar-text"></div>
					</div>
				</div>
			</li>
			<li>
				<p id="AccountStorageLimit"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Image Max Size Bytes:</p>
			</li>
			<li>
				<p id="AccountImageMaxSize"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Video Max Size Bytes:</p>
			</li>
			<li>
				<p id="AccountVideoMaxSize"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Raw Max Size Bytes:</p>
			</li>
			<li>
				<p id="AccountRawMaxSize"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Image Max Px:</p>
			</li>
			<li>
				<p id="AccountImageMaxPx"></p>
			</li>
		</ul>
		<ul>
			<li class="account-element-title">
				<p>Asset Max Total Px:</p>
			</li>
			<li>
				<p id="AccountAssetMaxTotalPx"></p>
			</li>
		</ul>

		<h2 class="form-title">Modifier mon mot de passe</h2>
		<form>
			<h3 class="error-msg" id="errorMsgEditPassword"></h3>
			<ul class="form-list">
				<li>
					<div class="fields">
						<label for="NewPasswordOne">Nouveau mot de passe :</label>
						<input id="NewPasswordOne" autocomplete="new-password" type="password">
					</div>
				</li>
				<li>
					<div class="fields">
						<label for="NewPasswordTwo">Répétez le mot de passe :</label>
						<input id="NewPasswordTwo" autocomplete="new-password" type="password">
					</div>
				</li>
			</ul>
			<input class="send-form" id="UpdatePassword" type="submit" value="Mettre à jour">
		</form>

	</div>
</section>
