/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];
var cityNum = 0;//记录城市的个数
var tableContent = document.getElementById("aqi-table");
var addBtn = document.getElementById("add-btn");
var tableInner = "";
document.getElementById("aqi-city-input").addEventListener('blur',checkCity);
document.getElementById("aqi-value-input").addEventListener('blur',checkWeaNum);
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
   var city = document.getElementById("aqi-city-input").value;
   var weatherNum = document.getElementById("aqi-value-input").value;
	city = city.trim();
	weatherNum = weatherNum.trim();
	
  	aqiData.push([city,weatherNum]);
  	cityNum++;
}

/**
 * 渲染aqi-table表格
 */

function renderAqiList() {
	var dataLen = aqiData.length;
	if (aqiData.length == 1) {
//		只有一个城市信息的时候需要表头
		tableInner += "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
		tableInner += "<tr><td>"+aqiData[0][0]+"</td><td>"+aqiData[0][1]+"</td><td><button>删除</button></td></tr>";
		tableContent.innerHTML = tableInner;
		var  trEle = tableContent.firstChild.lastChild;
		var delBtn = trEle.lastChild.lastChild;
		delBtn.addEventListener('click',function(){
			tableContent.firstChild.removeChild(trEle);
			cityNum--;
			checkCityNum();
		})
		
		
	} else{
//		在表格后添加最新的城市天气信息
		var trEle = document.createElement('tr');
		trEle.innerHTML += "<td>"+aqiData[dataLen-1][0]+"</td><td>"+aqiData[dataLen-1][1]+"</td><td><button>删除</button></td>";
		tableContent.firstChild.appendChild(trEle);
		var delBtn = trEle.lastChild.lastChild;
		delBtn.addEventListener('click',function(){
			tableContent.firstChild.removeChild(trEle);
			cityNum--;
			checkCityNum();
		})
		
	}
		
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

  addAqiData();
  
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
//function delBtnHandle() {
  // do sth.
	
//renderAqiList();
//}
//检测是否所有城市天气信息被删除完
function checkCityNum () {
	if (cityNum == 0) {
		tableContent.removeChild(tableContent.firstChild);
	}
}
function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	
		addBtn.addEventListener('click',addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	
}
function checkCity () {
	var cityPatt = new RegExp(/^[a-zA-Z-\u4e00-\u9fa5]{1,20}$/);
	var city = document.getElementById("aqi-city-input");
	var cityValue = city.value.trim();
	if (cityPatt.test(cityValue) == false) {
		city.value = "";
		city.placeholder = "请输入城市中文或英文";
	} 
	isOK();
}
function checkWeaNum () {
	var weaNumPatt = new RegExp(/^[1-9]\d*$/);
	var weaNum = document.getElementById("aqi-value-input");
	var weaNumValue = weaNum.value.trim();
	if (weaNumPatt.test(weaNumValue) == false) {
		weaNum.value = "";
		weaNum.placeholder = "请输入正整数";
	} 
	isOK();
}
function isOK () {
	var city = document.getElementById("aqi-city-input").value;
	var weaNum = document.getElementById("aqi-value-input").value;
	city = city.trim();
	weaNum = weaNum.trim();
	if (city !== null && weaNum !== null &&city !== "" && weaNum!=="") {
		addBtn.disabled = "";
	}else{
		addBtn.disabled = "disabled";
	}
}
init();