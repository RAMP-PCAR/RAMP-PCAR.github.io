Preparing a Release
-------------------

How to release a new version of RCS in N easy steps.

#. Update the version in ``/setup.py`` and ``/docs/conf.py``
#. Update ``/docs/admin/deployment.rst`` to describe the upgrade process
#. Build the docs: ::

    cd docs
    make clean
    make html

#. Build RCS as described in :ref:`building`
#. If possible have someone else test the newly packaged version, if that is
   not possible try create a new virtual environment locally and setting up the
   package in there, and barring either of those get your "works on my machine"
   excuses ready
#. In particular watch for missing dependencies, or newly added packages and
   resources (update ``requirements.txt``, or ``setup.py`` and ``MANIFEST.in``
   respectively)
#. Tag the release ``git tag vX.Y.Z``
#. Merge the release into master
#. Copy the docs to rampdocs, there is an RCS folder copy the output from
   ``/docs/_build/html`` to a new directory in rampdocs which should be named
   to match the release version
#. Update rampdocs ``/rcs/index-en.md`` to include a link to the new RCS docs
#. Build rampdocs ``jekyll build``
#. Copy the generated output (``/_site``) to the github repo
#. Push the RCS master branch to github
#. Push the new tags to github
#. In the github web admin UI go to releases (github should detect the new tag
   and prompt to you edit the release)
#. Select the tag and add a description (cover which RAMP versions the RCS
   release is compatible with)
#. Upload the dist files
#. Hope that no one finds a bug 5 minutes after you post the release
