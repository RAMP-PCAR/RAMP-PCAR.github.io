Service Quick Reference
=======================

RCS currently exposes 5 REST endpoints.

========================================  ==================================================================
Endpoint                                  Description
========================================  ==================================================================
GET /doc/[lang]/[smallkey]                Retrieves a single configuration fragment
GET /docs/[lang]/[smallkey]{,[smallkey]}  Retrieves multiple configuration fragments
PUT /register/[smallkey]                  Stores a configuration fragment
DELETE /register/[smallkey]               Deletes a configuration fragment
POST /update/[age]                        Updates all cached fragements older than [age] days
PUT /simplification/[smallkey]            Add a geometry simplification factor to feature layer configuration fragment
========================================  ==================================================================

The RAMP client is intended to call the GET driven endpoints for dynamically
loading layers.  These functions are intended to be extensible and also allow
for the retrieval of generic configuration as well.

The data catalogue is intended to call the PUT and DELETE endpoints for storing
data.  Currently registration will accept ESRI feature service endpoints and WMS
endpoints.

More details are available on the :ref:`contract` page.
