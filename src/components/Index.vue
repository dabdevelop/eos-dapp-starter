<template>
    <div id="eosdapp">
      <div>
        <el-row>
          <el-button @click.prevent="login" type="primary" round>login</el-button>
          <el-button @click.prevent="logout" type="danger" round>logout</el-button>
          <el-button @click.prevent="get_height" type="success" round>{{ block_height }}</el-button>
          
        </el-row>
      </div>
  </div>
</template>

<script>

import EOS from 'eosjs';
import config from '../config/config.js'

export default {
  name: 'eosdapp',
  data() {
			return {
        account: "",
        block_height: 'block height', 
				config: config,
				// 用来获取区块链只读数据，不需要通过scatter
				eosClient: null,
				// 用来创建签名。转账、买、卖、销毁都需要用这个
				scatterEosClient: null				
			}
		},
  created(){
      this.eosClient = EOS(config.eosOptions);
      document.addEventListener('scatterLoaded', scatterExtension => {
        this.scatter = window.scatter;
        // window.scatter = null;
        this.scatter.requireVersion(3.0);
        this.scatterEosClient = this.scatter.eos(config.eosNetwork, EOS, config.eosOptions, "http");
      })
      // this.eosClient.getBlock();
},
methods: {
			login() {
				this.scatter.getIdentity({
					accounts: [config.eosNetwork]
				}).then(identity => {
					//...
					console.log(identity);
					if (identity && identity.accounts.length > 0) {
						this.account = identity.accounts.find(account => account.blockchain === 'eos');
						console.log("current login user is ", this.account.name);
					}
				}).catch(error => {
					//...
				});
      },
      logout() {
				scatter.forgetIdentity().then(() => {
					//...
					console.log("forget");
				});
      },
			get_height() {
				this.eosClient.getInfo((error, result) => {
          if(!error){
            this.block_height = result.head_block_num;
          }
        })
			},
},
  props: {
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
