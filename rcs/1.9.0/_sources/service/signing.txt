.. _signing:

Request Signing
===============

Protocol
--------

All requests which modify the database must be signed.  Signing is performed by
a pre-shared key between the sender and RCS using the following procedure ::

    SIGNATURE := hmac_sha256( MSG, KEY )
    MSG := concat( REQUEST_PATH, SENDER_ID, TIME_STAMP, REQUEST_BODY )
    REQUEST_PATH := <the request path including opening '/' as defined in RFC 2396>
    SENDER_ID := <pre-shared identifier with RCS>
    TIME_STAMP := <ISO 8601 date and time in UTC time zone>
    REQUEST_BODY := JSON fragment | ""

Once the signature has been computed it should be encoded in modified base64 (
http://tools.ietf.org/html/rfc4648#section-5 ) with any padding ``=``
characters stripped from the end.  The encoded signature should be attached to the
HTTP request along with the following custom HTTP headers ::

    Authorization: <signature as encoded above>
    TimeStamp: <ISO 8601 date and time, must match the exact text used for signing> 
    Sender: <pre-shared identifier with RCS>

Once computed, the signature is considered valid for +/- 2 minutes of the time
for which it was computed (to account for any potential clock skew between the
systems).

Example
-------

Here’s a walkthrough of a possible interaction between GeoCat and RCS.  The
sample computations are valid and can be used for testing if a client is
unavailable.

#.  GeoCat and RCS team pre-share a private key and a client identifier.
#.  RCS stores a mapping between the key and the client id (GeoCat).
#.  GeoCat generates REST request for registering a layer in RCS.

    URL
        PUT http://rcs.example.com/register/23ax5t
    Payload
        .. code-block:: javascript

            {"version":"1.0.0","payload_type":"wms","en":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"},"fr":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"}}
    Request time
        2014-12-05T18:28:56.714Z
    Sender ID
        jstest

#.  GeoCat computes the message string by concatenating the fragments specified in the `Protocol`_ section ::

        REQUEST_PATH = /v1/register/23ax5t
        SENDER_ID = jstest
        TIME_STAMP = 2014-12-05T18:28:56.714Z
        REQUEST_BODY =  {"version":"1.0.0","payload_type":"wms","en":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"},"fr":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"}}

    resulting in ::

        MSG = /v1/register/23ax5tjstest2014-12-05T18:28:56.714Z{"version":"1.0.0","payload_type":"wms","en":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"},"fr":{"service_url":"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en","layer":"limits"}}

#.  GeoCat generates the authorization code using the method described in `Protocol`_ ::

        SIGNATURE = hmac_sha256( <MSG as above>, 'test_-k' )
                  = 0xbfa5da41ab32673726fc1cf85bfa797ced706f224a0999c9144b29217c3d7a56

#.  GeoCat encodes the HMAC digest in modified base64 ::

        ENCODED_SIGNATURE = base64_encode( HMAC_DIGEST ).replace('+','-').replace('/','_').replace('=','')
                          = v6XaQasyZzcm_Bz4W_p5fO1wbyJKCZnJFEspIXw9elY

#.  GeoCat appends the HTTP headers ::

        "Authorization: v6XaQasyZzcm_Bz4W_p5fO1wbyJKCZnJFEspIXw9elY"
        "TimeStamp: 2014-12-05T18:28:56.714Z"
        "Sender: jstest"

    and sends the request (sample request escaped for the Windows command prompt) ::

        curl -X PUT http://localhost:5000/v1/register/23ax5t
            -H "Authorization: v6XaQasyZzcm_Bz4W_p5fO1wbyJKCZnJFEspIXw9elY"
            -H "TimeStamp: 2014-12-05T18:28:56.714Z"
            -H "Sender: jstest"
            -H "Content-Type: application/json"
            -d {\"version\":\"1.0.0\",\"payload_type\":\"wms\",\"en\":{\"service_url\":\"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en\",\"layer\":\"limits\"},\"fr\":{\"service_url\":\"http://wms.ess-ws.nrcan.gc.ca/wms/toporama_en\",\"layer\":\"limits\"}}

#.  RCS receives the request
#.  RCS fetches the pre-shared key from the request ::

        KEY = db_lookup('jstest')
            = 'test_-k'

#.  RCS performs the same signature compuation as GeoCat, generating a reference signature
#.  RCS tests that the reference signature matches the signature in the ``Authorization`` header
#.  RCS verifies that the time of request is valid ::

        assert( -2 min < UTC_NOW - TIME_STAMP < 2 min )

#.  RCS executes the request *alternate*: if the verification fails then a 401 error is sent back)


Code Example
------------

Here’s a sample code from our Python unit test ::
    
    smallkey = str(random.randint(100, 1000000))
        
    payload = json.loads('{"version": "1.0.0", "payload_type": "feature", "en": { "service_url": "http://sncr01wbingsdv1.ncr.int.ec.gc.ca/arcgis/rest/services/RAMP/RAMP_ResearchCentres/MapServer/0" }, "fr": { "service_url": "http://sncr01wbingsdv1.ncr.int.ec.gc.ca/arcgis/rest/services/RAMP/RAMP_ResearchCentres/MapServer/0" }}')

    #add timeStamp to the put requeset
    now = datetime.datetime.now( iso8601.iso8601.Utc() )
    timeStamp = now.strftime('%Y-%m-%dT%H:%M:%SZ')

    # construct msg for signing
    msg = '/v1/register/'+smallkey + self.sender + timeStamp + json.dumps(payload)       

    #generate hash
    h = hmac.new( str(self.key), msg, digestmod=hashlib.sha256 )
    signature = base64.urlsafe_b64encode( h.digest() ).replace('=','')

    # add sender, authroization and timestamp.
    headers = {"contentType": "application/json; charset=utf-8", "dataType": "text", "Sender": self.sender, "Authorization": signature, "TimeStamp": timeStamp}

    # run put and get response
    putResponse = requests.put(self.service + 'v1/register/' + smallkey, json=payload, headers=headers)
    
    # status code should be 201
    assert putResponse.status_code == 201
