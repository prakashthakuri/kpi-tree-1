<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="tree-container" ref="container">
        <vue-tree 
            ref="tree"
            :style="{width: treeW + 'px', height: treeH + 'px'}"
            :dataset="tree" 
            :config="treeConfig"
            linkStyle="straight">
            <template v-slot:node="{ node, collapsed, index }">
                <div class="node-item">
                    <div style="width:100%">
                        <div class="node-title">{{node.name}}</div>                        
                        <div v-show="node.children || collapsed" class="node-toggle" @click="onClickNode(index)">
                          <v-icon v-if="collapsed" name="chevron-up"></v-icon>                          
                          <v-icon v-if="!collapsed" name="chevron-down"></v-icon>
                        </div>
                    </div>
                    <div class="node-details">
                        <div class="node-value node-details-item" :class="node.value.color">
                            {{node.value.amount}}
                        </div>
                        <div class="node-delta node-details-item">
                            <v-icon :class="node.delta.color" :name="deltaIcon(node.delta.color)" ></v-icon>
                            {{node.delta.amount}}
                        </div>                        
                    </div>
                </div>
            </template>
        </vue-tree>

        <div class="tree-toolbar">
            <div class="btn-toolbar" @click="zoomIn"><v-icon name="plus"></v-icon></div>
            <div class="btn-toolbar" @click="zoomReset"><v-icon name="retweet"></v-icon></div>
            <div class="btn-toolbar" @click="zoomOut"><v-icon name="minus"></v-icon></div>
        </div>
    </div>
  </div>
</template>

<script>
import VueTree from './VueTree'

export default {
  name: 'KpiTree',
  props: {
    msg: String
  },
  components: {
    VueTree
  },
  
  data: function() {
    return {
        treeW: 1200,
        treeH: 800,
        treeConfig: { 
            nodeWidth: 240,
            nodeHeight: 100, 
            levelHeight: 100 
        },
        tree: {
          name: "EDITDA", 
          value: {amount: "123", color: "green"}, 
          delta: {amount:"12%", color: "green"}, 
          children: [
            {
              name: "Customer Profitability",
              value: {amount: "123", color: "green"}, 
              delta: {amount: "12%", color: "red"}, 
              children: [
                {
                  name: "MRR", 
                  value: {amount: "123", color: "orange"}, 
                  delta: {amount: "12%", color: "green"}, 
                  children: [
                    {
                      name: "ACV",
                      value: {amount: "123", color: "orange"}, 
                      delta: {amount: "12%", color: "red"}, 
                    }
                  ]
                },
                {
                  name: "Total CAC",
                  value: {amount: "123", color: "green"}, 
                  delta: {amount: "12%", color: "green"}, 
                  children: [
                    {
                      name: "Customer Success",
                      value: {amount: "123", color: "red"}, 
                      delta: {amount: "12%", color: "green"},
                    },
                    {
                      name: "Sales & Marketing",
                      value: {amount: "123", color: "green"}, 
                      delta: {amount: "12%", color: "green"},
                    }
                  ],
                }
              ]
            },{ 
              name: "EDITDA", 
              value: {amount: "123", color: "green"}, 
              delta: {amount:"12%", color: "green"}, 
            },
            {
              name: "NON-CAC related",
              value: {amount: "123", color: "green"}, 
              delta: {amount:"12%", color: "orange"},
              children: [
                {
                  name: "R&D (excl. Support)",
                  value: {amount: "123", color: "green"}, 
                  delta: {amount: "12%", color: "green"},                      
                },
                {
                  name: "G&A",
                  value: {amount: "123", color: "green"}, 
                  delta: {amount: "12%", color: "green"},  
                }
              ]                 
            }
          ]
        }
    }
  },
  mounted() {
    this.resizeHandler()
  },
  created() {
        window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler () {
      this.treeW = this.$refs.container.clientWidth
      this.treeH = this.$refs.container.clientHeight

      this.$refs.tree.setTransform(this.treeW, this.treeH)
    },
    onClickNode (index) {
      this.$refs.tree.onClickNode(index)
    },
    deltaIcon (icon) {
      if( icon === "red" ) {
        return "caret-down"
      } else if( icon === "green" ) {
        return "caret-up"
      } else if( icon === "orange" ) {
        return "caret-right"
      }

      return ""
    },
    zoomIn () {
      this.$refs.tree.zoomIn()
    },
    zoomOut () {
      this.$refs.tree.zoomOut()
    },
    zoomReset () {
      this.$refs.tree.restoreScale()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.tree-container {
  width: 100%;
  height: 100vh;
  position: relative;   
  background: #222; 
}

.tree-toolbar {
  display: flex;
  position: fixed;
  right: 40px;
  top: 300px;
  z-index: 1000;
}

.btn-toolbar {
  padding: 12px;
  color: #F0AB00;
  text-align: center;
  cursor: pointer;
  background-color: #333;
  border-radius: 8px;
  margin-right: 12px;
}

.node-item {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
    background-color: #333;    
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
}
.node-title {
    flex-grow: 1;
    padding: 8px;
    border-bottom: solid 1px #4c4c4c;
}
.node-details {
    display: flex;    
    width: 100%;    
}

.node-value {
    border-right: solid 1px #4c4c4c;
}

.node-details-item {
    width: 100%;
    padding: 8px;
}
.node-toggle {
  position: absolute;
  color: #F0AB00;
  right: 24px;
  top: 24px;
  cursor: pointer;
}
.red {
  color: #EE4060;
}
.green {
  color: #06A877;
}
.orange {  
  color: #F0AB00;
}

</style>
