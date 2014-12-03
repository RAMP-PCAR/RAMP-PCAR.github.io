Building RCS
============

RCS uses standard packaging tools as much as possible.  The current recommendation
for Python appears to be `wheel <http://pythonwheels.com/>`_.

Packaging RCS Only
------------------

If addtional dependencies are not required a source distribution will likely be sufficient.

#. Initialize the virtual environment ``scripts\activate``
#. Edit ``setup.py`` if version or packaged dependencies have changed
#. Edit ``MANIFEST.in`` if any other dependencies (e.g. docs, static test files) have changed
#. Execute ``python setup.py sdist``

Packaging RCS and Dependencies
------------------------------

If you want to prefetch and build all the dependencies (e.g. avoiding tedious
downloads on a server) then execute ``pip wheel . -r requirements.txt``.
Output should be in ``./wheelhouse`` as a set of ``.whl`` files.  This
directory can be used as the installation source for a server deployment.
