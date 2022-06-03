package openapi

import (
	"encoding/json"
	"log"
	"os"
	"sync"
)

type Content interface{}

func CreateCacheFile(fname string) *os.File {
	file, err := os.Create(fname)
	if err != nil {
		log.Fatalf(err.Error())
	}
	return file
}

func FileExists(dirname string, fname string) bool {
	files, err := os.ReadDir(dirname)
	if err != nil {
		log.Fatalf("Unable to list dir files")
	}
	for i := range files {
		if fname == files[i].Name() {
			return true
		}

	}
	return false
}

func ReadCacheFile(fname string) ([]byte, error) {

	data, err := os.ReadFile(fname)

	if err != nil {
		log.Print(err.Error())
		return nil, err
	}
	return data, nil

}

func WriteCacheFile(fname string, content []byte) bool {

	var wg sync.WaitGroup

	var CombinedData, OldData, NewData map[string]any
	CombinedData = map[string]any{}

	file, err := ReadCacheFile(fname)
	if err != nil {
		log.Fatal("CACHE 1: ", err.Error())
	}

	if err := json.Unmarshal(file, &OldData); err != nil {
		log.Fatal("CACHE 2: ", err.Error())
	} else if err := json.Unmarshal(content, &NewData); err != nil {
		log.Fatal("CACHE 3: ", err.Error())
	} else {

		wg.Add(2)
		go func(o *map[string]any, n *map[string]any, c *map[string]any) {
			for k, v := range OldData {
				if v == NewData[k] {
					CombinedData[k] = NewData[k]
				}
			}
			wg.Done()
		}(&OldData, &NewData, &CombinedData)

		go func(o *map[string]any, n *map[string]any, c *map[string]any) {
			for k, _ := range NewData {
				if OldData[k] == nil {
					CombinedData[k] = NewData[k]
				}
			}

			wg.Done()

		}(&OldData, &NewData, &CombinedData)

		wg.Wait()

		log.Print(NewData)

	}

	return false
}

func HandleCaching(dirname string, filename string, content *Content, operation string) error {

	if exists := FileExists(dirname, filename); exists {

		// log.Print(OldData["msg"])
		// log.Print(NewData)
		if operation == "write" {
			WriteCacheFile(filename, content)
		}
		return true
	} 
	file := CreateCacheFile()
}
