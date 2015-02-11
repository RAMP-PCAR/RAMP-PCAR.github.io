RAMP Deployment with RCS
========================

This document describes how to deploy RAMP and connect it with an existing RCS
deployment.  RAMP works as a standalone application just fine, if you want to
deploy it in that manner just ignore the RCS integration below.  The full RCS
deployment procedure is describe elsewhere.

RAMP Setup
----------

#. Get a RAMP release package that is compatible with the RCS version
   the version numbering does not need to match up, but the RCS release notes
   should indicate which RAMP versions it is compatible with
#. Extract the RAMP deployment package to a directory readable by your web server
#. If you are referencing any non-CORS enabled services please setup an
   appropriate proxy (ESRI has a `github resource
   <https://github.com/Esri/resource-proxy>`_ that provides several under an
   MIT license) and make the appropriate change in the ``config.??.json`` files
   (remember to update both languages)
#. Ensure that your web server sets the MIME type ``application/json`` when
   transferring ``.json`` files
#. Test your RAMP installation to ensure it is working prior to integrating with RCS

Connecting to RCS
-----------------

#. Edit the ``RAMP-starter.js`` file in the root of your RAMP install
#. Set the ``configServiceURL`` to point to your RCS installation (please
   include a trailing slash)
