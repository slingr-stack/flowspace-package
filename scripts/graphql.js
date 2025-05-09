const FLOWSPACE_URL = 'https://api.flow.space';
const FLOWSPACE_SANDBOX_URL = 'https://flowspace.dev';

/**
 * Execute a query on the Flowspace
 * @param {String} query GraphQL query
 * @param {Object} [variables] 
 * @returns Response from Flowspace GraphQL API
 */
exports.query = (query, variables) => {
    if (typeof query !== 'string') {
        throw 'Flowspace GraphQL: No query submitted or invalid string';
    }
    let baseUrl = FLOWSPACE_URL;
    let isSandbox = config.get('flowspaceEnvironment') === 'SANDBOX';
    if (isSandbox) {
        baseUrl = FLOWSPACE_SANDBOX_URL;
    }
    const url = `${baseUrl}/graphql`;
    const apiKey = config.get('flowspaceApiKey');
    let body = {
        query,
        variables: variables || {},
    };
    sys.logs.debug(`GraphQL: ${query.substring(0, 15)}...`, body);
    let response = svc.http.post({
        url: url,
        headers: {
            'Flowspace-Auth': apiKey,
            'Content-Type': 'application/json',
        },
        body: body,
    });
    return response;
}
