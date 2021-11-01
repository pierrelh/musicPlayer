<?php

	class Files {	
		public function GetFileNameFormUrl($url) {
			$url = explode('/', $url);
			$filename = array_pop($url);
			$filename = explode('.', $filename);
			return $filename[0];
		}

		public function GetAll() {
			global $db;
			$request = 'SELECT *
						FROM files
						ORDER BY ' . $_POST['row'] . ' ' . $_POST['type'];

			$result = pg_query($db, $request);
			if (!empty($result))
				return pg_fetch_all($result);
			return false;
		}

		public function UploadCover() {
			$coverSizes = [
				'x96'=> 96,
				'x128'=> 128,
				'x192'=> 192,
				'x256'=> 256,
				'x384'=> 384,
				'x512'=> 512
			];
			$cover = $_FILES['cover'];
			$urls = array();
			foreach ($coverSizes as $directory => $size)
				$urls[$directory] = Storage::UploadCover($cover['tmp_name'], $cover['name'], false, $directory, $size);
			return $urls;
		}

		public function Upload() {
			$covers = json_decode($_POST['file_covers']);
			global $db;
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
			return $result = pg_query_params(
				$db,
				$request,
				array(
					$_POST['file_name'],
					$_POST['file_url'],
					$covers->x96,
					$covers->x128,
					$covers->x192,
					$covers->x256,
					$covers->x384,
					$covers->x512,
					$_POST['file_author'],
					$_POST['file_album']
				)
			);
		}

		public function UploadMusic() {
			$music = $_FILES['music']; 
			return Storage::UploadMusic($music['tmp_name'], $music['name']);
		}

		public function Edit() {
			global $db;	
			if (isset($_FILES['file_image']) && $_FILES['file_image'] != 'undefined') {
				$files = $_FILES['file_image'];
				$files = is_array($files) ? $files : array( $files );
		
				// Uploading on overwriting the new cover
				$covers = json_decode($_POST['covers']);
		
				foreach ($covers as $directory => $path) {
					$size = str_replace('x', '', $directory);
					$key = 'file_cover_' . $size;
					$_POST[$key] = uploadCover($files['tmp_name'], $this::GetFileNameFormUrl($path), true, $directory, intval($size));
				}
			}
		
			unset($_POST['covers'], $_POST['file_image']);
		
			// Updating the db
			$condition = array('file_id' => $_POST['file_id']);
			return pg_update($db, 'files', $_POST, $condition);
		}

		public function Delete() {
			// Delete file audio
			Storage::DeleteCloudinaryAsset('video', $this::GetFileNameFormUrl($_POST['file_url']));
			unset($_POST['file_url']);
		
			$covers = json_decode($_POST['file_covers']);
			foreach ($covers as $key => $value) {
				$path = $key . '/' . $this->GetFileNameFormUrl($value);
				Storage::DeleteCloudinaryAsset('image', $path);
			}
			unset($_POST['file_covers']);
		
			// Deleting the db row
			global $db;
			return pg_delete($db, 'files', $_POST);
		}
	}

?>