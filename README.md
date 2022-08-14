# App City Bike Rentals App frontend


## About this app

This app is for showing the data for city bike rentals and stations in Helsinki Capital area. It has been created using Typescript and React. There is also a backend for this app which is made using Node.js and MongoDB as database. This frontend app uses axios for fetching the data and Material UI for styling the UI.

With this app it is possible to list city bike rental journeys with pagination. The app shows the departure and return stations, covered distance in kilometers and duration in minutes. It is also possible to list city bike stations with pagination where the app is showing the id, name and address of stations. And also you can search for a certain station by name. You can also open a single station view by clicking the name of the station. There you can see the name and address of the station and also the number of journeys which began from and ended to the station.

Before the app can show any info for you, it checks if there are any items saved to the database. If there is nothing saved in it, the app gets info about the journeys and stations from the internet and saves the data to the database. That is why the opening of the app could be slow but there is spinner telling for you that the app is loading data. The frontend and backend should be opened and working on the same time.

## Using this app

For using this app you should fork the repository for your own PC/laptop and give this order in the terminal: 

### `npm install`

After installation give this: 

### `npm start`

for starting it locally.
