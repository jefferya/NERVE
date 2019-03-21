# NERVE
Named Entity Recognition Vetting Environment

This is a javascript web service that allows you to upload an XML document, run Stanford NER to recognize entities, and to look up and add URIs to new or pre-existing entities. The current version supports three schemas: TEI (Text Encoding Initiative); Orlando (the Orlando Project's biography and writing schemas) and CWRC (Canadian Writing Research Collaboratory).

Lookups are currenty limited to geonames, VIAF, and the CWRC (Canadian Writing Research Collaboratory) entity collection.

License and documentation forthcoming soon!

## Building from source.
prerequisites: glassfish, ant, git, npm, node<br>
Note: paths are system dependent.

### 1. Checkout repository
> git clone git@github.com:cwrc/NERVE.git (with key)<br>
> git clone git://github.com/cwrc/NERVE.git (without key)<br>

### 2. Build server
Change 'j2ee.server.home' to point to the glassfish server installation.<br>
> export GFSERVER="/home/glassfish/glassfish5.0.1/glassfish/"
> cd server<br>
> npm i<br>
> ant -lib ../lib/JJJRMI.packed-0.4.20.jar -Dj2ee.server.home=$GFSERVER dist<br>

### 3. Deploy to GlassFish Server
> asadmin deploy ./dist/Server.war<br>

If already deployed, redeploy to GlassFish Server<br>
> asadmin redeploy --name=Server ./dist/Server.war<br>

### 4. Build client
Requires browserify, and sass.<br>
> npm i -g browserify<br>
> npm i -g sass<br>
<br>
> cd ../NERScriber<br>
> npm i <br>
> cd ../client<br>
> npm i<br>
> npm run build-js<br>
> npm run build-css<br>
> cp -r public_html/ $GFSERVER/domains/domain1/docroot/nerve

### 5. Link Client to Server
In the client side of the app there a file 'assets/serverlocation'. This file
contains the location of the web socket, the default value is 
'ws://localhost:8080/NERVESERVER/NerveSocket', the 'localhost:8080' needs to be
changed to the ip/name of your server.

## Notes
### Other commands of note
> asadmin start-domain [domain_name]<br>
> asadmin stop-domain [domain_name]<br>
> asadmin list-applications<br>
