const mongoose = require('mongoose'); // mongoose for mongodb
const database = require('./config/database'); // load the database config
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pathModule = require('path');

class ServerAppComponent {
    beforeRegister() {
        this.is = 'server-app';
    }

    ready() {
        this.port = process.env.PORT || 8080;
        this.listenCallback = () => {
            console.log("App listening on port " + this.port);
        };

        mongoose.connect(database.localUrl); // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

        // set the static files location /public/img will be /img for users
        this.setStatic = (app, express) => {
            app.use(express.static(pathModule.resolve(__dirname, '../client')));
        };

        this.morgan = morgan('dev'); // log every request to the console
        this.bodyParserURL = bodyParser.urlencoded({'extended': 'true'}); // parse application/x-www-form-urlencoded
        this.bodyParserJSON = bodyParser.json(); // parse application/json
        this.bodyParserCustom = bodyParser.json({type: 'application/vnd.api+json'}); // parse application/vnd.api+json as json
        this.methodOverride = methodOverride('X-HTTP-Method-Override'); // override with the X-HTTP-Method-Override header in the request

        this.appHandler = (req, res) => {
            res.sendFile(pathModule.resolve(__dirname, '../client/index.html')); // load the single view file (angular will handle the page changes on the front-end)
        };
    }
}

Polymer(ServerAppComponent);
