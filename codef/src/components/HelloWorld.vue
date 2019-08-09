<template>
  <div class="hello"> 
    <p>원하시는 대회, <code>https://codeforces.com/contest/1181</code>의 마지막 <code>number, ex)1181</code>를 입력해주시면 됩니다.</p>
    <p>최신 10페이지가 스크래핑 됩니다. </p>
    <div class="flex">
      <input v-model="num">
      <button @click="init">검색</button>
    </div>
    <div class="alert vs-loading default" v-if="alert">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
    <div v-if="ok" class="wrap">
      <input v-model="search" placeholder="finding problem">
      <table class="table">
        <thead>
          <tr>
            <th>code</th>
            <th>problem</th>
            <th>lang</th> 
            <th @click="sortTable('memory')" class="_sort">memory<span v-if="ascending_mem">▲</span><span v-if="!ascending_mem">▼</span> </th>
            <th @click="sortTable('time')" class="_sort">time<span v-if="ascending_time">▲</span><span v-if="!ascending_time">▼</span> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in filteredList" :key="idx">
            <td><a :href="item.solvedlink" target="_blank">#</a></td>
            <td><a :href="item.problemLink" target="_blank">{{item.problemName}}</a></td>
            <td>{{item.lang}}</td>
            <td>{{item.memory}}kb</td>
            <td>{{item.time}}ms</td>
          </tr>
        </tbody>
      </table>
    </div> 
    <h2 v-if="notok"> 코드포스 사이트에 문제가 생겼습니다.</h2>
  </div>
</template>

<script>
  import axios from 'axios'
  const url = `http://127.0.0.1:3000/contest/`
  export default {
    name: 'HelloWorld',
    data() {
      return {
        alert: false,
        num: 1182,
        list: [],
        ascending_mem: true,
        ascending_time: true,
        search: "", 
        ok : false, 
        notok : false
      }
    },
    mounted() {

    },
    computed: {
      filteredList() {
        return this.list.filter(item => item.problemName.toLowerCase().includes(this.search.toLowerCase()))
      }
    },
    methods: {
      init() {
        this.alert = true;
        this.ok = false; 
        this.notok = false;
        axios.get(`${url}${this.num}`).then(res => {
          this.alert = false;
          this.list = res.data;
          if(this.list.length){
            this.ok = true; 
          }else notok = true; 
        })
      },
      sortTable(col) {
        if (col === 'memory') {
          this.ascending_mem = !this.ascending_mem;
          this.list.sort((a, b) => this.ascending_mem ? (a[col] - b[col]) : (a[col] - b[col]) * -1)
        }
        else {
          this.ascending_time = !this.ascending_time;
          this.list.sort((a, b) => this.ascending_time ? (a[col] - b[col]) : (a[col] - b[col]) * -1)
        }
         
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
._sort:hover{
  cursor:pointer;
  color: rgba(79, 192, 141, 0.7);
}
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes rotateOpacity {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      opacity: .1;
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
      opacity: 1;
    }
  }

  .vs-loading {
    position: relative;
    margin: 0 auto;
    margin-top:2rem;
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px solid transparent;
  }

  .vs-loading.default .effect-1 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    transition: all .3s ease;
    animation: rotate 1s ease infinite;
  }

  .vs-loading.default .effect-2 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    animation: rotateOpacity 1s ease infinite .1s;
    transition: all .3s ease;
    outline: none;
  }

  .vs-loading.default .effect-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-left: 3px solid rgba(79, 192, 141, 0.7);
    -webkit-animation: rotateOpacity 1s ease infinite .2s;
    animation: rotateOpacity 1s ease infinite .2s;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    transition: all .3s ease;
    outline: none;
  }

  .wrap {
    margin-top: 2rem;
  }

  .flex {
    display: flex;
    width: 400px;
    margin: 0 auto;
    align-items: stretch;
    justify-content: center;

  }

  input {
    font-size: 1.3rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    padding: .3rem;
  }

  button {
    padding: .5rem 2rem;
    font-size: 0.85rem;
    background: transparent;
    border: 1px solid #aaa;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    transition: all 0.5s;
  }

  button:hover {
    background-color: rgba(79, 192, 141, 0.7);
    cursor: pointer;

  }

  code {
    color: #d63200;
    padding: 3px 5px;
    margin: 0 2px;
    border-radius: 2px;
    white-space: nowrap;
    font-family: "Roboto Mono", Monaco, courier, monospace;
    font-size: 0.85rem;
    background-color: #f8f8f8;
    -webkit-font-smoothing: initial;
  }

  table {
    margin: 0 auto;
    border-collapse: collapse;
    margin-top: 10px;
    width: 100%;
  }

  table th,
  table td {
    padding: .75rem;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgba(79, 192, 141, .05);
  }

  h1,
  h2 {
    font-weight: normal;
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
