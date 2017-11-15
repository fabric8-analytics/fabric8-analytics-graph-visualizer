# Instructions

## Steps to build and run

1. Open a terminal
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start`
5. Application can be accessed at http://localhost:3000

## Steps to build and deploy
1. Run `npm install`
2. Run `npm run build`
3. Run `docker build --rm -t <username>/<name> .`
4. Run `docker push <username>/<name>`

Use above docker image to create a project in Openshift.

## Scenarios

### Gremlin

- Use this url as the host name `http://bayesian-gremlin-http-preview-b6ff-bayesian-preview.b6ff.rh-idev.openshiftapps.com/`
- Select `Gremlin` from the dropdown.
- Click button `Proceed`
- Click `Visualize`

### Kronos

- Use the below urls as the host name 
    - **Maven**: `http://kronos-maven-stack-analysis.dev.rdu2c.fabric8.io/api/v1/schemas/kronos_dependency_retrieval`
    - **PyPi**: `http://kronos-pypi-stack-analysis.dev.rdu2c.fabric8.io/api/v1/schemas/kronos_dependency_retrieval`
- Select `Kronos` from the dropdown.
- Click button `Visualize`