import connexion
import six
from typing import Dict
from typing import Tuple
from typing import Union

from openapi_server.models.parameter import Parameter  # noqa: E501
from openapi_server import util


def parameter(id):  # noqa: E501
    """parameter

    Retrie a parameter by Id  # noqa: E501

    :param id: 
    :type id: str

    :rtype: Union[str, Tuple[str, int], Tuple[str, int, Dict[str, str]]
    """
    return 'do some magic!'


def parameter_0(parameter=None):  # noqa: E501
    """Add parameter

    Add a new paremeter for a specific command known as owner  # noqa: E501

    :param parameter: 
    :type parameter: dict | bytes

    :rtype: Union[None, Tuple[None, int], Tuple[None, int, Dict[str, str]]
    """
    if connexion.request.is_json:
        parameter = Parameter.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def parameter_by_id(workflow_id, id):  # noqa: E501
    """parameter_by_id

    Retrieve the parameter by workflow Id and parameter Id # noqa: E501

    :param workflow_id: 
    :type workflow_id: str
    :param id: 
    :type id: str

    :rtype: Union[str, Tuple[str, int], Tuple[str, int, Dict[str, str]]
    """
    return 'do some magic!'
