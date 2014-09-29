/* 
 * @author Alexandre Fidelis Vieira Bitencourt
 * @license http://opensource.org/licenses/mit-license.php
 * 
 * This script adds three utility functions to jQuery to convert form data to json objects and do ajax requests to 
 * POST or PUT the converted form data to http services.
 * 
 * Usage:
 * 
 * $(form-selector).toJson() - return form data converted to json based on input names.
 * $(form-selector).postJson() - converts form data to json based on input names and post the json to the 
 * 								 url configured in action attribute. The return will be the jQuery ajax promise.
 * $(form-selector).putJson() - converts form data to json based on input names and put the json to the url 
 * 								configured in action attribute. The return will be the jQuery ajax promise.
 * 
 * Conversion rules:
 * 
 * - All inputs (input, textarea or select) on form that have a name attribute will be added to the json.
 * - The name attribute defines which property of json will be populated.
 * - Nested objects with multiple levels of attributes can be created using dots "." to specify nested properties.
 * - Arrays of values can be created using the same name in more than one input on same form.
 * - To create arrays of objects indexes must be used to determine which object of list will hold input value.
 * - Inputs with empty values are ommitted on JSON.
 * - For checkboxes and radio buttons just "checked" values are added to JSON.
 * - Any input with class "json-form-array" will be converted to an array in JSON. This feature can be used 
 * 	 in selects with multiple selection and checkboxes to force array representation even if just one option 
 *   is selected.
 * 
 * Full example:
 * 
 * <form id="aForm" action="http://some-service-url">
 *     <input type="hidden" name="simpleAttribute" value="123"/>
 *
 *     <input type="text" name="listAttribute" value="a"/>
 *     <input type="text" name="listAttribute" value="b"/>
 *     
 *     <input type="text" name="object.simpleAtrtribute" value="456"/>
 *     <input type="text" name="object.listAttribute" value="c"/>
 *     <input type="text" name="object.listAttribute" value="d"/>
 *     <input type="text" name="object.nestedObject.simpleAtrtribute" value="789"/>
 *     <input type="text" name="object.nestedObject.listAttribute" value="e"/>
 *     <input type="text" name="object.nestedObject.listAttribute" value="f"/>
 *     
 *     <input type="text" name="objectList[0].simpleAtrtribute" value="101112"/>
 *     <input type="text" name="objectList[0].listAttribute" value="g"/>
 *     <input type="text" name="objectList[0].listAttribute" value="h"/>
 *     <input type="text" name="objectList[1].simpleAtrtribute" value="131515"/>
 *     <input type="text" name="objectList[1].listAttribute" value="i"/>
 *     <input type="text" name="objectList[1].listAttribute" value="j"/>
 *     
 *     <input type="hidden" name="ignoredAttribute" value=""/>
 *
 *	   <input type="hidden" name="forcedArrayAttribute" value="x" class="json-form-array"/>
 *     
 *     <input type="checkbox" name="checkboxField" value="Value 1" class="json-form-array" checked="checked"/>
 *     <input type="checkbox" name="checkboxField" value="Value 2" />
 *     <input type="checkbox" name="checkboxField" value="Value 3" />
 *     
 *     <input type="radio" name="radioField" value="Value 1" checked="checked"/>
 *     <input type="radio" name="radioField" value="Value 2"/>
 *     <input type="radio" name="radioField" value="Value 3"/>
 *     
 *     <select name="selectField">
 *     		<option value="A">A</option>
 *     		<option value="B">B</option>
 *     		<option value="C" selected="selected">C</option>
 *     </select>
 *     
 *     <select name="multipleSelectField" multiple="multiple" class="json-form-array">
 *     		<option value="A" selected="selected">A</option>
 *     		<option value="B">B</option>
 *     		<option value="C">C</option>
 *     </select>      
 * </form>
 * 
 * $("#aform").toJson(); will convert the above form to the following JSON:
 * 
 * 	{ 
 * 		"simpleAttribute": "123",
 * 		"listAttribute": ["a", "b"],
 * 		"object": {
 * 			"simpleAttribute": "456",
 * 			"listAttribute": ["c", "d"],
 *			"nestedObject": {
 * 				"simpleAttribute": "789",
 * 				"listAttribute": ["e", "f"]
 * 			} 
 * 		}
 * 		"objectList": [
 * 			{
 * 				"simpleAttribute": "101112",
 * 				"listAttribute": ["g", "h"],
 * 			},  
 * 			{
 * 				"simpleAttribute": "131515",
 * 				"listAttribute": ["i", "j"],
 * 			}  
 * 		],
 * 		"forcedArrayAttribute": ["x"],
 * 		"checkboxField": ["Value 1"],
 * 		"radioField": "Value 1",
 * 		"selectField": "C",
 * 		"multipleSelectField": [ "A" ]
 * 	}
 * 
 *  To do a POST request to form action with above JSON on request body you can execute: 
 *  
 *  	$("#aform").postJson();
 *  
 *  To do a PUT request to form action with above JSON on request body you can execute:
 *   
 *  	$("#aform").putJson();
 *   
 */
