<template>
  <!--   <k-inside> -->
  <section class="k-arborescence-section">
    <header class="k-section-header" v-if="this.label">
      <h2 class="k-headline">{{ this.label }}</h2>
    </header>
    <!-- Show parent page entry (code adapted from Navigation/Tree.vue) -->
    <ul v-if="treeItems" :class="['k-tree', $options.name, $attrs.class]" :style="{ '--tree-level': 0, ...$attrs.style }">
      <li
        key="parent-page"
        :aria-expanded="true"
        :aria-current="false"
      >
        <p v-if="showParent" class="k-tree-branch">
          <!-- Arrow button (unfold) -->
          <button
            :disabled="false"
            class="k-tree-toggle"
            type="button"
          >
            <k-icon type="angle-down" />
          </button>
          <!-- Clickable item / label -->
          <button
            :disabled="!(this.parent == uid)"
            class="k-tree-folder"
            type="button"
          >
            <k-icon-frame :icon="this.parentIcon" />
            <span class="k-tree-folder-label">{{ this.parentTitle }}</span>
          </button>
          
        </p>
        <page-tree-menu v-if="this.root" :parent="this.root" @select="onSelect" :level="this.showParent?1:0" :items="this.treeItems"></page-tree-menu>
      </li>
    </ul>

    <!-- Previously used code  -->
    <!-- <div class="k-arborescence-tree">
      <h3 v-if="activePage">{{activePage.title}}</h3>
      <arborescence-pages :pages="pages" />
    </div> -->
    <!-- <k-page-tree :parent="root" @select="onSelect"></k-page-tree> -->
    <!-- <page-tree-menu :parent="this.parent" @select="onSelect" level="1"></page-tree-menu> -->
  </section>
  <!--   </k-inside> -->
</template>

<script>
// import ArborescencePages from "./ArborescencePages.vue";

export default {
  // Put your section logic here
  data() {
    return {
      headline: null,
      root: '',
      isSite: false,
      parentIcon: {
        type: String,
        default: null
      },
      showParent: {
        type: Boolean,
        default: true
      },
      parentTitle: null,
      treeItems: null,
    };
  },

  // mounted: async function() {
  //   window.console.log("Mounted!");
	// 	return null;
  // },

  created: async function() {
    //window.console.log("Created!", this.parent);
    const response = await this.load();
    //window.console.log("Response=", response);
    this.headline = response.headline;
    // this.root = this.parent; // Js way
    this.root = response.rootPage ?? this.parent; // Php way
    this.parentIcon = response.parentIcon ?? 'folder';
    this.showParent = response.showParent?? true;
    this.label = response.label;// ?? this.$attrs.label; // Label from php-translated blueprint
    // this.label = this.$attrs.label; // Grab label from user blueprint
    this.parentTitle = response.parentTitle;// ?? this.$attrs.content.title;
    //this.parentTitle = this.$attrs.content.title;
    this.isSite = response.isSite;
    this.treeItems = response.pages;
  },

  methods: {
    onSelect(name){
      let uid = null;
      // window.console.log("OnSelect()=", name);
      
      // When children are not loaded, we can grab the loading URL
      if(typeof name.children == String)
        // children holds the query url to fetch the children (= the parent url).
        uid = name.children;
        //window.panel.open(name.children); 
      else {
        // Hacky: here we adapt the id (ex: `art/myartwork`) by replacing / by +, as in the panel, but this might need more transformations ?!?!
        // Todo: find another way ?
        //window.panel.open('pages/'+name.id.replace('/', '+'));
        uid = 'pages/'+name.id.replaceAll('/', '+');
      }

      // Clicked on self? Ignore !
      if(this.parent == uid){
        return;
      }
      // Go to selected page
      window.panel.open(uid);
    }
  },

};
</script>

<style>
/** Put your CSS here **/
/* .k-arborescence-section {
  background-color: red;
} */
</style>
