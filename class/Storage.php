<?php

	$GLOBALS['Storage'] = new class {
		private $CloudName = null;
		private $APIKey = null;
		private $APISecret = null;
		private $Uploader = null;
		private $Config = null;
		
		// Set the cloundiary's configuration
		function __construct() {
			global $SQL;
		
			$request = "SELECT * 
						FROM cloudinary_api
						WHERE key_id='1'";

			$val = pg_fetch_all($SQL->Request($request));
			include_once($_SERVER['DOCUMENT_ROOT'].'/vendor/cloudinary/cloudinary_php/autoload.php');
			
			foreach ($val as $key => $value) {     
				$this->CloudName = $value['cloud_name'];
				$this->APIKey = $value['api_key'];
				$this->APISecret = $value['api_secret'];
				$this->Config = \Cloudinary::config(array(
					'cloud_name'    => $this->CloudName,
					'api_key'       => $this->APIKey,
					'api_secret'    => $this->APISecret,
					'secure'        => true
				));
			}
		}

		// Create an entitee slug
		public function createSlug($raw){
			$raw = preg_replace('~[^\pL\d]+~u', '-', $raw);
			$raw = iconv('utf-8', 'us-ascii//TRANSLIT', $raw);
			$raw = preg_replace('~[^-\w]+~', '', $raw);
			$raw = trim($raw, '-');
			$raw = preg_replace('~-+~', '-', $raw);
			$slug = strtolower($raw);
			if (empty($slug))
				return false;
	
			return $slug . rand(1, 999999999);    
		}

		// Upload a cover to Cloudinary
		public function UploadCover($filePath, $fileName, $overwrite, $directory, $size){
			if (!$overwrite)
				$fileName = $this->createSlug($fileName);
			
			include_once($_SERVER['DOCUMENT_ROOT'].'/vendor/cloudinary/cloudinary_php/autoload.php');
			$result = \Cloudinary\Uploader::upload(
				$filePath,
				array(
					'public_id'		=> $fileName,
					'resource_type'	=> 'auto',
					'folder'		=> 'image/' . $directory,
					'overwrite'		=> $overwrite,
					'width'			=> $size,
					'height'		=> $size,
					'crop'			=> 'scale',
					'quality'		=> 'auto',
					'invalidate'	=> true
				)
			);
			return $result['secure_url'];
		}

		// Upload a music to Cloudinary
		public function UploadMusic($filePath, $fileName){
			$fileName = $this->createSlug($fileName);

			include_once($_SERVER['DOCUMENT_ROOT'].'/vendor/cloudinary/cloudinary_php/autoload.php');
			$result = \Cloudinary\Uploader::upload(
				$filePath,
				array(
					'public_id'     => $fileName,
					'resource_type' => 'auto',
					'folder'        => 'video',
					'overwrite'		=> false
				)
			);
			return $result['secure_url'];
		}        

		// Get the content of a web page with cUrl
		private function GetWebPage($url) {
			$options = array(
				CURLOPT_RETURNTRANSFER => true,   // return web page
				CURLOPT_HEADER         => false,  // don't return headers
				CURLOPT_FOLLOWLOCATION => false,  // don't follow redirects
				CURLOPT_MAXREDIRS      => 10,     // stop after 10 redirects
				CURLOPT_ENCODING       => '',     // handle compressed
				CURLOPT_USERAGENT      => 'test', // name of client
				CURLOPT_AUTOREFERER    => true,   // set referrer on redirect
				CURLOPT_CONNECTTIMEOUT => 120,    // time-out on connect
				CURLOPT_TIMEOUT        => 120,    // time-out on response
			); 

			$ch = curl_init($url);
			curl_setopt_array($ch, $options);
			$content  = curl_exec($ch);
			curl_close($ch);
			return $content;
		}

		public function GetAdminPage() {            
			return this->GetWebPage('https://'.$this->APIKey.':'.$this->APISecret.'@api.cloudinary.com/v1_1/'.$this->CloudName.'/usage');            
		}        

		// Function to delete a cloudinary asset
		public function DeleteCloudinary($type, $fileName){
			$file = $type . '/' . $fileName;

			include_once($_SERVER['DOCUMENT_ROOT'].'/vendor/cloudinary/cloudinary_php/autoload.php');
			$result = \Cloudinary\Uploader::destroy(
				$file, 
				array(
					'resource_type' => $type,
				)
			);
		}
	}

?>