Development Setup
=================

For development we will be using the built in Flask server, no separate web server
required.  CouchDB will also be installed in admin party mode (every connection
has admin rights).

Install `CouchDB <http://couchdb.apache.org/>`_
-----------------------------------------------
#. Run the installer
#. Open a web browser and navigate to http://127.0.0.1:5984/_utils
#. Create a database ``rcs_cache`` (navigate to Overview | Create Database)
#. Create a second database ``rcs_auth``

Configure Python Environment
----------------------------
#. Ensure python is a 2.7.x release
#. Install pip (https://pip.pypa.io/en/latest/installing.html)
#. Install virtualenv ``pip install virtualenv``
#. Clone the repo ``git clone git@github.com:RAMP-PCAR/RCS.git rcs``
#. Create python virtual environment ``virtualenv rcs``
#. Switch to the project directory ``cd rcs``
#. Activate the virtualenv ``scripts\activate``
#. Install the project dependencies ``pip install -r requirements.txt``
#. Make any path changes necessary to ``config.py`` (if you followed the above there should be none)
#. Test the installation ``python rcs.py`` (this will run a test server on localhost)
#. Seed the database ``python seed_qa_keys.py``
