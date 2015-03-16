.. _contract_09:

RCS Service Contract
====================

RCS publishes a set of endpoints at ``/v0.9``, these only support read
operations for RAMP prior to RAMP configuration schema version 1.0 .  This
should be compatible with RAMP 4.0.x (Dragonfly) releases.

GET ``/v0.9/doc/[lang]/[smallkey]``
-----------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Object

The response will have a JSON configuration fragment to be merged into the RAMP
configuration.

Error conditions:

- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 404 Not Found, response body empty

GET ``/v0.9/docs/[lang]/[smallkey]{,[smallkey]}``
-------------------------------------------------

Success Code: 200

Request Body: Empty

Response Body: JSON Array

The response will be an array of JSON objects, each object will be a JSON
configuration fragment to be merged into the RAMP config.

Error conditions:

- invalid language code: 400 Bad Request, response body empty
- smallkey not found: 200 normal response, the corresponding fragment will be
  structured as:
  ``{"error_code":404,"smallkey":"[smallkey]"}``
