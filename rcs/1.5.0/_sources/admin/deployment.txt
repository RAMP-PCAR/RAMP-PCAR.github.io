Deployment
==========

RCS uses Python and CouchDB and should be deployable on any platform that
supports both.  Currently deployment notes are provided only for Windows (and
tested with 2008r2 and 2012).

Windows via IIS and FastCGI
---------------------------

Install [CouchDB](http://couchdb.apache.org/)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#. Run the installer
#. Open a web browser and navigate to http://127.0.0.1:5984/_utils
#. Setup the admin account (see link in bottom left of the window)
#. Update the configuration to listen on the correct network address (Tools | Configuration | bind_addr)
#. Create a database ``rcs_cache`` (navigate to Overview | Create Database)
#. Update the security for the ``rcs_cache`` database set Admin Roles: ``["rcs"]`` and Member Roles: ``["rcs"]``
#. Create a second database ``rcs_sync`` with the same permissions
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
#. Logout and attempt to login as user `rcs` to test the setup
#. Confirm that access to `_users` is restricted and access to `rcs_cache` and `rcs_sync` is enabled

Configure Python Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Ensure python is a 2.7.x release
#. Get an RCS release package ``rcs-X.Y.Z.zip``
#. Extract the release package, it should be somewhere IIS can be configured to read from ``c:\inetpub\rcs-X.Y.Z``
#. [Optional] Get prepackaged dependencies (should be a directory full of ``.whl`` files)
#. Install pip (https://pip.pypa.io/en/latest/installing.html)
#. Install virtualenv ``pip install virtualenv``
#. Create python virtual environment in the release location and activate it
    .. code-block:: shell

        cd c:\inetpub\rcs-X.Y.Z
        virtualenv .
        scripts\activate
#. Install the project dependencies:

    * via internet ``pip install -r requirements.txt``
    * via local wheel cache ``pip install --use-wheel --no-index --find-links=c:\path\to\wheel\dir -r requirements.txt``

#. Update the configuration in ``config.py`` or set the environment variable ``RCS_CONFIG``
   to point to a config which overrides the defaults set in ``config.py``
#. Update the configuration variable for ``REG_SCHEMA`` to an absolute path (e.g. ``c:\\inetpub\\rcs-X.Y.Z``
   -- use double backslashes to avoid string escape codes)
#. Ensure the ``DB_CONN`` variable in the config matches the account, password and other settings
   from the CouchDB installation
#. Test the installation ``python rcs.py`` (this will run a test server on localhost)

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
#. Go back to the server settings | FastCgi Settings | Right click Edit
#. Select Environment variables and add the following:
    .. code-block:: yaml

        PYTHONPATH: C:\inetpub\rcs\
        WSGI_HANDLER: rcs.app
