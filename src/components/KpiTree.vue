<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
        This is where the KPI tree should be displayed.
    </p>
  </div>
</template>

<script>
export default {
  name: 'KpiTree',
  props: {
    msg: String
  },
  data: function() {
      return {
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
</style>
