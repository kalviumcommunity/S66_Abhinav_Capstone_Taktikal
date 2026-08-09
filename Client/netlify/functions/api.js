const path = require('path');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

// Local Server/.env for `netlify dev`; production uses Netlify env vars
dotenv.config({ path: path.join(__dirname, '../../../Server/.env') });

const DbConnection = require('../../../Server/db/DbConnection');
const app = require('../../../Server/index');

const handler = serverless(app, {
    request: (request) => {
        let urlPath = request.url || '/';
        urlPath = urlPath.replace(/^\/\.netlify\/functions\/api/, '/api');
        if (!urlPath.startsWith('/api')) {
            urlPath = '/api' + (urlPath.startsWith('/') ? urlPath : `/${urlPath}`);
        }
        request.url = urlPath;
    },
});

let dbReady;

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (!dbReady) {
        dbReady = DbConnection();
    }
    await dbReady;

    if (event && event.path) {
        let p = event.path.replace(/^\/\.netlify\/functions\/api/, '/api');
        if (!p.startsWith('/api')) {
            p = '/api' + (p.startsWith('/') ? p : `/${p}`);
        }
        event.path = p;
        if (event.rawPath) event.rawPath = p;
    }

    return handler(event, context);
};
