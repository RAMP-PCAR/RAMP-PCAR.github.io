Deployment
==========

RCS uses Python and CouchDB and should be deployable on any platform that
supports both.  Currently deployment notes are provided only for Windows (and
tested with 2008r2 and 2012).

Installation on Windows (IIS + FastCGI)
---------------------------------------

Install `CouchDB <http://couchdb.apache.org/>`_
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#. Run the installer
#. Open a web browser and navigate to http://127.0.0.1:5984/_utils
#. Setup the admin account (see link in bottom left of the window)
#. Update the configuration to listen on the correct network address (Tools | Configuration | bind_addr)
#. Create a database ``rcs_cache`` (navigate to Overview | Create Database)
#. Update the security for the ``rcs_cache`` database set Admin Roles: ``["rcs"]`` and Member Roles: ``["rcs"]``
#. Create a second database ``rcs_auth`` with the same permissions
#. Add a new user to the ``_users`` database (Overview | _users | Create Document)
#. Select source and enter the following then save document
    .. code-block:: javascript

        {
            "_id": "org.couchdb.user:rcs",
            "name": "rcs",
            "roles": ["rcs"],
            "type": "user",
            "password": "changeme"
        }
#. Logout and attempt to login as user ``rcs`` to test the setup
#. Confirm that access to ``_users`` is restricted and access to ``rcs_cache`` and ``rcs_auth`` is enabled

.. _pyvenvconfig:

Configure Python Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Ensure python is a 2.7.x release
#. Get an RCS release package ``rcs-X.Y.Z.zip``
#. Extract the release package, it should be somewhere IIS can be configured to read from ``c:\inetpub\rcs-X.Y.Z``
#. [Optional] Get prepackaged dependencies (should be a directory full of ``.whl`` files)
#. Install pip (https://pip.pypa.io/en/latest/installing.html)
#. Install virtualenv ``pip install virtualenv``
#. Create python virtual environment in the release location and activate it
    .. code-block:: bat

        cd c:\inetpub\rcs-X.Y.Z
        virtualenv .
        scripts\activate
#. Install the project dependencies (perform only one of the following steps):

    * via internet ``pip install -r requirements.txt``
    * via local wheel cache ``pip install --use-wheel --no-index --find-links=c:\path\to\wheel\dir -r requirements.txt``

#. Update the configuration in ``config.py`` or set the environment variable ``RCS_CONFIG``
   to point to a config which overrides the defaults set in ``config.py``.  See :ref:`config` for a
   full description for all options, at a minimum update the following:

    * **DB_CONN** should match the account, password and host settings from the CouchDB installation
    * **REG_SCHEMA** should point to an absolute path (e.g. ``c:\\inetpub\\rcs\\rcs_schema_v1.json``
      -- use double backslashes to avoid string escape codes) 
    * **LOG_FILE** should point to an absolute path (e.g. ``c:\\inetpub\\rcs\\rcs.log``)
      this file should be writable by IIS
    * **LOG_LEVEL** set the log level to something appropriate (e.g. 20 for QC, 30 for Prod)
#. Test the installation ``python rcs.py`` (this will run a test server on localhost)
#. Seed the database ``python seed_qa_keys.py`` (**do not perform this in pproduction**)

IIS Integration
^^^^^^^^^^^^^^^

#. Ensure IIS has CGI support (http://www.iis.net/configreference/system.webserver/cgi)
#. Create a website in IIS and point it to the Python virtual environment
#. Go to the website | Handler Mappings | Add Module Mapping ...
    .. code-block:: yaml

        Request Path: *
        Module: FastCgiModule
        Executable: C:\inetpub\rcs-X.Y.Z\Scripts\python.exe|C:\inetpub\rcs-X.Y.Z\wfastcgi.py
        Name: (name)
