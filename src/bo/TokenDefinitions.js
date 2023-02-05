export class Token {
    static tokens = [
      {symbol:'STX',apiSymbol:'blockstack',contract:'',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 3},
      {symbol:'DIKO',apiSymbol:'arkadiko-protocol',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token::diko',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 3},
      {symbol:'USDA',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token::usda',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 3},
      {symbol:'MIA',apiSymbol:'miamicoin',contract:'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin',conversionFactor:1,amountDecimals: 2,priceDecimals: 5},
      {symbol:'NYC',apiSymbol:'',contract:'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-token::newyorkcitycoin',conversionFactor:1,amountDecimals: 2,priceDecimals: 5},
      {symbol:'MIAv2',apiSymbol:'',contract:'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.miamicoin-token-v2::miamicoin',conversionFactor:1000000,amountDecimals: 2,priceDecimals: 5},
      {symbol:'NYCv2',apiSymbol:'',contract:'SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11.newyorkcitycoin-token-v2::newyorkcitycoin',conversionFactor:1000000,amountDecimals: 2,priceDecimals: 5},
      {symbol:'SXSW',apiSymbol:'',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stsw-token-v4a::stsw',conversionFactor:1,amountDecimals: 3,priceDecimals: 4},
      {symbol:'SXSWLP_STX-NYC',apiSymbol:'',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.liquidity-token-v5kt8k62b86::liquidity-token',conversionFactor:1000000,amountDecimals: 4,priceDecimals: 4},
      {symbol:'SXSWLP_STX-USDA',apiSymbol:'',contract:'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.liquidity-token-v5k0yl5ot8l::liquidity-token',conversionFactor:1000000,amountDecimals: 4,priceDecimals: 4},
      {symbol:'xBTC',apiSymbol:'wrapped-bitcoin-stacks',contract:'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin::wrapped-bitcoin',conversionFactor:100000000,amountDecimals: 6,priceDecimals: 0},
      {symbol:'DIKOLP_STX-USDA',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-token-wstx-usda::wstx-usda',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'DIKOLP_STX-XBTC',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-token-wstx-xbtc::wstx-xbtc',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'DIKOLP_XBTC_USDA',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-token-xbtc-usda::xbtc-usda',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'DIKOLP_STX_DIKO',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-swap-token-wstx-diko::wstx-diko',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'stDIKO',apiSymbol:'',contract:'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.stdiko-token::stdiko',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'idoALEX',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.lottery-ido-alex::lottery-ido-alex',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'WELSH',apiSymbol:'',contract:'SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token::welshcorgicoin',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 4},
      {symbol:'BAN',apiSymbol:'',contract:'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-bananas::BANANA',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 5},
      {symbol:'SLIME',apiSymbol:'',contract:'SP125J1ADVYWGWB9NQRCVGKYAG73R17ZNMV17XEJ7.slime-token::SLIME',conversionFactor:1000000,amountDecimals: 3,priceDecimals: 6},
      {symbol:'ALEX',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token::alex',conversionFactor:100000000,amountDecimals: 3,priceDecimals: 4},
      {symbol:'APOWER',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-apower::apower',conversionFactor:100000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'ALEXLP_STX-ALEX',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fwp-wstx-alex-50-50-v1-01::fwp-wstx-alex-50-50-v1-01',conversionFactor:100000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'ALEXLP_STX-ALEX',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fwp-wstx-alex-50-50::fwp-wstx-alex-50-50',conversionFactor:100000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'ALEXLP_STX-XBTC',apiSymbol:'',contract:'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fwp-wstx-wbtc-50-50-v1-01::fwp-wstx-wbtc-50-50-v1-01',conversionFactor:100000000,amountDecimals: 3,priceDecimals: 2},
      {symbol:'MEGA',apiSymbol:'',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.mega::mega',conversionFactor:1,amountDecimals: 3,priceDecimals: 2},
      {symbol:'MEGA',apiSymbol:'',contract:'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.kong2',conversionFactor:1,amountDecimals: 3,priceDecimals: 2},
      {symbol:'FORCE',apiSymbol:'',contract:'SP2P6KSAJ4JVV8PFSNKJ9BNG5PEPR4RT71VXZHWBK.forcecoin::force',conversionFactor:100,amountDecimals: 3,priceDecimals: 2},
      {symbol:'VIBES',apiSymbol:'',contract:'SP27BB1Y2DGSXZHS7G9YHKTSH6KQ6BD3QG0AN3CR9.vibes-token::vibes-token',conversionFactor:100000000,amountDecimals: 2,priceDecimals: 5},

      //Currencies
      {symbol:'EUR',apiSymbol:'',contract:'',conversionFactor:1000000,amountDecimals: 5,priceDecimals: 6},      
      //Names
      {symbol:'BNS Name',apiSymbol:'',contract:'SP000000000000000000002Q6VF78.bns::names',conversionFactor:1,amountDecimals: 0,priceDecimals: 0}


    ];
}
