# Wanna Hang Out

We use Heroku to deploy our app, you can [try the app here](https://wannahangout.herokuapp.com) ([beta](https://wannahangout-beta.herokuapp.com))

## Installation
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

### Use node 14.17.3

``` bash
$ nvm install 14.17.3
$ nvm use 14.17.3
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

### Code styling

``` bash
# check code styling errors and warnings
$ yarn run lint

# fix potentially fixable errors automatically
$ yarn run lint --fix

```
