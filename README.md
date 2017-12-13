# GO VS NODEJS 

## Structure 

`mock.js` defines a mock server for a uniform random response. I'm calling it `mockserver`
`index.js` defines a node server for calling the mockserver. I'm calling it `nodeserver`
`app.go` defines a go server for calling the mockserver. I'm calling it `goserver`

## Running ! 

To run this benchmarks do the following : 
Install the dependencies: 

```
npm install
go get github.com/gin-gonic/gin
go get -u gopkg.in/resty.v1
```

Running the servers: 

1.  Run the `mockserver`: `node mock.js` (This will start a server listening at 0.0.0.0:6000)
2.  Run the `nodeserver`: `node index.js` (This will start a server listening at 0.0.0.0:7000)
3.  Run the `goserver`: `go run app.go` (This will start a server listening at 0.0.0.0:8000)

Do your benchmarks :) 

For example: 

```
wrk -c1000 -t1 http://localhost:7000/bench
wrk -c1000 -t1 http://localhost:8000/bench
```

## Description 

The aim of this benchmark is to compare high i/o load with low cpu load.

For achieving this i did the following: 
1.  Create a simple http server with ~20ms time of response. The response consist in a simple json consisting in a random js number `Math.random()`. 
2.  Create a node server which after receiving a GET to /bench creates 10 requests, generate a promise for each one and waits for the 10 to finish using Promise.all() then returning an array of the 10 responses
3.  Create a go server which after receiving a GET to /bench creates 10 requests, generates a go routine for each one and wait for the 10 to finish using sync.Wait() then returning an array of the 10 responses


## Disclaimer

If you find any errors let me know =) 
