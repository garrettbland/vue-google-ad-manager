<template>
    <div :id="id"></div>
</template>
<script>
    export default {
        name: 'Ad',
        props: {
            id: {
                default: () => {
                    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
                }
            },
            unit: {
                required: true
            },
            size: {},
            slotType: {
                default: 'normal'
            }
        },

        computed: {
            adUnit(){
                return `/${this.$googlead.id}/${this.unit}`
            },
            adSize(){
                if(!this.size) {
                    return this.$googlead.default_size;
                }
                return this.size
            },
            sizes(){
                try {
                    return this.$googlead.sizes[this.adSize];
                } catch(e){
                    console.error(e);
                    return [1200, 400]
                }
            },
            mapping(){
                try {
                    return this.$googlead.mappings[this.adSize]
                } catch(e) {
                    console.error(`Mappings for ${this.adSize} ad size is not defined`)
                }
            }
        },

        methods: {
            display() {
                googletag.cmd.push(() => {
                    this.define();
                    googletag.display(this.id)
                });
            },
            define(){
                if(this.slotType === 'out-of-page') {
                    return this.defineOutOfPageSlot();
                }

                return this.defineSlot();
            },
            defineSlot(){
                googletag.defineSlot(this.adUnit, this.sizes, this.id).defineSizeMapping(this.mapping).addService(googletag.pubads());
            },
            defineOutOfPageSlot(){
                googletag.defineOutOfPageSlot(this.adUnit, this.id).addService(googletag.pubads())
            }
        },

        mounted(){
            this.display();
        },
        beforeDestroy () {
            googletag.cmd.push(() => {
                googletag.destroySlots()
            })
        }
    }
</script>