!function(){"use strict";function e(e,t,n,a,r,s,i,o){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),a&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),i?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=l):r&&(l=o?function(){r.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var p=c.render;c.render=function(e,t){return l.call(t),p(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:e,options:c}}const t={};var n=e({data:()=>({headline:null,root:"",isSite:!1,parentIcon:{type:String,default:null},showParent:{type:Boolean,default:!0},parentTitle:null,treeItems:null}),created:async function(){var e,t,n;const a=await this.load();this.headline=a.headline,this.root=null!=(e=a.rootPage)?e:this.parent,this.parentIcon=null!=(t=a.parentIcon)?t:"folder",this.showParent=null==(n=a.showParent)||n,this.label=a.label,this.parentTitle=a.parentTitle,this.isSite=a.isSite,this.treeItems=a.pages},methods:{onSelect(e){let t=null;t=typeof e.children==String?e.children:"pages/"+e.id.replaceAll("/","+"),this.parent!=t&&window.panel.open(t)}}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"k-arborescence-section"},[this.label?n("header",{staticClass:"k-section-header"},[n("h2",{staticClass:"k-headline"},[e._v(e._s(this.label))])]):e._e(),e.treeItems?n("ul",{class:["k-tree",e.$options.name,e.$attrs.class],style:Object.assign({},{"--tree-level":0},e.$attrs.style)},[n("li",{key:"parent-page",attrs:{"aria-expanded":!0,"aria-current":!1}},[e.showParent?n("p",{staticClass:"k-tree-branch"},[n("button",{staticClass:"k-tree-toggle",attrs:{disabled:!1,type:"button"}},[n("k-icon",{attrs:{type:"angle-down"}})],1),n("button",{staticClass:"k-tree-folder",attrs:{disabled:!(this.parent==e.uid),type:"button"}},[n("k-icon-frame",{attrs:{icon:this.parentIcon}}),n("span",{staticClass:"k-tree-folder-label"},[e._v(e._s(this.parentTitle))])],1)]):e._e(),this.root?n("page-tree-menu",{attrs:{parent:this.root,level:this.showParent?1:0,items:this.treeItems},on:{select:e.onSelect}}):e._e()],1)]):e._e()])}),[],!1,a,null,null,null);function a(e){for(let n in t)this[n]=t[n]}var r=function(){return n.exports}();panel.plugin("daandelange/arborescence",{components:{"page-tree-menu":{name:"page-tree-menu",inheritAttrs:!0,extends:"k-page-tree",props:{loadError:{type:Boolean,default:!1}},methods:{load:async function(e){var t;null==e&&(e=null!=(t=this.$attrs.parent)?t:window.panel.view.path);try{return await this.originalLoad(e)}catch(n){return this.loadError=!0,window.panel.error("Error loading the menu pages! Make sure that your rootPage is correct in your blueprint !",!1),[]}},originalLoad:async function(e){return await this.$panel.get("site/tree",{query:{move:null,parent:e}})}}}},sections:{arborescence:r}})}();
