<template>
    <div id="eosdapp">
      <div>
        <el-row>
          <el-button @click.prevent="login" type="primary" round>login</el-button>
          <el-button @click.prevent="logout" type="danger" round>logout</el-button>
          <el-button @click.prevent="buy" type="primary" round>buy</el-button>
          <el-button @click.prevent="sell" type="danger" round>sell</el-button>
          <el-button @click.prevent="burn" type="danger" round>burn</el-button>
          <el-button @click.prevent="deposit" type="danger" round>deposit</el-button>
          <el-button @click.prevent="stake" type="danger" round>stake</el-button>
          <el-button @click.prevent="unstake" type="danger" round>unstake</el-button>
          <el-button @click.prevent="collect_fee" type="danger" round>collect fee</el-button>
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
      buy() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "100.0000 " + config.mainToken;
				var memo = "";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.tokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			sell() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "200.0000 " + config.gameToken; 
				var memo = "";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.gameTokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			// 销毁操作
			burn() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "1000.0000 " + config.gameToken; 
				var memo = "burn";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.gameTokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			deposit() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "100.0000 " + config.mainToken;
				var memo = "deposit";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.tokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			stake() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "200.0000 " + config.gameToken; 
				var memo = "stake";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.gameTokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			unstake() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "0.0002 " + config.mainToken;
				var memo = "";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.tokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			collect_fee() {
				const requiredFields = {
					accounts: [config.eosNetwork]
				}
				// hard code
				var from = this.account.name;
				var to = config.gameContract;
				var amount = "0.0001 " + config.mainToken;
				var memo = "";
				var arg = [from, to, amount, memo]
				this.scatterEosClient.contract(config.tokenContract, { requiredFields }).then(contract => {
					contract.transfer(...arg).then(tx => {
						console.log(tx)
					}).catch(e => {
						console.log(e)
					})
				}).catch(e => {
					console.log(e)
				});
			},
			get_global() {
				this.eosClient.getTableRows({
					json: "true",
					code: config.gameContract,
					scope: config.gameContract,
					table: 'game',
					limit: 1,
					lower_bound: 0
				}).then((data) => {
					console.log(data);
					if (data.rows && data.rows.length > 0) {
						this.global = data.rows[0];
					}
				}).catch((e) => {
					console.error(e);
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
