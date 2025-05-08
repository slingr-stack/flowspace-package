# Flowspace Package

## Overview

Repo: [https://github.com/slingr-stack/flowspace-package](https://github.com/slingr-stack/flowspace-package)

```js
let query = `query {
    user {
      name
      organizationId
    }
}`;
return pkg.flowspace.graphql.query(query);
```

### Documentation

For more query examples and information check the [Flowspace developer's reference](https://developers.flow.space/)

## Configuration

To get the API Key Flowspace documentation says that you should contact your account representative.

### Flowspace API Key

**Name**: `flowspaceApiKey` **Type**: text **Mandatory**: true

The API Key that signs all the queries and mutations to the Flowspace GraphQL API.

## Flowspace Environment

**Name**: `flowspaceEnvironment` **Type**: text **Mandatory**: true

Wether the calls should go to the Sandbox or the Production environment.

## Javascript API

### GraphQL Queries

You can use the only helper to make a GraphQL query to the Flowspace API.

```js
let query = `query {
  user {
    name
    organizationId
  }
}`
let res = pkg.flowspace.graphql.query(query);
log(JSON.stringify(res));
```

With Variables:

```js
let query = `  query($orderId: ID!) {
  outboundOrder(id: $orderId) {
    id
    status
  }
}`
let res = pkg.flowspace.graphql.query(query, {
  orderId: '123',
  organizationId: '57c74544-cdaa-4823-977b-e28e2d36646d',
});
log(JSON.stringify(res));
```

## Events

### Webhoook

Subscribe to a Flowspace event like this:

```js
let query = `subscription {
  outboundShipmentEvents(
    topic: SHIPMENT_PACKED
    customerId: ""
    subscriberDetails: { remoteUrl: "https://app-name.slingrs.io/dev/services/http/flowspace", remoteSecret: "XXXX" }
  ) {
    subscriptionId
    outboundShipment {
      id
      status
    }
  }
}`
let res = pkg.flowspace.graphql.query(query);
log(JSON.stringify(res));
```

Remember to update the `remoteSecret` url to match with the secret you used to subscribe to the topic event.

## About Slingr

Slingr is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about Slingr](https://slingr.io)

## License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
