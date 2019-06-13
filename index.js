'use strict';

import Ad from './src/Ad'
export default {

    // Default sizes
    defaultSizes : {
        banner: [[1200, 600], [1200, 400], [300, 250], [300, 300]],
        rectangle: [ [300, 250], [300, 300], [300, 600]]
    },

    install(Vue, options){
        Vue.component('google-ad', Ad);
        this.init(options, Vue);
    },

    init(options, Vue){

        // Following Admanagers tag generation - June 6, 2019

        // Create Google tag
        window.googletag = {};
        googletag.cmd = googletag.cmd || [];

        // Create script reference to google ad manager
        let googleScript = document.createElement('script');
        googleScript.async = true;
        googleScript.type = 'text/javascript';
        googleScript.src = 'https://www.googletagservices.com/tag/js/gpt.js'

        // Reference head of document
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(googleScript)

        // Define google tag slots
        googletag.cmd.push(() => {

            // Loop through and define slots
            this.defineOptions(options, Vue);

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });

    },

    defineOptions(options, Vue){

        // If user doesn't pass in ad default size, define default
        if(!options.default_size){
            options.default_size = "rectangle";
        }

        // If user doesn't pass in sizes object, set to default defined above
        if(!options.sizes){
            options.sizes = this.defaultSizes
        }

        // Required. User must pass in mappings object
        options.mappings = this.createMappings(options.mappings);
        
        // Set googlead options to use in Ad
        Vue.prototype.$googlead = options;

    },

    createMappings(mappings){
        Object.keys(mappings).forEach((key) => {
            mappings[key] = this.setSize(mappings[key])
        });

        return mappings;
    },

    setSize(mapping){

        let mapper = googletag.sizeMapping();

        mapping.forEach((map) => {
            mapper.addSize(map.window, map.sizes)
        });

        return mapper.build();
    },
}