import Arborescence from "./components/Arborescence.vue";

panel.plugin("daandelange/arborescence", {
  components: {
    // ArborescencePages
    'page-tree-menu': {
      name: "page-tree-menu",
	    inheritAttrs: true,
      extends: 'k-page-tree',
      props: {
        loadError: {
          type: Boolean,
          default: false,
        },
      },
      methods: {
        // We simply replace this method to load the page instead of site root.
        // async load(path) {
        load: async function(path) {
          // Observed by retro-engineering: null is the initial load request -> we simply replace it.
          if(path == null){
            path = this.$attrs.parent ?? window.panel.view.path;
          }

          // Original function
          try{
            return await this.originalLoad(path);
          }
          // Intercept errors
          catch(error){
            this.loadError = true;
            window.panel.error('Error loading the menu pages! Make sure that your rootPage is correct in your blueprint !', false);
            return []; // note: eturning null produces error
          }
          finally {
            // loading...
          }

          // done
        },
        originalLoad: async function(path){
          // Original k5 fn below
          return await this.$panel.get("site/tree", {
            query: {
              move: null,
              parent: path
            }
          });
        }
      },
    },
  },
  sections: {
    arborescence: Arborescence
  }
});
