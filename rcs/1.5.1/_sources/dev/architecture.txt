RCS Architecture
================

RCS serves as a prefetch and caching tool for RAMP layers.  All regsitration
and lookup calls are handled via a REST API with JSON payloads.  Data storage
is handled by a JSON document store.

Design Principles
-----------------

#. Fast: a slow cache is pointless
#. Scalable: it should run easily in a distributed environment
#. Robust: where possible allow for multiple fallbacks; when errors do occur do
   not let them pass silently

Storage
-------

RCS uses CouchDB as a backend for document storage.  At its core RCS avoids
keeping any state within the application and instead tries to favour the
document store for maintaining state.  CouchDB was chosen for its master-master
replication which allows for easy scaling of multiple nodes and easy partition
recovery.  `pycouchdb <https://github.com/niwibe/py-couchdb>`_ is the Python
driver used for interacting with the data store.

Documents stored in CouchDB should be stored in a structure which closely
follows the RAMP configuration format.  Since the value of the cache is on the
read performance preprocessing during writes is preferred.

REST Endpoints
--------------

The full API for RCS is described in :ref:`contract`, this section merely
addresses a few design decisions.

RCS leverages `Flask <http://flask.pocoo.org/>`_ and the `Flask-RESTful
<https://github.com/flask-restful/flask-restful>`_ extension for the majority
of its web service functionality.

RAMP prefers to serve layers in a unilingual manner, prefering to allow
bilingual access via multiple services.  RCS accomodates this by having layer
lookups to be unilingual but requiring layer registration to be bilingual (i.e.
layer registration for all languages should be done in a single request).  This
avoids the case of missing entries for a particular language.

All endpoints encode a key in the URL.  This key may be any unique identifier,
but ideally it should be short and avoid using characters which need special
URL encoding.

The API is split into two write operations *register* and *delete*, and two
read operations *doc* and *docs*.  The two read operations fetch either a
single document or multiple documents respectively.  Write operations should be
authorized (they are not at the moment).  

Validation of *register* requests is done via a JSON schema.  This allows for
more complex validation and avoids having a lot of code for the validation
task.  The `jsonschema <https://github.com/Julian/jsonschema>`_ library is used
for validation.

Parsers
-------

RCS currently accepts ESRI feature layers and WMS layers in its cache.

ESRI feature layers trigger a lot of prefetching, the payload from the catalog
can be fairly minor (just a URL is a valid request).  Prefetching is performed
for the symbology and feature attributes, images used for symbology are encoded
in data URLs and cached in RCS to avoid RAMP having to make multiple image
requests later.  The `requests <https://github.com/kennethreitz/requests>`_
library is used for performing web requests.

WMS layers are much simpler from a processing point of view.  The registration
payload encodes most of the data and RCS merely translates it into a RAMP
readable configuration fragment.
