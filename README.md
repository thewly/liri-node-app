# liri-node-app

This application allows users to search 3 APIs from the terminal command line using one of 4 search terms. 

Once in the correct folder, with the right packages installed, users will type a 4 part message to make an API call: 

1) "node "

2) "liri.js "

3) One of 4 choices:
    "movie-this " (this will search the OMDB API for movie data)
    "spotify-this-song " (this will search the Spotify API for song data)
    "concert-this " (this will search the BandsInTown API for concert data)
    "do-what-it-says " (this will read a .txt document, which contains data fields 3 & 4)

4) The search term/terms that apply to input #3 (name of a movie, band or song)

Example of a complete call: "node liri.js movie-this The Shawshank Redemption"

Once users submit their 4 part input, they will get their API's returned answer with results formatted in a readable format. 