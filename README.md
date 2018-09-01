# Front boilerplate

## Scripts

To start your aplication locally

```
$ npm run dev
```

## Improvements and caveats

### State
For speed purposes the app manages the state for each component, a better aproach could be manage the state by redux

### Date
The arrival date is now copied by the departure date, this could be calculated or provided by the API

### Route id
At this moment the id is a random number, this don't guarantee the integrity of the data, the backend should manage the id creation

### Component organization
For code economics the component could be better abstracted

### CSS
a better idea is to have the css for each screen and not in on big CSS

### Validation
This app just validate that the fields are not empty, that could be improved

### API proxy
This example have a proxy for "origin" endpoints because it didn't accept cross origin petitios, so that the URL endpoints in the code are inconsitent, so that it should be changed to all proxied endpoints or allow cross origin in the backend (maybe just from a development URL)

### Configuration
A lot of data could be handled by a configuration file (constants, api urls, key) that would be cleaner and helpful for manage different environments

