# MusicPlayer
A Cross-Devices & Cross-Browsers MusicPlayer

## Installation:

### Environment building:
Fill the provisions folder with you personnal terraform.tfvars, then do:

```
terraform init
terraform plan
```

check the details, then:
```
terraform apply
```

### Database building:
Use the db_schema/db.sql to build your postgresql local database.

Once builded, create a new row in "cloudinary_api" table and set your logs from your cloudinary setted in your heroku environment.
#### Note:
A future Update will allow you to set your cloudinary's credentials directly in the musicplayer interface.

Then create a new row in "users" table with your login, your password (hash: sha256), & a random varchar for user_session_id.

Finally, push this local db your heroku app's db.
```
heroku pg:push your_local_db_name DATABASE_URL -a your_heroku_app_name
```

Enjoy !