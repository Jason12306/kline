## @vanyi/kline.js

[![npm version](https://img.shields.io/npm/v/@vanyi/kline)](https://www.npmjs.com/package/@vanyi/kline)
[![License](https://img.shields.io/npm/l/@vanyi/kline)](https://www.npmjs.com/package/@vanyi/kline)

![@vanyi/kline demo](https://vanyi0924.github.io/kline/screenshot/demo.gif)

English | [简体中文](./README-zh.md)

## Installation
`npm i @vanyi/kline`

## Usage
1. Browser:
		`<link rel="stylesheet" href="path/to/kline.min.css">`
		`<script src="path/to/kline.min.js"></script>`

	 Module:
	 	`import VyKline from '@vanyi/kline';` 
		`import '@vanyi/kline/lib/kline.min.css;'`
2.  After dom is loaded, run `VyKline.bootstrap(options)`,`option: Object`; 
3. `options`:
	- `container` Chart mount point `type: HTMLElement`;
	- `deedfeeds` Data feedback object `type: Object`,See below for detailed configuration;
	- `defaultInterval` Default time granularity `type: String`,See below for detailed configuration;
	- `interval` Time granularity collection `type: Array`,defaultInterval's collection;
	- `theme` theme `type: String`, Optional `light | dark`, default:`light`;
	- `customChart` Custom chart configuration `type: Object`,See below for detailed configuration;
	- `customLoadingEl`  Custom loading node `type: HTMLElement`, Optional,The style needs to be set to absolute positioning, width and height 100%;
	- `chartType` Chart type `type: String`, Optional `KLINE | EMPTY_KLINE`,default `KLINE`;
	- `showIntervalToolbar` Whether to display the time granularity bar `type: Boolean` Optional,default `true`;
	- `lang` Language `type: String`, Optional `zhCN | enUS`, default `zhCN`;
	- `onTimeIntervalChanged` This event is triggered when the time granularity is switched,The parameter is time granularity `type: Function`,Optional.

## Detailed Configuration
 1. `deedfeeds` Data feedback object,enter data for the chart.  
 	### methods
 	- `setHistoryData({ interval, setHistoryData, subscribeData })` Set historical data 
	
 		>`interval`Current time granularity  
 		>`setHistoryData` Callback,Parameters are historical data `Array`,Standard data objects are as follows: 
		
 			{
				time: null, // 1590314400000
				open: null,
				high: null,
				low: null,
				close: null,
				volume: null // Trading volume
			}	
 		> `getRealTimeData`  Callback,Parameters are standard data objects,Same as above.
		
 	- `intervalChanged({ interval, setHistoryData, subscribeData })` Triggered when time granularity is switched,Note: Here you should unsubscribe before getting historical data
	
 	 	>`interval`Current time granularity  
 		>`setHistoryData` Callback,Parameters are historical data `Array`  
 		>`subscribeData` Callback,The parameter is the current data object `Object`

2. `defaultInterval` Default time granularity,format: `'m1','h1', 'd1', 'w1', 'M1'` Corresponding to `minute, hour, day, week, month`  
3. `customChart` Chart custom configuration object:
	
		{
			default_rise_color: '#53b987', // rise
			default_fall_color: '#eb4d5c', // fall
			init_offset_x: 100, // Initial chart offset
			volume_height: 100, // Trading volume height
			interval_tool_bar: '30px', // Time granularity bar default height
		}  

## Instance Method
1. `switchChartType` Switch chart type,`paramType: String` Optional value:`KLINE` | `EMPTY_KLINE`
2. `switchTheme` Switch theme,`paramType: String` Optional value:`light` | `dark`
3. `switchLang` Switch language,`paramType: String` Optional value:`zhCN` | `enUS`

## Compatibility
Mainstream browser

## License
[MIT](https://opensource.org/licenses/MIT)  
Copyright (c) 2020 Vanyi0924

## Preview Address
[https://vanyi0924.github.io/kline/](https://vanyi0924.github.io/kline/)  

## Examples
[Code](./example)  

## Explanation
The chart is completely driven by data, and only focuses on the introduction of data, so as long as you access the data that meets the standards.The [example](./example) uses the `websocket` way,Thanks[huobi](https://www.huobi.br.com/zh-cn/)for the data interface provided.

## About
This is a project developed and maintained by virtue of personal interests, hobbies and sense of responsibility,If it can bring you a little help,please star to let more people know it,Thank you!Community support is my motivation.（づ￣3￣）づ╭❤～

## Developing  
- [ ] x,y axis optimization
- [x] internationalization
- [ ] custom theme(If you need customization urgently, you can modify or add it in `/src/config/theme`)
