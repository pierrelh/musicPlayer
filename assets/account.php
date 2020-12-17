<link rel="stylesheet" href="<?php echo $link ?>/styles/common/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/accountStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/accountStyle.css">
<section id="Account">
    <img id="CrossAccount" class="cross" src="../img/cross.png" alt="">    
    <div>
        <ul>
            <li><p>Plan:</p></li>
            <li><p id="AccountPlan"></p></li>
        </ul>
        <ul>
            <li><p>Last Update:</p></li>
            <li><p id="AccountLastUpdate"></p></li>
        </ul>
        <ul>
            <li><p>Requests:</p></li>
            <li><p id="AccountRequests"></p></li>
        </ul>
        <ul>
            <li><p>Resources:</p></li>
            <li><p id="AccountResources"></p></li>
        </ul>
        <ul>
            <li><p>Derived Resources:</p></li>
            <li><p id="AccountDerivedResources"></p></li>
        </ul>
        <ul>
            <li><p>Image Max Size Bytes:</p></li>
            <li><p id="AccountImageMaxSize"></p></li>
        </ul>
        <ul>
            <li><p>Video Max Size Bytes:</p></li>
            <li><p id="AccountVideoMaxSize"></p></li>
        </ul>
        <ul>
            <li><p>Raw Max Size Bytes:</p></li>
            <li><p id="AccountRawMaxSize"></p></li>
        </ul>
        <ul>
            <li><p>Image Max Px:</p></li>
            <li><p id="AccountImageMaxPx"></p></li>
        </ul>
        <ul>
            <li><p>Asset Max Total Px:</p></li>
            <li><p id="AccountAssetMaxTotalPx"></p></li>
        </ul>
        <ul>
            <li><p>Transformations:</p></li>
            <li><p id="AccountTransformationUsage"></p></li>
            <li>
                <div>
					<div>
						<div>[user_percent]</div>
					</div>
				</div>
            </li>
            <li><p id="AccountTransformationLimit"></p></li>
        </ul>
        <ul>
            <li><p>Objects:</p></li>
            <li><p id="AccountObjectsUsage"></p></li>
            <li>
                <div>
					<div>
						<div>[user_percent]</div>
					</div>
				</div>
            </li>
            <li><p id="AccountObjectsUsageLimit"></p></li>
        </ul>
        <ul>
            <li><p>Bandwidth:</p></li>
            <li><p id="AccountBandwidthUsage"></p></li>
            <li>
                <div>
					<div>
						<div>[user_percent]</div>
					</div>
				</div>
            </li>
            <li><p id="AccountBandwidthLimit"></p></li>
        </ul>
        <ul>
            <li><p>Storage:</p></li>
            <li><p id="AccountStorageUsage"></p></li>
            <li>
                <div>
					<div>
						<div>[user_percent]</div>
					</div>
				</div>
            </li>
            <li><p id="AccountStorageLimit"></p></li>
        </ul>
    </div>
	<script type="text/javascript" src="<?php echo $link ?>/js/account.js"></script>
</section>
