listeners.defaultWebhookFlowspace = {
    label: 'Catch HTTP flowspace events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/flowspace'
        }
    },
    callback: function(event) {
        sys.logs.info('Received Flowspace webhook. Processing and triggering a package event.');
        let signature = event.data.headers['X-Flowspace-Signature'];
        if (! signature) {
            return 'ok';
        }
        signature = signature.replace(/^sha256\=/, '');
        let body = event.data.rawBody;
        if (pkg.flowspace.functions.verifySignature(body, signature)) {
            sys.events.triggerEvent('flowspace:webhook', event.data.body);
            return 'ok';
        } else {
            throw new Error('Invalid webhook');
        }
    }
};