/*
 * Parameter
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AddParameter - Add parameter
func AddParameter(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

// GetParameter - 
func GetParameter(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

// GetParameterById - 
func GetParameterById(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}
