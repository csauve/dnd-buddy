# DND Buddy (WIP)
A collaborative webapp for tabletop games.

## Requirements
* When acting as a GM, the app should let me build out the game session during or before play
* I want to use the app on my phone, laptop, or PC
* I want the app to let me visualize the game session
* I don't want the interface to impede collaboration and communication
* I want changes to the game session by others to be shared with me in real time
* I don't want to rebuild the game session every time I join
* I want to be able to modify the game session quickly and easily, or else I might not bother
* I want to visualize maps, battles, and items
* I want the app to host and separate multiple campaigns
* I want to view multiple visualizations simultaneously
* I may want the app to assist in setting the mood with sounds
* I may want the app to include video/voice feeds for remote players

## Design Notes
Since some players will be joining remotely, the app should enable the kinds of interactions that are non-issues in person. It is a means to share a common understanding of the game in session. Therefore it needs to be simple and painless enough to encourage this sharing. Aim for one-touch/click interactions.

### Login
Login is a simple selection of campaign and providing a user name. The login screen will also permit the creation of new campaigns. All persistent data is stored associated to a campaign. This provides a location for password protection in the future, if desired.

### Pages
The app shall implement a basic tiling window manager in the browser, allowing each user/device to have a customized view of a set of available "Pages". The user is notified of changes to pages not in their view. The contents of pages are synchronized between users and persisted on the server, while the user's views are not.

The UI will need functionality to display available pages create new ones by choosing from the set of available types. Once created, they are added to the user's view. Removing the page from the user's view does not delete the page itself, with the exception of webcam pages.

View management should make efficient use of space for small screen sizes. This means hiding/avoiding bars, tabs, etc. unless contextually relevant to the task of view management. During normal usage, the app should focus on page content. Consider using common and simple gestures for view management that do not conflict with individual page interactions.

#### Canvas
The canvas page allows users to draw in a scrollable space, optionally on top of a background image. Users can choose from a number of colours or an eraser. The page's drawings, pan, and zoom are synchronized. As lines are being draw, other users see a temporary tag with the name of the drawing user. Users switch between pen, eraser, and pan/zoom modes.
* Count: any number
* Lifespan: until deleted
* Persistence: yes

#### Text
The text page allows users to write arbitrary text. This may be used to for keeping track of quests, writing plans as the GM, or other session notes.
* Count: any number
* Lifespan: until deleted
* Persistence: yes

#### Webcam
The webcam page can be created by any user, and will contain a video feed from their webcam. Only when added to another user's view will its audio be output on their device.
* Count: maximum 1 per user (presenter)
* Lifespan: until removed from presenter's view
* Persistence: no

#### Soundboard
TBD

## Implementation Notes
* Look into WebRTC for the video support

## Local Development
Node.js and gulp are required to run and build the project.

```sh
# install build and runtime dependencies
$ npm install

# build static client assets
$ gulp

# run the server
$ npm start
$ open http://localhost:8080
```

You may also wish to live-rebuild client assets during development:

```sh
$ gulp dev
```