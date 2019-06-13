# Google Ad Manager for Vue
Vue.js plugin to easy implement google ad units to your SPA

## Installation

**Install**

```
npm install vue-google-ad-manager
```
*or*
```
yarn add vue-google-ad-manager
```

**Import and use the plugin in your main.js or entry file** 
You must pass in your network code and mappings. Sizes object is optional

```javascript
import AdManager from 'vue-google-ad-manager';

Vue.use(AdManager, {
    id: 'ad-manager-network-code',
	mappings,
	sizes
});
```

**Params**

| Title  | Description  | Type  | Required  |
| ------------ | ------------ | ------------ | ------------ |
| mappings  | Mapping sizes object  | object  | true  |
| sizes  | Google ad unit sizes  | object  | false  |


## Use
Now you can use the google ad component throughout your application. There are a few params you can pass through for customization

```html
<google-ad unit="AdUnitName"></google-ad>
```

**Params**


| Title  | Description  | Type  | Required  |
| ------------ | ------------ | ------------ | ------------ |
| unit  |  Ad unit name from ad manager  | string  | true  |
| id  | Div id tag - used to identify ads  | string  | false  |


## Contributing

Pull requests welcomed!