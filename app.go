package main

import (
	"github.com/gin-gonic/gin"
	"gopkg.in/resty.v1"
	"sync"
)

const url string = "http://localhost:6000"
const N int = 10
const PORT string = ":8000"

func doRequests() []string {
	var wg sync.WaitGroup
	responses := make([]string, N)
	for i := 0; i < N; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			resp, err := resty.R().Get(url)
			_ = err
			responses[i] = resp.String()
		}(i)
	}
	wg.Wait()
	return responses
}

func main() {
	r := gin.Default()
	r.GET("/bench", func(c *gin.Context) {
		responses := doRequests()
		c.JSON(200, responses)
	})
	r.Run(PORT) // listen and serve on 0.0.0.0:8000
}
