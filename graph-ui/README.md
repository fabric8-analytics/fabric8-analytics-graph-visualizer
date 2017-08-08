# Steps to build
1. cd to `POC/graph-ui`
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start`
5. Application can be accessed at http://localhost:3000

# Scenarios

## Gremlin
- Use this url as the host name `http://gremlin-http-thread-pool.dev.rdu2c.fabric8.io`
- Select `Gremlin` from the dropdown.
- Click button `Proceed`
- Click `Visualize`

## Kronos
- Use the below urls as the host name 
    * `Maven`: `http://kronos-maven-stack-analysis.dev.rdu2c.fabric8.io/api/v1/schemas/kronos_dependency_retrieval`
    * `pypi`: `http://kronos-pypi-stack-analysis.dev.rdu2c.fabric8.io/api/v1/schemas/kronos_dependency_retrieval`
- Select `Kronos` from the dropdown.
- Click button `Visualize`