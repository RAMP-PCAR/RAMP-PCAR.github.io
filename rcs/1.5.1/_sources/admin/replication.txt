Replication
===========

RCS was designed to be deployed in a load balanced environment.  The following
steps can be used to setup CouchDB for master-master replication if it is deployed
on systems which follow the same partitioning as the load balancer.

The notes are relatively straightforward, but only cover simple network architectures
where a few servers are connected over local links.

Replication Setup
-----------------

All replication in CouchDB is unidirectional from the source to the target.  There
seems to be a common convention of setting a remote as the source and local as the
target.  CouchDB uses a special database named ``_replicator`` for keeping replications;
setting up a replication involves sending a PUT request to ``/_replicator/<replication_id>``.
Replication IDs can be any short string and RCS will use the convention ``rep_serverX_rcs``.

The payload for the replication request is:

.. code-block:: javascript

    {
        "source":"http://rcs:rcs@serverX:5984/rcs_cache",
        "target":"rcs_cache",
        "continuous":true,
        "create_target":false,
        "user_ctx":{
            "name":"rcs",
            "roles":["rcs"]
        }
    }

Please make the necessary updates to the source URL (it is in the form
``<user>:<password>@<server ip or name>:<port>/<database name>``).

If `curl <http://curl.haxx.se/download.html>`_ is available on your system you can copy
and paste the following.

.. code-block:: shell

    curl -X PUT http://admin:admin@localhost:5984/_replicator/rep_server4_rcs -d '{ "source":"http://rcs:rcs@serverX:5984/rcs_cache", "target":"rcs_cache", "continuous":true, "create_target":false, "user_ctx":{"name":"rcs", "roles":["rcs"]} }'

The following bash script can be used to setup a 4 node replication.

.. code-block:: bash

    HOST="http://admin:admin@localhost:5984"
    RCS1="http://rcs:rcs@10.0.2.6:5984/rcs_cache"
    RCS2="http://rcs:rcs@10.0.2.7:5984/rcs_cache"
    RCS3="http://rcs:rcs@10.0.2.8:5984/rcs_cache"
    RCS4="http://rcs:rcs@10.0.2.9:5984/rcs_cache"
    REPLICATION="2 3 4"   # do not include the current server in the replication

    curl $HOST #just a test
    for i in $REPLICATION; do
        SRV=RCS$i
        curl -X PUT $HOST/_replicator/rep_server$i_rcs -d "'{ \"source\":\"${!SRV}\", \"target\":\"rcs_cache\", \"continuous\":true, \"create_target\":false, \"user_ctx\":{\"name\":\"rcs\", \"roles\":[\"rcs\"]} }'"
    done
