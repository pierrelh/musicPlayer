<link rel="stylesheet" href="<?php echo $link ?>/styles/common/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/accountStyle.css">
<section id="Account">
    <img id="CrossAccount" class="cross" src="../img/cross.png" alt="">    
    <div class="div-account">
        <ul>
            <li class="account-element-title"><p>Plan:</p></li>
            <li><p id="AccountPlan"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Last Update:</p></li>
            <li><p id="AccountLastUpdate"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Requests:</p></li>
            <li><p id="AccountRequests"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Resources:</p></li>
            <li><p id="AccountResources"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Derived Resources:</p></li>
            <li><p id="AccountDerivedResources"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Transformations:</p></li>
            <li><p id="AccountTransformationUsage"></p></li>
            <li class="account-progress-bar-element">
                <div>
					<div id="AccountTransformationProgressBar">
						<p id="AccountTransformationPercent"></p>
					</div>
				</div>
            </li>
            <li><p id="AccountTransformationLimit"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Objects:</p></li>
            <li><p id="AccountObjectsUsage"></p></li>
            <li class="account-progress-bar-element">
                <div>
					<div id="AccountObjectsProgressBar">
						<p id="AccountObjectsPercent"></p>
					</div>
				</div>
            </li>
            <li><p id="AccountObjectsUsageLimit"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Bandwidth:</p></li>
            <li><p id="AccountBandwidthUsage"></p></li>
            <li class="account-progress-bar-element">
                <div>
					<div id="AccountBandwidthProgressBar">
						<p id="AccountBandwidthPercent"></p>
					</div>
				</div>
            </li>
            <li><p id="AccountBandwidthLimit"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Storage:</p></li>
            <li><p id="AccountStorageUsage"></p></li>
            <li class="account-progress-bar-element">
                <div>
					<div id="AccountStorageProgressBar">
						<p id="AccountStoragePercent"></p>
					</div>
				</div>
            </li>
            <li><p id="AccountStorageLimit"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Image Max Size Bytes:</p></li>
            <li><p id="AccountImageMaxSize"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Video Max Size Bytes:</p></li>
            <li><p id="AccountVideoMaxSize"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Raw Max Size Bytes:</p></li>
            <li><p id="AccountRawMaxSize"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Image Max Px:</p></li>
            <li><p id="AccountImageMaxPx"></p></li>
        </ul>
        <ul>
            <li class="account-element-title"><p>Asset Max Total Px:</p></li>
            <li><p id="AccountAssetMaxTotalPx"></p></li>
        </ul>

        <form>
            <h2>Modifier mon mot de passe</h2>
            <h3 id="errorMsgEditPassword"></h3>
            <ul>
                <li>
                    <input id="NewPasswordOne" autocomplete="new-password" placeholder="Nouveau mot de passe" type="password">
                </li>
                <li>
                    <input id="NewPasswordTwo" autocomplete="new-password" placeholder="Répétez le mot de passe" type="password">
                </li>
            </ul>
            <input id="UpdatePassword" type="submit" value="Mettre à jour">
        </form>

    </div>
	<script type="text/javascript" src="<?php echo $link ?>/js/account.js"></script>
</section>
