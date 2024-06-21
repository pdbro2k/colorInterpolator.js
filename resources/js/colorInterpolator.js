function interpolate(value, conf) {
	var minValue = "minValue" in conf ? conf.minValue : 0;
	var maxValue = "maxValue" in conf ? conf.maxValue : 1000;
	var minHexColor = "minHexColor" in conf ? conf.minHexColor : "#FFFFFF";
	var medHexColor = "medHexColor" in conf ? conf.medHexColor : "";
	var maxHexColor = "maxHexColor" in conf ? conf.maxHexColor : "#000000";
	
	// local helper functions
	function getRValue(hexValue) {
		return parseInt(hexValue.substring(1, 3), 16);
	}
	function getGValue(hexValue) {
		return parseInt(hexValue.substring(3, 5), 16);
	}
	function getBValue(hexValue) {
		return parseInt(hexValue.substring(5, 7), 16);
	}
	function getHex(intValue) {
		return Number(intValue).toString(16).padStart(2, "0")
	};
	function getInterpolatedValue(value, minValue, maxValue, minColorValue, maxColorValue) {
		if (value <= minValue) {
			return minColorValue;
		}
		if (value >= maxValue) {
			return maxColorValue;
		}
		return minColorValue + Math.floor((maxColorValue - minColorValue) * (value - minValue) / (maxValue - minValue))
	}
	
	// handle min-med-max interpolation
	if (medHexColor !== "") {
		var medValue = Math.floor((minValue + maxValue) / 2);
		if (value <= medValue) {
			var currentRValue = getInterpolatedValue(value, minValue, medValue, getRValue(minHexColor), getRValue(medHexColor));
			var currentGValue = getInterpolatedValue(value, minValue, medValue, getGValue(minHexColor), getGValue(medHexColor));
			var currentBValue = getInterpolatedValue(value, minValue, medValue, getBValue(minHexColor), getBValue(medHexColor));
			return "#" + getHex(currentRValue) + getHex(currentGValue) + getHex(currentBValue);
		}
		var currentRValue = getInterpolatedValue(value, medValue, maxValue, getRValue(medHexColor), getRValue(maxHexColor));
		var currentGValue = getInterpolatedValue(value, medValue, maxValue, getGValue(medHexColor), getGValue(maxHexColor));
		var currentBValue = getInterpolatedValue(value, medValue, maxValue, getBValue(medHexColor), getBValue(maxHexColor));
		return "#" + getHex(currentRValue) + getHex(currentGValue) + getHex(currentBValue);
	}
	
	// handle min-max interpolation
	var currentRValue = getInterpolatedValue(value, minValue, maxValue, getRValue(minHexColor), getRValue(maxHexColor));
	var currentGValue = getInterpolatedValue(value, minValue, maxValue, getGValue(minHexColor), getGValue(maxHexColor));
	var currentBValue = getInterpolatedValue(value, minValue, maxValue, getBValue(minHexColor), getBValue(maxHexColor));
	return "#" + getHex(currentRValue) + getHex(currentGValue) + getHex(currentBValue);
	
}