# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.parameter import Parameter  # noqa: E501
from openapi_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_parameter(self):
        """Test case for parameter

        
        """
        query_string = [('id', 'id_example')]
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v1/parameter',
            method='GET',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_parameter_0(self):
        """Test case for parameter_0

        Add parameter
        """
        parameter = {
  "default" : "default",
  "name" : "name",
  "description" : "description",
  "id" : "id",
  "commandId" : "commandId",
  "workflowId" : "workflowId"
}
        headers = { 
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/v1/parameter',
            method='POST',
            headers=headers,
            data=json.dumps(parameter),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_parameter_by_id(self):
        """Test case for parameter_by_id

        
        """
        headers = { 
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/v1/parameter/{workflow_id}/{id}'.format(workflow_id='workflow_id_example', id='id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