#. If **URL_PREFIX** was set in the configuration it should be applied to the
   ``Request Path`` setting (e.g. ``/rcs1/*`` for a prefix of ``/rcs1``).
#. Go back to the server settings | FastCgi Settings | Right click Edit
#. Select Environment variables and add the following:
    .. code-block:: yaml

        PYTHONPATH: C:\inetpub\rcs\
        WSGI_HANDLER: rcs.app

Upgrading from 1.x on Windows (IIS + FastCgi)
---------------------------------------------

Upgrading RCS can be performed in place wihtout the need to change the IIS
configuration.  If you are upgrading from a post 1.5 release then there is
no need to reinstall or reconfigure CouchDB either.

The following steps can be used in lieu of :ref:`pyvenvconfig` :

#. Get an RCS release package ``rcs-X.Y.Z.zip``
#. In the existing RCS directory (e.g. ``c:\inetpub\rcs``) remove all folders
   except ``Lib``, ``Scripts`` and ``Include``.  By keeping those folders the
   virtualenv will remain intact.  Remove all files except ``wfastcgi.py`` and
   ``config.py``.
#. If ``wfastcgi.py`` was removed please recreate the module mapping as
   described in `IIS Integration`_ .
#. Extract the release package into the existing directory, by default it will
   extract into a subdirectory ``rcs-X.Y.Z`` and those files should be moved to
   the top level directory.
#. Go into the RCS directory and activate the virtualenv:
    .. code-block:: bat

        cd c:\inetpub\rcs
        scripts\activate
#. Install any new dependencies (do either one of the following):

    * via internet ``pip install -r requirements.txt``
    * via local wheel cache ``pip install --use-wheel --no-index --find-links=c:\path\to\wheel\dir -r requirements.txt``
#. Update the following in ``config.py`` or the file pointed to by the enviornment variable ``RCS_CONFIG``:

    * **DB_CONN** should match the account, password and host settings from the CouchDB installation
    * **REG_SCHEMA** should point to an absolute path (e.g. ``c:\\inetpub\\rcs\\rcs_schema_v1.json``
      -- use double backslashes to avoid string escape codes) 
    * **LOG_FILE** should point to an absolute path (e.g. ``c:\\inetpub\\rcs\\rcs.log``)
      this file should be writable by IIS
    * **LOG_LEVEL** set the log level to something appropriate (e.g. 20 for QC, 30 for Prod)
#. Test the installation ``python rcs.py`` (this will run a test server on localhost)
#. Follow any other version specific upgrade notes in this section.

Upgrading from 1.6 to 1.7 or 1.8
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Version 1.7 of RCS adds the capability to use a URL prefix for an RCS
installation.  This makes it possible to deploy multiple copies of RCS side by
side in IIS.  To prefix an existing RCS install please follow the steps.

#. Select a common directory for the various RCS installations to share (this
   is only necessary if IIS needs to serve up static files)
#. Create or copy RCS installations into various subfolders (e.g. ``rcs1`` and
   ``rcs2``)
#. In IIS create or modify a website to be the root for the various RCS installations
#. (Optional) The root directory should point to the common directory for the
   RCS installations
#. For each RCS installation add a handler as described above using a Request
   Path of ``/<subfolder name>/*`` (if static files are not needed the prefix
   may be any prefix identifying the RCS installation)
#. In the RCS installation set the configuration parameter **URL_PREFIX** (e.g.
   ``/rcs1`` for a request path of ``/rcs1/*``)

Upgrading from 1.7 to 1.8
^^^^^^^^^^^^^^^^^^^^^^^^^

RCS 1.8 adds a new endpoint but does not require any additional deployment changes.

Upgrading from 1.8.0 to 1.8.1
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

RCS 1.8.1 fixes issues in 1.8.0, no addtional deployment changes.

Verification
------------

This is a small test that can verify if all the major components have been installed.

#. RCS comes pre-packaged with a testing interface, where you can test the
   GET, PUT, REGISTER, and DELETE requests. The full service contract is
   available at :ref:`contract`
#. In a browser, load up http://rcs.localhost/static/test.html (replacing the
   hostname with the correct path to rcs)
#. Enter a smallkey value (e.g. “test”)
#. Press the *Feature* button in the second row of buttons
#. Press *PUT*
#. If successful you will see a ``201`` code that the service was properly added to the database
#. Press *GET*
#. It should return a JSON object with a status code of ``200``
#. If a version of RAMP is configured alongside the RCS install the test can be
   extended by visiting the following RAMP URL:
   ``http://ramp.localhost/ramp-en.html?keys=test`` (replacing the hostname
   with the correct value)
