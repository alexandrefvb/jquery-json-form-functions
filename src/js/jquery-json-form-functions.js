/* 
 * @author Alexandre Fidelis Vieira Bitencourt
 * @license http://opensource.org/licenses/mit-license.php
 * @documentation http://alexandrefvb.github.io/jquery-json-form-functions
 */
$.fn.toJson = function() {

    var indexedArrayRegex = /(.+)\[(\d+)\]/;
    
    var arrayRegex = /(.+)\[\]/;

    var root = {};
	
    var serializedForm = this.serializeArray();    

    function addFieldValue(root, fqn, value) {
		if (fqn.length === 1) {
			var match = fqn[0].match(arrayRegex);
			var key = (match) ? match[1] : fqn[0];
			if (root[key]) {
				if (match) {
					root[key].push(value);
				} else {
					root[key] = value;
				}
			} else {
				root[key] = (match) ? [value] : value;
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
				var match = key.match(indexedArrayRegex);
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
	
	for (var i in serializedForm) {
		if (serializedForm[i].value !== "") {
			var fqn = serializedForm[i].name.split(" ").join("").split(".");
			addFieldValue(root, fqn, serializedForm[i].value);
		}
	}
	
	root = mergeObjectArrays(root);
	
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