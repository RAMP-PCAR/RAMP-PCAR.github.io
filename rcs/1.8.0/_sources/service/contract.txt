.. _contract:

RCS Service Contract
====================

This release of RCS publishes endpoints at ``/v1`` and ``/v0.9``.  The
endpoints at ``/v1`` are compatible with registration requests for schemas 1.0
and 1.1 and document requests for RAMP schema 1.0 .

The current JSON schema is used to validate registration requests is at:

.. toctree::

    jsonschema

An older schema for RAMP versions prior to schema 1.0 is documented at:

.. toctree::

    endpoint_09

GET ``/v1/doc/[lang]/[smallkey]``
---------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Object

The response will have a JSON configuration fragment to be merged into the RAMP
configuration.  It will be compatible with RAMP schema 1.0, although as it is a
fragment it will not validate against the schema without additional
configuration being supplied.

Error conditions:

- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 404 Not Found, response body empty

GET ``/v1/docs/[lang]/[smallkey]{,[smallkey]}``
-----------------------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Array

The response will be an array of JSON objects, each object will be a JSON
configuration fragment to be merged into the RAMP config.  It will be
compatible with RAMP schema 1.0, although as it is a fragment it will not
validate against the schema without additional configuration being supplied.

Error conditions:

- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 200 normal response, the corresponding fragment will be
  structured as:
  ``{"error_code":404,"smallkey":"[smallkey]"}``

PUT ``/v1/register/[smallkey]``
-------------------------------

Success Code: 201

Request Body: JSON Object

Request Headers: Implement the :ref:`signing` protocol

Response Body: Empty

Error Conditions:

- payload does not conform to schema: 400 Bad Request, body contains
  ``{"errors":["message 1","message 2"]}``
- invalid timestamp format: 400 Bad Request
- unable to verify metadata surce: 400 Bad Request
- missing headers / unretrivable key: 401 Not Authorized
- exception in processing: 500 Internal Server Error, empty body

Registration requests are validated against 
The body of the request should conform to:

.. code-block:: javascript

    {"version":"1.1.0","payload_type":("feature","wms"),"en":(payload),"fr":(payload) }

- RCS currently accepts 1.0.0 and 1.1.0 requests

Payload Type ``feature``
^^^^^^^^^^^^^^^^^^^^^^^^

The feature payload should conform to:

.. code-block:: javascript

    {
        "service_url": (str: URL to ESRI REST Feature Layer Endpoint),
        "service_name": (str: Layer Name),
        "display_field": (str: Layer Attribute),
        "metadata": {
            "uuid": (str: a unique identifier),
            "catalogue_url": (str: URL describing the layer in full detail)
            "metadata_url": (str: direct URL to metadata for that layer)
        }
    }

- the service URL should not have any query string component
- ``metadata``, ``display_field``, ``service_name`` are optional
- where ``service_url`` specifies Feature Layer endpoint, this may be an
  endpoint from a *Feature Service* or a *Map Service*; what is important is
  that the URL should reference the layer id within it
- *NOTE metadata should be present for most layers, it is left as optional
  only for exceptional cases*
- one of ``uuid`` or ``*_url`` should be specified
- ``metadata_url`` should be direct URL to the layer's metadata which should be in XML format
- ``catalogue_url`` should be a URL linking back to the catalogue's page describing the layer
- ``uuid`` should be a unique identifier which can be prefixed with a
  preconfigured metadata URL to retrieve specific metadata for that layer

Payload Type ``wms``
^^^^^^^^^^^^^^^^^^^^

The wms payload should conform to:

.. code-block:: javascript

    {
        "service_url": (str: URL to WMS Service),
        "layer": (str: Layer Identifier),
        "legend_format": (str: MIME type)",
        "feature_info_type": (str: MIME type),
        "metadata": {
            "uuid": (str: a unique identifier),
            "catalogue_url": (str: URL describing the layer in full detail)
            "metadata_url": (str: direct URL to metadata for that layer)
        }
    }

- the service URL should not have any query string component
- ``layer`` is required and must match the a layer identifier specified in the WMS
- ``legend_format`` is an optional string, if present it indicates legend support
  on the WMS and specifies the image MIME type to request from the server
- ``feature_info_type`` is an optional field, if present it indicates feature info support on the WMS, default parsers are available for ``text/html`` (direct HTML code which can be inserted into a RAMP panel), ``text/plain`` (plain text which will be wrapped in a paragraph tag and then inserted into a RAMP panel *NOTE: all formatting will be lost*), and ``application/json`` (a JSON fragment which will have its top level properties displayed in a tabular format in a RAMP panel)
- *NOTE metadata should be present for most layers, it is left as optional
  only for exceptional cases*
- one of ``uuid`` or ``*_url`` should be specified
- ``metadata_url`` should be direct URL to the layer's metadata which should be in XML format
- ``catalogue_url`` should be a URL linking back to the catalogue's page describing the layer
- ``uuid`` should be a unique identifier which can be prefixed with a
  preconfigured metadata URL to retrieve specific metadata for that layer

DELETE ``/v1/register/[smallkey]``
----------------------------------

Success Code: 204

Request Body: Empty

Request Headers: Implement the :ref:`signing` protocol

Response Body: Empty

Error Conditions:

- smallkey not found: 404 Not Found
- invalid timestamp format: 400 Bad Request
- missing headers / unretrivable key: 401 Not Authorized
- exception in processing: 500 Internal Server Error, empty body

POST ``/v1/update/[age]``
-------------------------

*added in RCS 1.8.0*

Success Code: 200

Request Body: Empty

Request Headers: Implement the :ref:`signing` protocol

Request Params: **age** should be either "all" or a positive integer indicating
the minimum age in days that a record should be before it is updated

Response Body: ``{ "success": ["smallkey", …], "errors": {"smallkey": "message", …} }``

Error conditions:

- Age is invalid, error code 400, body {"error":"argument should be either 'all' or a positive integer"}
