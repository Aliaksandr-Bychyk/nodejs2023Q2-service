# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```
Or
```
npm install --legacy-peer-deps
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## API

There are `Users`, `Artists`, `Albums`, `Tracks` and `Favorites` REST endpoints with separate router paths
  * `Users` (`/user`)
    * `GET /user` - get all users
      - Server answers with `status code` **200** and all users records
    * `GET /user/:id` - get single user by id
      - Server answers with `status code` **200** and and record with `id === userId` if it exists
      - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    * `POST /user` - create user (following to `CreateUserDto` DTO)
      
      ```typescript
      interface CreateUserDto {
        login: string;
        password: string;
      }
      ```
        - Server answers with `status code` **201** and newly created record if request is valid
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /user/:id` - update user's password (following to `UpdatePasswordDto` DTO)
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
      }
      ```
      - Server answers with` status code` **200** and updated record if request is valid
      - Server answers with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server  answers with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
      - Server  answers with` status code` **403** and corresponding message if `oldPassword` is wrong
    * `DELETE /user/:id` - delete user
      - Server  answers with `status code` **204** if the record is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

  * `Tracks` (`/track` route)
    * `GET /track` - get all tracks
      - Server  answers with `status code` **200** and all tracks records
    * `GET /track/:id` - get single track by id
      - Server  answers with `status code` **200** and and record with `id === trackId` if it exists
      - Server  answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `POST /track` - create new track
      - Server  answers with `status code` **201** and newly created record if request is valid
      - Server  answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /track/:id` - update track info
      - Server  answers with` status code` **200** and updated record if request is valid
      - Server  answers with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server  answers with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `DELETE /track/:id` - delete track
      - Server  answers with `status code` **204** if the record is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

  * `Artists` (`/artist` route)
    * `GET /artist` - get all artists
      - Server  answers with `status code` **200** and all artists records
    * `GET /artist/:id` - get single artist by id
      - Server  answers with `status code` **200** and and record with `id === artistId` if it exists
      - Server  answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `POST /artist` - create new artist
      - Server  answers with `status code` **201** and newly created record if request is valid
      - Server  answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /artist/:id` - update artist info
      - Server  answers with` status code` **200** and updated record if request is valid
      - Server  answers with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
      - Server  answers with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `DELETE /artist/:id` - delete album
      - Server  answers with `status code` **204** if the record is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

  * `Albums` (`/album` route)
    * `GET /album` - get all albums
      - Server  answers with `status code` **200** and all albums records
    * `GET /album/:id` - get single album by id
      - Server  answers with `status code` **200** and and record with `id === albumId` if it exists
      - Server  answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `POST /album` - create new album
      - Server  answers with `status code` **201** and newly created record if request is valid
      - Server  answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /album/:id` - update album info
      - Server  answers with` status code` **200** and updated record if request is valid
      - Server  answers with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server  answers with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `DELETE /album/:id` - delete album
      - Server  answers with `status code` **204** if the record is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

  * `Favorites`
    * `GET /favs` - get all favorites
      - Server  answers with `status code` **200** and all favorite records (**not their ids**), split by entity type:
      ```typescript
      interface FavoritesResponse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    * `POST /favs/track/:id` - add track to the favorites
      - Server  answers with `status code` **201** and corresponding message if track with `id === trackId` exists
      - Server  answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server  answers with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
    * `DELETE /favs/track/:id` - delete track from favorites
      - Server  answers with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if corresponding track is not favorite
    * `POST /favs/album/:id` - add album to the favorites
      - Server  answers with `status code` **201** and corresponding message if album with `id === albumId` exists
      - Server  answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server  answers with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
    * `DELETE /favs/album/:id` - delete album from favorites
      - Server  answers with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if corresponding album is not favorite
    * `POST /favs/artist/:id` - add artist to the favorites
      - Server  answers with `status code` **201** and corresponding message if artist with `id === artistId` exists
      - Server  answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server  answers with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
    * `DELETE /favs/artist/:id` - delete artist from favorites
      - Server  answers with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
      - Server  answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server  answers with `status code` **404** and corresponding message if corresponding artist is not favorite

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- test/albums.e2e.spec.ts // for albums tests
```
```
npm run test -- test/artists.e2e.spec.ts // for artists tests
```
```
npm run test -- test/favorites.e2e.spec.ts // for favorites tests
```
```
npm run test -- test/tracks.e2e.spec.ts // for tracks tests
```
```
npm run test -- test/users.e2e.spec.ts // for users tests
```

<!-- To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
``` -->

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

