.. _jsonschema:

The RCS JSON Schema
===================

RCS uses a JSON schema to validate registration requests (see :ref:`contract`).
The schema is written against draft 04 of `JSON Schema
<http://json-schema.org/>`_ and is reproduced below: 

.. literalinclude:: ../../schemas/rcs_reg_schema_v1_1_0.json
    :language: javascript
    :linenos:

A sample request:

.. code-block:: javascript

    {
        "version": "1.1",
        "payload_type": "wms",
        "en": {
            "service_url": "http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en",
            "layer": "limits",
            "metadata": { "uuid": "7" }
        },
        "fr": {
            "service_url": "http://wms.ess-ws.nrcan.gc.ca/wms/toporama_fr",
            "layer": "limits",
            "metadata": { "uuid": "7" }
        }
    }
