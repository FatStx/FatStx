export class XactnType {
    static xactnTypes = [
      //Arkadiko
      {id:1,XactnType:'', XactnTypeDetail:'Arkadiko Close Vault',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1',function:'close-vault',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2,XactnType:'', XactnTypeDetail:'Arkadiko Burn USDA',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1',function:'burn',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:3,XactnType:'', XactnTypeDetail:'Arkadiko Mint USDA',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1',function:'mint',senderAddress:'',recipientAddress:'',inSymbol:'USDA',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:4,XactnType:'', XactnTypeDetail:'Arkadiko Vault Deposit',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1',function:'deposit',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:5,XactnType:'', XactnTypeDetail:'Arkadiko Deposit and Mint',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-freddie-v1-1',function:'collateralize-and-mint',senderAddress:'',recipientAddress:'',inSymbol:'USDA',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:6,XactnType:'', XactnTypeDetail:'Arkadiko Claim STX',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-claim-yield-v2-1',function:'claim',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:7,XactnType:'', XactnTypeDetail:'Arkadiko Stake DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'DIKO',notOutSymbol:''},
      {id:8,XactnType:'', XactnTypeDetail:'Arkadiko Stake LP',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:'DIKO'},
      {id:9,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:10,XactnType:'', XactnTypeDetail:'Arkadiko Unstake',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'DIKO',outSymbol:'',notOutSymbol:''},
      {id:10,XactnType:'', XactnTypeDetail:'Arkadiko Unstake',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'stDIKO',notOutSymbol:''},
      {id:11,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:'stDIKO'},
      {id:12,XactnType:'', XactnTypeDetail:'Arkadiko Add Liquidity',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v2-1',function:'add-to-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:13,XactnType:'', XactnTypeDetail:'Arkadiko Add Liquidity',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v1-1',function:'add-to-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:14,XactnType:'', XactnTypeDetail:'Arkadiko Reduce Liquidity',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v2-1',function:'reduce-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:15,XactnType:'', XactnTypeDetail:'Arkadiko Swap',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v2-1',function:'swap-y-for-x',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:16,XactnType:'', XactnTypeDetail:'Arkadiko Swap',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-v2-1',function:'swap-x-for-y',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:17,XactnType:'', XactnTypeDetail:'Arkadiko Stake DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'stake-pending-rewards',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'DIKO',outSymbol:'',notOutSymbol:''},
      {id:18,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'stake-pending-rewards',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:19,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-registry-v1-1',function:'claim-pending-rewards',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:20,XactnType:'', XactnTypeDetail:'Arkadiko Return Voted DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-governance-v2-1',function:'return-votes-to-member',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:21,XactnType:'', XactnTypeDetail:'Arkadiko Vote DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-governance-v2-1',function:'vote-for',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'DIKO',notOutSymbol:''},
      {id:22,XactnType:'', XactnTypeDetail:'Arkadiko Vault Enable W/D',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stacker-v1-1',function:'enable-vault-withdrawals',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:23,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-vault-rewards-v1-1',function:'claim-pending-rewards',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:24,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-lp-rewards-2',function:'claim-rewards',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:24,XactnType:'', XactnTypeDetail:'Arkadiko Stake DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-lp-rewards-2',function:'stake-rewards',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'DIKO',notOutSymbol:''},
      {id:25,XactnType:'', XactnTypeDetail:'Arkadiko Stake DIKO',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-lp-rewards',function:'stake-rewards',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'DIKO',notOutSymbol:''},
      {id:25,XactnType:'', XactnTypeDetail:'Arkadiko DIKO Rewards',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-stake-lp-rewards',function:'stake-rewards',senderAddress:'',recipientAddress:'',inSymbol:'DIKO',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //Alex
      {id:50,XactnType:'', XactnTypeDetail:'ALEX Mint idoALEX',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.lottery-ido-alex',function:'mint-many',senderAddress:'',recipientAddress:'',inSymbol:'idoALEX',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:51,XactnType:'', XactnTypeDetail:'ALEX Add Liquidity',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fixed-weight-pool-v1-01',function:'add-to-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:52,XactnType:'', XactnTypeDetail:'ALEX Swap',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fixed-weight-pool-v1-01',function:'swap-helper',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:53,XactnType:'', XactnTypeDetail:'ALEX Claim Staking Reward',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.staking-helper',function:'claim-staking-reward',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:54,XactnType:'', XactnTypeDetail:'ALEX Stake',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.alex-reserve-pool',function:'stake-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:55,XactnType:'', XactnTypeDetail:'ALEX Launchpad Claim',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.alex-launchpad',function:'claim',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:56,XactnType:'', XactnTypeDetail:'ALEX Mint APower',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-apower',function:'mint-fixed-many',senderAddress:'',recipientAddress:'',inSymbol:'APOWER',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:57,XactnType:'', XactnTypeDetail:'ALEX Launchpad Register',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.alex-launchpad',function:'register',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:58,XactnType:'', XactnTypeDetail:'ALEX Add Liquidity',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fixed-weight-pool',function:'add-to-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:59,XactnType:'', XactnTypeDetail:'ALEX Reduce Liquidity',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fixed-weight-pool',function:'reduce-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:60,XactnType:'', XactnTypeDetail:'ALEX Swap',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.swap-helper-v1-03',function:'swap-helper',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},

      //Stackswap
      {id:100,XactnType:'', XactnTypeDetail:'Stackswap Swap',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stackswap-swap-v5k',function:'swap-y-for-x',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:101,XactnType:'', XactnTypeDetail:'Stackswap Swap',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stackswap-swap-v5k',function:'swap-x-for-y',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:102,XactnType:'', XactnTypeDetail:'Stackswap Add Liquidity',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stackswap-swap-v5k',function:'add-to-position',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:103,XactnType:'', XactnTypeDetail:'Stackswap Stake',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stackswap-farming-v1l',function:'stake-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},

      //Syvita
      {id:150,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SP18XC4F27VQ8P2QGKZ5P6KR41GK77ZVFWV468P1',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:151,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SP2ST741GVK200RYK9NKTYP6CJH1AG4ZPV4A5WG4M',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:152,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SP1C6WQ9KTV3769S8X8YNAWBXKDG2Y65P5EEDRWR6',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:153,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SP2BE8YZF117DZX8FTZQ0072GQ8VET2PPPQC58YFJ',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:154,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SPYABDY1GR8RPQVNK1VFD1CQP6MZT2GF4Q9QB19F',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:155,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'',recipientAddress:'SP78Q12M26WVN1V9DPQ29HVDTWPKQH6KVR1X0VEW',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:156,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - MIA',contract:'SP343J7DNE122AVCSC4HEK4MF871PW470ZSXJ5K66.miamipool-v1',function:'add-funds',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:157,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - MIA',contract:'SP196Q1HN49MJTJFRW08RCRP7YSXY28VE72GQWS0P.syvita-mining-mia-v1',function:'contribute',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:158,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - MIA',contract:'SP343J7DNE122AVCSC4HEK4MF871PW470ZSXJ5K66.miamipool-v1',function:'payout-mia',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:159,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - MIA',contract:'SP196Q1HN49MJTJFRW08RCRP7YSXY28VE72GQWS0P.syvita-mining-mia-v1',function:'contributor-claim-all-rewards-for-pool',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:155,XactnType:'Dispose', XactnTypeDetail:'Syvita Pool - MIA',contract:'',function:'',senderAddress:'',recipientAddress:'SPRK96DVHVA9KZ9EQ8PQQ110GW8HH4TQ5DGMRMVD',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:161,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - MIA',contract:'',function:'',senderAddress:'SPRK96DVHVA9KZ9EQ8PQQ110GW8HH4TQ5DGMRMVD',recipientAddress:'',inSymbol:'MIA',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:162,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SP18XC4F27VQ8P2QGKZ5P6KR41GK77ZVFWV468P1',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:38,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SP2ST741GVK200RYK9NKTYP6CJH1AG4ZPV4A5WG4M',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:39,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SP1C6WQ9KTV3769S8X8YNAWBXKDG2Y65P5EEDRWR6',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:40,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SP2BE8YZF117DZX8FTZQ0072GQ8VET2PPPQC58YFJ',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:41,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SPYABDY1GR8RPQVNK1VFD1CQP6MZT2GF4Q9QB19F',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:41,XactnType:'Mined', XactnTypeDetail:'Syvita Pool - NYC',contract:'',function:'',senderAddress:'SP78Q12M26WVN1V9DPQ29HVDTWPKQH6KVR1X0VEW',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //KCV
      {id:200,XactnType:'Dispose', XactnTypeDetail:'KCV Pool - NYC',contract:'SP1W7X92JG1BYPKG15KTS6398XN4D4HJP9TTXMQ38.kcv-pool',function:'join-pool',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:201,XactnType:'Mined', XactnTypeDetail:'KCV Pool - NYC',contract:'',function:'',senderAddress:'SP2W1JBT5C10JWH2H7G0GASBFG4YXW8QGN1HQJM9F',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:202,XactnType:'Mined', XactnTypeDetail:'KCV Pool - NYC',contract:'',function:'',senderAddress:'SPQ12PNJA1842CBG68H1JEHWW4MVJ2NX3ZESMYRT',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:203,XactnType:'Mined', XactnTypeDetail:'KCV Pool - NYC',contract:'',function:'',senderAddress:'SP1D8PR8F7BDFT1Q9DJFN3DJEGTXD6EFSFPEPQMBV',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},

      //CityCoins
      {id:250,XactnType:'Dispose', XactnTypeDetail:'NYC Mining Commitment',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'mine-many',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:251,XactnType:'Dispose', XactnTypeDetail:'NYC Mining Commitment',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'mine-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:252,XactnType:'Dispose', XactnTypeDetail:'MIA Mining Commitment',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'mine-many',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:253,XactnType:'Dispose', XactnTypeDetail:'MIA Mining Commitment',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'mine-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'STX',notOutSymbol:''},
      {id:254,XactnType:'Mined', XactnTypeDetail:'NYC Mining Reward',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'claim-mining-reward',senderAddress:'',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:255,XactnType:'Mined', XactnTypeDetail:'MIA Mining Reward',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'claim-mining-reward',senderAddress:'',recipientAddress:'',inSymbol:'MIA',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:256,XactnType:'Reward', XactnTypeDetail:'NYC Stacking Reward',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'claim-stacking-reward',senderAddress:'',recipientAddress:'',inSymbol:'STX',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:257,XactnType:'', XactnTypeDetail:'NYC Return of Stacked Coin',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'claim-stacking-reward',senderAddress:'',recipientAddress:'',inSymbol:'NYC',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:258,XactnType:'Reward', XactnTypeDetail:'MIA Stacking Reward',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'claim-stacking-reward',senderAddress:'',recipientAddress:'',inSymbol:'STX',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:259,XactnType:'', XactnTypeDetail:'MIA Return of Stacked Coin',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'claim-stacking-reward',senderAddress:'',recipientAddress:'',inSymbol:'MIA',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:260,XactnType:'', XactnTypeDetail:'NYC Stack Coins',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1',function:'stack-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:261,XactnType:'', XactnTypeDetail:'MIA Stack Coins',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1',function:'stack-tokens',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //OkCoin
      {id:300,XactnType:'', XactnTypeDetail:'OkCoin Xfer',contract:'',function:'',senderAddress:'SP17H4TSCP2JYBF45HEZGGF3N66VRPXQZW4EBVAAV',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:301,XactnType:'', XactnTypeDetail:'OkCoin Xfer',contract:'',function:'',senderAddress:'SP2XFNHB366DQWK7TSPYRPCA5XFA3964W8W6RS5P0',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:302,XactnType:'', XactnTypeDetail:'OkCoin Xfer',contract:'',function:'',senderAddress:'SP3DW8X8CBPSYWT327120KE5N8DEJTTBMYJ2QH68Y',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:303,XactnType:'', XactnTypeDetail:'OkCoin Xfer',contract:'',function:'',senderAddress:'SP3HXJJMJQ06GNAZ8XWDN1QM48JEDC6PP6W3YZPZJ',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:304,XactnType:'', XactnTypeDetail:'OkCoin Xfer',contract:'',function:'',senderAddress:'',recipientAddress:'SP3HXJJMJQ06GNAZ8XWDN1QM48JEDC6PP6W3YZPZJ',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //CoinEx
      {id:350,XactnType:'', XactnTypeDetail:'CoinEx Xfer',contract:'',function:'',senderAddress:'SP36AQJD5A92TM5WS0ZEC4GSZPY5B2CPQD6TX35PP',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:351,XactnType:'', XactnTypeDetail:'CoinEx Xfer',contract:'',function:'',senderAddress:'',recipientAddress:'SP36AQJD5A92TM5WS0ZEC4GSZPY5B2CPQD6TX35PP',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //Coinbase
      {id:351,XactnType:'', XactnTypeDetail:'Coinbase Xfer',contract:'',function:'',senderAddress:'SP1FNEJ21BMJCJYEJM2F73QT6WD2MN9MB2J92FZBN',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:352,XactnType:'', XactnTypeDetail:'Coinbase Xfer',contract:'',function:'',senderAddress:'SPC3T2E3MXHA15Q1TRQJDH57QX6X1D5D7Y9XTXXJ',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:353,XactnType:'', XactnTypeDetail:'Coinbase Xfer',contract:'',function:'',senderAddress:'SP1PJWKS5V3X7JR300J3W291DDNCKD6M6XKJFYPAC',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //Binance
      //NOTE: I *think* this wallet is Binance based on some comments in Arkadiko discord
      {id:400,XactnType:'', XactnTypeDetail:'Binance Xfer',contract:'',function:'',senderAddress:'SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //OKex
      {id:500,XactnType:'', XactnTypeDetail:'OKex Xfer',contract:'',function:'',senderAddress:'SP3RFAZMSH6YA1KTJD7DN997AG2DG54E3Z9ZJWYN8',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:501,XactnType:'', XactnTypeDetail:'OKex Xfer',contract:'',function:'',senderAddress:'',recipientAddress:'SP3RFAZMSH6YA1KTJD7DN997AG2DG54E3Z9ZJWYN8',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //Kucoin
      {id:600,XactnType:'', XactnTypeDetail:'Kucoin Xfer',contract:'',function:'',senderAddress:'SPX8T06E8FJQ33CX8YVR9CC6D9DSTF6JE0Y8R7DS',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:601,XactnType:'', XactnTypeDetail:'Kucoin Xfer',contract:'',function:'',senderAddress:'',recipientAddress:'SPX8T06E8FJQ33CX8YVR9CC6D9DSTF6JE0Y8R7DS',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:602,XactnType:'', XactnTypeDetail:'Kucoin Xfer',contract:'',function:'',senderAddress:'SP307BHDXSX759Z2XFAM405REWVFJK05HKG7BWRQB',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:603,XactnType:'', XactnTypeDetail:'Kucoin Xfer',contract:'',function:'',senderAddress:'',recipientAddress:'SP307BHDXSX759Z2XFAM405REWVFJK05HKG7BWRQB',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //Misc
      {id:650,XactnType:'Refund', XactnTypeDetail:'Ryder',contract:'SPC0KWNBJ61BDZRPF3W2GHGK3G3GKS8WZ7ND33PS.support-refunds-v1',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      //NFTs GENERAL 
      {id:1000,XactnType:'', XactnTypeDetail:'stacks-art-market',contract:'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-art-market',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1001,XactnType:'', XactnTypeDetail:'stacks-pops',contract:'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-pops',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1008,XactnType:'', XactnTypeDetail:'Stacks Degens',contract:'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.nyc-degens',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1009,XactnType:'', XactnTypeDetail:'Stacks Degens',contract:'SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.miami-degens',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1010,XactnType:'', XactnTypeDetail:'Project Indigo Act 1',contract:'SP176ZMV706NZGDDX8VSQRGMB7QN33BBDVZ6BMNHD.project-indigo-act1',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1011,XactnType:'', XactnTypeDetail:'Stacks Parrots 3D',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.stacks-parrots-3d::stacks-parrots-3d',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1012,XactnType:'', XactnTypeDetail:'Wasteland Apes',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.wasteland-apes-nft-mint',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1013,XactnType:'', XactnTypeDetail:'WCH x Stacks Parrots - Birthday Drop',contract:'SP3B84QWAXRAKB67Z4TB33SY5G0BGGVQC36526QN6.wch-x-stacks-parrots-birthday-drop',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
            
      //Byzantion
      {id:1100,XactnType:'', XactnTypeDetail:'Byzantion Buy Item',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'buy-item',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1101,XactnType:'', XactnTypeDetail:'Byzantion Bid Accepted',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'accept-collection-bid',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1102,XactnType:'', XactnTypeDetail:'Byzantion Bid Accepted',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'accept-bid',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1103,XactnType:'', XactnTypeDetail:'Byzantion Withdraw Bid',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'withdraw-bid',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1104,XactnType:'', XactnTypeDetail:'Byzantion Bid Item',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'bid-item',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1105,XactnType:'', XactnTypeDetail:'Byzantion Collection Bid',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'collection-bid',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1106,XactnType:'', XactnTypeDetail:'Byzantion Withdraw Bid',contract:'SP1BX0P4MZ5A3A5JCH0E10YNS170QFR2VQ6TT4NRH.byzantion-market-v6',function:'withdraw-collection-bid',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      

      //Megapont
      {id:1200,XactnType:'', XactnTypeDetail:'Megapont Space Agency (MSA)',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-space-agency',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1201,XactnType:'', XactnTypeDetail:'Megapont Space Agency (MSA)',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.msa-minter',function:'mint',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1202,XactnType:'', XactnTypeDetail:'Megapont Space Agency (MSA)',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.msa-apes-airdrop-4',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1202,XactnType:'', XactnTypeDetail:'Megapont Space Agency (MSA)',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.msa-airdrop14',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:1202,XactnType:'', XactnTypeDetail:'Megapont Space Agency (MSA)',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.msa-nft',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},

      //BitCoin Monkeys
      {id:2000,XactnType:'', XactnTypeDetail:'BitCoin Monkeys',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2001,XactnType:'', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys-labs',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2002,XactnType:'', XactnTypeDetail:'Monkey Kids Treehouse Club (MKTC)',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.monkey-kids-nft',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2003,XactnType:'', XactnTypeDetail:'World Cup Monkeys',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.world-cup-monkeys',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2004,XactnType:'', XactnTypeDetail:'Slime Components & Minions',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.slime-components-and-minions',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2004,XactnType:'', XactnTypeDetail:'Monkey Coins',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.monkey-coin',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2005,XactnType:'', XactnTypeDetail:'The Monkz',contract:'SPMWNPDCQMCXANG6BYK2TJKXA09BTSTES0VVBXVR.the-monkz',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2011,XactnType:'Stake', XactnTypeDetail:'Bitcoin Monkeys',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-staking',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2011,XactnType:'Stake', XactnTypeDetail:'Bitcoin Monkeys',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.bm-stake-v1',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2015,XactnType:'Stake', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys-staking',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},            
      {id:2016,XactnType:'Stake', XactnTypeDetail:'Monkey Kids Treehouse Club (MKTC)',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.mktc-staking-v2',function:'stake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2011,XactnType:'Unstake', XactnTypeDetail:'Bitcoin Monkeys',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.tired-apricot-ant',function:'unstake-all',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2011,XactnType:'Unstake', XactnTypeDetail:'Bitcoin Monkeys',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.bm-stake-v1',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2015,XactnType:'Unstake', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys-staking',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},            
      {id:2016,XactnType:'Unstake', XactnTypeDetail:'Monkey Kids Treehouse Club (MKTC)',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.mktc-staking-v2',function:'unstake',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2010,XactnType:'Reward', XactnTypeDetail:'BitCoin Monkeys',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-staking',function:'harvest',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},     
      {id:2013,XactnType:'Reward', XactnTypeDetail:'BitCoin Monkeys',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.bm-stake-v1',function:'harvest',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2015,XactnType:'Reward', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.mutant-monkeys-staking',function:'collect',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2014,XactnType:'Reward', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SPMWNPDCQMCXANG6BYK2TJKXA09BTSTES0VVBXVR.slime-stake-v3',function:'distribute',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2013,XactnType:'Reward', XactnTypeDetail:'Monkey Kids Treehouse Club (MKTC)',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.mktc-staking-v2',function:'harvest',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},            
      {id:2013,XactnType:'Reward', XactnTypeDetail:'$BAN Airdrop',contract:'SPMWNPDCQMCXANG6BYK2TJKXA09BTSTES0VVBXVR.banana-airdrop-2',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},           
      {id:2012,XactnType:'Reward', XactnTypeDetail:'Bitcoin Monkey World Cup Rewards',contract:'SP1GPNZB0JSC9RXJTXVBAMSPQE29WM1SE8V39R6K2.bm-wc-stx-airdrop',function:'',senderAddress:'',recipientAddress:'',inSymbol:'STX',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2001,XactnType:'Upgrade', XactnTypeDetail:'BitCoin Monkey Mutants',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.mutant-upgrade-v1',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},

      //BTC Sports
      {id:2050,XactnType:'', XactnTypeDetail:'BTC Sports VIP Pass',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-sports-vip-pass',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2051,XactnType:'', XactnTypeDetail:'BTC Sports Flags',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-sports-flags-nft',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
      {id:2052,XactnType:'', XactnTypeDetail:'BTC Sports Flags',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-sports-airdrop-2',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2053,XactnType:'', XactnTypeDetail:'BTC Sports Flags',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-flag-airdrop-nov-28-1',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2054,XactnType:'', XactnTypeDetail:'BTC Sports Flags',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-flag-airdrop-nov-28-3',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2054,XactnType:'', XactnTypeDetail:'BTC Sports Flags',contract:'SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.btc-sports-airdrop-4',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},      
      {id:2055,XactnType:'', XactnTypeDetail:'BTC Sports OG Soccer',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.og-soccer-airdrop',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},            
      {id:2056,XactnType:'', XactnTypeDetail:'BTC Sports OG Soccer',contract:'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.btc-sports-og-soccer',function:'',senderAddress:'',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},            

      // Friedger Pools
      {id:3000,XactnType:'Stacking Reward', XactnTypeDetail:'Friedger Pool',contract:'',function:'',senderAddress:'SPFP0018FJFD82X3KCKZRGJQZWRCV9793QTGE87M',recipientAddress:'',inSymbol:'',notInSymbol:'',outSymbol:'',notOutSymbol:''},
    ];
}
