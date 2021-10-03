[![Netlify Status](https://api.netlify.com/api/v1/badges/871e29b9-fa9b-414b-9294-1e3e2d084245/deploy-status)](https://app.netlify.com/sites/wannahangout/deploys)

We use Netlify to deploy our app, you can [try the app here](https://wannahangout.netlify.app/)

# Installation
  #### MacOS
First install nvm ([MacOS](https://github.com/nvm-sh/nvm#installing-and-updating))

  #### Linux (debian)
Download & Install nvm
``` bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

Configuration nvm
``` bash
$ export NVM_DIR="$HOME/.nvm" 
$ [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
$ [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

### Use node 14.16.0

``` bash
$ nvm install 14.16.0
$ nvm use 14.16.0
```

### Use yarn

``` bash
$ npm i -g yarn
```

### Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3001
$ yarn run dev

# build electron application for production
$ yarn run build

```