$.fn.toJson = function() {

    var arrayRegex = /(.+)\[(\d+)\]/;

    var root = {};
	
	var serializedForm = this.serializeArray();    

    function addFieldValue(root, fqn, value) {
		if (fqn.length === 1) {
			if (root[fqn[0]]) {
				var oldValue = root[fqn[0]];
				if ($.isArray(oldValue)) {
					oldValue.push(value);
				} else {
					root[fqn[0]] = [ root[fqn[0]], value ];
				}
			} else {
				root[fqn[0]] = value;
			}
		} else {
			if (!root[fqn[0]]) {
				root[fqn[0]] = {};
			}
			var newRoot = root[fqn[0]];
			fqn.splice(0, 1);
			addFieldValue(newRoot, fqn, value);
		}
	}
	
	function mergeObjectArrays(root) {
		if (typeof root === "string") {
			return root;
		} else if ($.isArray(root)) {
			for (var i in root) {
				root[i] = mergeObjectArrays(root[i]);
			}
		} else {
			for (var key in root) {
				var match = key.match(arrayRegex);
				if (match) {
					root[match[1]] = root[match[1]] || [];
					root[match[1]][parseInt(match[2])] = mergeObjectArrays(root[key]);
					delete root[key];
				} else {
					root[key] = mergeObjectArrays(root[key]);
				}
			}
		}
		return root;
	}
	
	function convertToArray(root, fqn) {
		var match = fqn[0].match(arrayRegex);
		var value = (match) ? root[match[1]][match[2]] : root[fqn[0]];		
		if (fqn.length === 1) {
			if (value && !$.isArray(value) && value !== "") {
				if (match) {
					root[match[1]][match[2]] = [value];
				} else {
					root[fqn[0]] = [value];
				}
			}
		} else {
			fqn.splice(0,1);
			convertToArray(value, fqn);
		}
	}
	
	for (var i in serializedForm) {
		if (serializedForm[i].value !== "") {
			var fqn = serializedForm[i].name.split(" ").join("").split(".");
			addFieldValue(root, fqn, serializedForm[i].value);
		}
	}
	
	root = mergeObjectArrays(root);
	
	this.find(".json-form-array").each(function (i, elm) {
        convertToArray(root, elm.name.split(" ").join("").split("."));
	});
	
	return root;
};

$.fn.postJson = function() {
	var jqxhr = $.ajax({
		type : "POST",
		url : this.attr("action") || window.location.href,
		data : JSON.stringify(this.toJson()),
		dataType : "json",
		processData : false,
		contentType : "application/json; charset=UTF-8"
	});
	return jqxhr;
};

$.fn.putJson = function() {
	var jqxhr = $.ajax({
		type : "PUT",
		url : this.attr("action") || window.location.href,
		data : JSON.stringify(this.toJson()),
		dataType : "json",
		processData : false,
		contentType : "application/json; charset=UTF-8"
	});
	return jqxhr;
};