<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticIniteb179e501d2b5e5aea8e087787f9883e
{
	public static $files = array (
		'c15243c55ab4c20eff78d1e24be20dac' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Helpers.php',
	);

	public static $classMap = array (
		'Cloudinary' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cloudinary.php',
		'CloudinaryField' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/CloudinaryField.php',
		'Cloudinary\\Api' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api.php',
		'Cloudinary\\Api\\AlreadyExists' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/AlreadyExists.php',
		'Cloudinary\\Api\\AuthorizationRequired' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/AuthorizationRequired.php',
		'Cloudinary\\Api\\BadRequest' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/BadRequest.php',
		'Cloudinary\\Api\\Error' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/Error.php',
		'Cloudinary\\Api\\GeneralError' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/GeneralError.php',
		'Cloudinary\\Api\\NotAllowed' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/NotAllowed.php',
		'Cloudinary\\Api\\NotFound' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/NotFound.php',
		'Cloudinary\\Api\\RateLimited' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/RateLimited.php',
		'Cloudinary\\Api\\Response' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Api/Response.php',
		'Cloudinary\\AuthToken' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/AuthToken.php',
		'Cloudinary\\Cache\\Adapter\\CacheAdapter' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cache/Adapter/CacheAdapter.php',
		'Cloudinary\\Cache\\Adapter\\KeyValueCacheAdapter' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cache/Adapter/KeyValueCacheAdapter.php',
		'Cloudinary\\Cache\\ResponsiveBreakpointsCache' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cache/ResponsiveBreakpointsCache.php',
		'Cloudinary\\Cache\\Storage\\FileSystemKeyValueStorage' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cache/Storage/FileSystemKeyValueStorage.php',
		'Cloudinary\\Cache\\Storage\\KeyValueStorage' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Cache/Storage/KeyValueStorage.php',
		'Cloudinary\\Error' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Error.php',
		'Cloudinary\\HttpClient' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/HttpClient.php',
		'Cloudinary\\PreloadedFile' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/PreloadedFile.php',
		'Cloudinary\\Search' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Search.php',
		'Cloudinary\\SignatureVerifier' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/SignatureVerifier.php',
		'Cloudinary\\Uploader' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Uploader.php',
		'Cloudinary\\Utils\\Singleton' => __DIR__ . '/..' . '/cloudinary/cloudinary_php/src/Utils/Singleton.php',
		'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
	);

	public static function getInitializer(ClassLoader $loader)
	{
		return \Closure::bind(function () use ($loader) {
			$loader->classMap = ComposerStaticIniteb179e501d2b5e5aea8e087787f9883e::$classMap;

		}, null, ClassLoader::class);
	}
}
