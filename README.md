Website
=======
###Install dependencies
```bash
npm install
```

### local development
```bash
grunt serve
```

### Deploy to parse
```bash
# production build
grunt compress

# copy files to parse folder
cp -R www/* parse/public/
# deploy on parse
cd parse
parse deploy
```
