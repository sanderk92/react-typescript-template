# React Typescript Template

This project contains a complete template for a React Typescript project, including:
- Token based auth
- OpenApi client generation for the backend
- Navigation and basic components based on Chakra-UI
- Basic error handling

## Running locally
This project depends on the OpenAPI spec from the backend defined in the `spring-kotlin-template`. Currently,
the specification is retrieved from a running application, but when the template is used for a project the 
specifications should be published to a separate repository. In order to run this application, you should first follow
the run instructions for the [backend](https://github.com/sanderk92/spring-kotlin-template), and then run:

```shell
# Generate the required backend clients
npm run generate
```

```shell
# Run the dev server
npm run dev
```