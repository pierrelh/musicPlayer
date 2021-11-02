<?php

	class Files {

		public function __construct(){
			require_once($_SERVER['DOCUMENT_ROOT'] . '/class/Initiator.php');
		}

		private function GetFileNameFormUrl($url) {
			$url = explode('/', $url);
			$filename = array_pop($url);
			$filename = explode('.', $filename);
			return $filename[0];
		}

		public function GetAll($row, $type) {
			$request = 'SELECT *
						FROM files
						ORDER BY ' . $row . ' ' . $type;

			$result = Initiator::SQL()->Request($request);
			if (!empty($result))
				return pg_fetch_all($result);
			return false;
		}

		public function UploadCover($cover) {
			$coverSizes = [
				'x96'=> 96,
				'x128'=> 128,
				'x192'=> 192,
				'x256'=> 256,
				'x384'=> 384,
				'x512'=> 512
			];
			$urls = array();
			foreach ($coverSizes as $directory => $size)
				$urls[$directory] = Initiator::Storage()->UploadCover($cover['tmp_name'], $cover['name'], false, $directory, $size);
			return $urls;
		}

		public function UploadMusic($music) {
			return Initiator::Storage()->UploadMusic($music['tmp_name'], $music['name']);
		}

		public function Upload($name, $url, $author, $album, $covers) {
			$request = 'INSERT INTO files (
							file_name,
							file_url,
							file_cover_96,
							file_cover_128,
							file_cover_192,
							file_cover_256,
							file_cover_384,
							file_cover_512,
							file_author,
							file_album
						)
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

			return Initiator::SQL()->Reqest(
				$request,
				array(
					$name,
					$url,
					$covers->x96,
					$covers->x128,
					$covers->x192,
					$covers->x256,
					$covers->x384,
					$covers->x512,
					$author,
					$album
				)
			);
		}

		// public function Edit($image, $covers) {
		// 	if (isset($image) && $image != 'undefined') {
		// 		$files = $image;
		// 		$files = is_array($files) ? $files : array( $files );
		
		// 		foreach ($covers as $directory => $path) {
		// 			$size = str_replace('x', '', $directory);
		// 			$key = 'file_cover_' . $size;
		// 			$_POST[$key] = uploadCover($files['tmp_name'], $this->GetFileNameFormUrl($path), true, $directory, intval($size));
		// 		}
		// 	}
		
		// 	global $db;
		// 	$condition = array('file_id' => $_POST['file_id']);
		// 	return pg_update($db, 'files', $_POST, $condition);
		// }

		// public function Delete($id, $url, $covers) {
		// 	Initiator::Storage()->DeleteCloudinaryAsset('video', $this->GetFileNameFormUrl($url));
		// 	foreach ($covers as $key => $value)
		// 		Initiator::Storage()->DeleteCloudinaryAsset('image', $key . '/' . $this->GetFileNameFormUrl($value));
		
		// 	return pg_delete($db, 'files', $_POST);
		// }
	}

?>