.. _contract:

RCS Service Contract
====================

This is the current draft of the RCS service contract.  It outlines the expected
endpoints and payloads but it is far from finalized.

GET ``/doc/[lang]/[smallkey]``
------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Object

The response will have a JSON configuration fragment to be merged into the RAMP
configuration.

Error conditions:
- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 404 Not Found, response body empty

## GET ``/docs/[lang]/[smallkey]{,[smallkey]}``
-----------------------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Array

The response will be an array of JSON objects, each object will be a JSON
configuration fragment to be merged into the RAMP config.

Error conditions:

- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 200 normal response, the corresponding fragment will be
  structured as follows:
  > ``{"error_code":404,"smallkey":"[smallkey]"}``

PUT ``/register/[smallkey]``
----------------------------

Success Code: 201

Request Body: JSON Object

Response Body: Empty

Error Conditions:

- payload does not conform to schema: 400 Bad Request, body contains:
  > `{"errors":["message 1","message 2"]}`
- exception in processing: 500 Internal Server Error, empty body

The body of the request should conform to:
> ``{"version":"1.0.0","payload_type":("feature","wms"),"en":(payload),"fr":(payload) }``

Payload Type ``feature``
^^^^^^^^^^^^^^^^^^^^^^^^

The feature payload should conform to:

> ``{"service_url":(URL to ESRI REST Service),"service_name":"Layer Name","display_field":"Layer Attribute"}``

- the service URL should not have any query string component
- `display_field` and `service_name` are optional

Payload Type ``wms``
^^^^^^^^^^^^^^^^^^^^

The feature payload should conform to:

.. code-block:: javascript

    {"service_url":(URL to WMS Service),"layer":"Layer Identifier","legend_format":"MIME type","feature_info_type":(?)}

- the service URL should not have any query string component
- `layer` is required and must match the a layer identifier specified in the WMS
- `legend_format` is an optional string, if present it indicates legend support
  on the WMS and specifies the image MIME type to request from the server
- `feature_info_type` is an optional field, if present it indicates feature
  info support on the WMS

DELETE ``/register/[smallkey]``
----------------------------------

Success Code: 204

Request Body: Empty

Response Body: Empty

Error Conditions:

- smallkey not found: 404 Not Found
- exception in processing: 500 Internal Server Error, empty body
