describe("Unit tests", function() {
	
	it("check if simple attributes are serialized according to the rules", function() {
		var json = $(
			"<form>" +
				"<input type='hidden' name='simpleInputHidden' value='1'></input>"+
				"<input type='text' name='simpleInputText' value='2'></input>"+
				"<input type='checkbox' name='simpleUncheckedCheckbox' value='3'></input>"+
				"<input type='checkbox' name='simpleCheckedCheckbox' value='4' checked></input>"+
				"<input type='radio' name='simpleUncheckedRadio' value='5'></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='6' checked></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='7'></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='8'></input>"+
				"<input type='text' name='simpleInputWithEmptyValue' value=''></input>"+
				"<select name='simpleSelectField'>" +
					"<option value='A'>A</option>"+
					"<option value='B'>B</option>"+
					"<option value='C' selected='selected'>C</option>"+
				"</select>"+	
			"</form>").toJson();
		expect(json.simpleInputHidden).toBe("1");
		expect(json.simpleInputText).toBe("2");
		expect(json.simpleUncheckedCheckbox).toBe(undefined);
		expect(json.simpleCheckedCheckbox).toBe("4");
		expect(json.simpleUncheckedRadio).toBe(undefined);
		expect(json.simpleCheckedRadio).toBe("6");
		expect(json.simpleInputWithEmptyValue).toBe(undefined);
		expect(json.simpleSelectField).toBe("C");
	});
	
	it("check if simple attributes with json-form-array class are serialized as arrays", function() {
		var json = $(
			"<form>" +
				"<input type='hidden' name='simpleInputHidden' value='1' class='json-form-array'></input>"+
				"<input type='hidden' name='nested.simpleInputHidden' value='1' class='json-form-array'></input>"+
				"<input type='hidden' name='simpleInputHiddenList[0]' value='1' class='json-form-array'></input>"+
				"<input type='text' name='simpleInputText' value='2' class='json-form-array'></input>"+
				"<input type='checkbox' name='simpleUncheckedCheckbox' value='3' class='json-form-array'></input>"+
				"<input type='checkbox' name='simpleCheckedCheckbox' value='4' checked  class='json-form-array'></input>"+
				"<input type='radio' name='simpleUncheckedRadio' value='5'  class='json-form-array'></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='6' checked  class='json-form-array'></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='7' class='json-form-array'></input>"+
				"<input type='radio' name='simpleCheckedRadio' value='8' class='json-form-array'></input>"+
				"<input type='text' name='simpleInputWithEmptyValue' value='' class='json-form-array'></input>"+
				"<select name='simpleSelectField' class='json-form-array'>" +
					"<option value='A'>A</option>"+
					"<option value='B'>B</option>"+
					"<option value='C' selected='selected'>C</option>"+
				"</select>"+	
			"</form>").toJson();
		expect(json.simpleInputHidden).toEqual(["1"]);
		expect(json.nested.simpleInputHidden).toEqual(["1"]);
		expect(json.simpleInputHiddenList[0]).toEqual(["1"]);
		expect(json.simpleInputText).toEqual(["2"]);
		expect(json.simpleUncheckedCheckbox).toBe(undefined);
		expect(json.simpleCheckedCheckbox).toEqual(["4"]);
		expect(json.simpleUncheckedRadio).toBe(undefined);
		expect(json.simpleCheckedRadio).toEqual(["6"]);
		expect(json.simpleInputWithEmptyValue).toBe(undefined);
		expect(json.simpleSelectField).toEqual(["C"]);
	});

	it("check if inputs with the same name are serialized as arrays", function() {
		var json = $(
			"<form>" +
				"<input type='hidden' name='inputArray' value='1'></input>"+
				"<input type='hidden' name='inputArray' value='2'></input>"+
				"<input type='hidden' name='inputArray' value='3'></input>"+
			"</form>").toJson();
		expect(json.inputArray).toEqual(["1","2","3"]);
	});

	it("check if nested attributes are serialized according to the rules", function() {
		var json = $(
			"<form>" +
				"<input type='hidden' name='object.simpleInputHidden' value='1'></input>"+
				"<input type='text' name='object.simpleInputText' value='2'></input>"+
				"<input type='checkbox' name='object.simpleUncheckedCheckbox' value='3'></input>"+
				"<input type='checkbox' name='object.simpleCheckedCheckbox' value='4' checked></input>"+
				"<input type='radio' name='object.simpleUncheckedRadio' value='5'></input>"+
				"<input type='radio' name='object.simpleCheckedRadio' value='6' checked></input>"+
				"<input type='radio' name='object.simpleCheckedRadio' value='7'></input>"+
				"<input type='radio' name='object.simpleCheckedRadio' value='8'></input>"+
				"<input type='text' name='object.simpleInputWithEmptyValue' value=''></input>"+
				"<select name='object.simpleSelectField'>" +
					"<option value='A'>A</option>"+
					"<option value='B'>B</option>"+
					"<option value='C' selected='selected'>C</option>"+
				"</select>"+	
				"<input type='hidden' name='object.inputArray' value='1'></input>"+
				"<input type='hidden' name='object.inputArray' value='2'></input>"+
			"</form>").toJson();
		expect(json.object.simpleInputHidden).toBe("1");
		expect(json.object.simpleInputText).toBe("2");
		expect(json.object.simpleUncheckedCheckbox).toBe(undefined);
		expect(json.object.simpleCheckedCheckbox).toBe("4");
		expect(json.object.simpleUncheckedRadio).toBe(undefined);
		expect(json.object.simpleCheckedRadio).toBe("6");
		expect(json.object.simpleInputWithEmptyValue).toBe(undefined);
		expect(json.object.simpleSelectField).toBe("C");
		expect(json.object.inputArray).toEqual(["1","2"]);
	});
	
	it("check if objects lists are serialized according to the rules", function() {
		var json = $(
			"<form>" +
				"<input type='hidden' name='object[0].simpleInputHidden' value='1'></input>"+
				"<input type='text' name='object[0].simpleInputText' value='2'></input>"+
				"<input type='checkbox' name='object[0].simpleUncheckedCheckbox' value='3'></input>"+
				"<input type='checkbox' name='object[0].simpleCheckedCheckbox' value='4' checked></input>"+
				"<input type='radio' name='object[0].simpleUncheckedRadio' value='5'></input>"+
				"<input type='radio' name='object[0].simpleCheckedRadio' value='6' checked></input>"+
				"<input type='radio' name='object[0].simpleCheckedRadio' value='7'></input>"+
				"<input type='radio' name='object[0].simpleCheckedRadio' value='8'></input>"+
				"<input type='text' name='object[0].simpleInputWithEmptyValue' value=''></input>"+
				"<select name='object[0].simpleSelectField'>" +
					"<option value='A'>A</option>"+
					"<option value='B'>B</option>"+
					"<option value='C' selected='selected'>C</option>"+
				"</select>"+	
				"<input type='hidden' name='object[0].inputArray' value='1'></input>"+
				"<input type='hidden' name='object[0].inputArray' value='2'></input>"+

				"<input type='hidden' name='object[1].simpleInputHidden' value='1'></input>"+
				"<input type='text' name='object[1].simpleInputText' value='2'></input>"+
				"<input type='checkbox' name='object[1].simpleUncheckedCheckbox' value='3'></input>"+
				"<input type='checkbox' name='object[1].simpleCheckedCheckbox' value='4' checked></input>"+
				"<input type='radio' name='object[1].simpleUncheckedRadio' value='5'></input>"+
				"<input type='radio' name='object[1].simpleCheckedRadio' value='6' checked></input>"+
				"<input type='radio' name='object[1].simpleCheckedRadio' value='7'></input>"+
				"<input type='radio' name='object[1].simpleCheckedRadio' value='8'></input>"+
				"<input type='text' name='object[1].simpleInputWithEmptyValue' value=''></input>"+
				"<select name='object[1].simpleSelectField'>" +
					"<option value='A'>A</option>"+
					"<option value='B'>B</option>"+
					"<option value='C' selected='selected'>C</option>"+
				"</select>"+	
				"<input type='hidden' name='object[1].inputArray' value='1'></input>"+
				"<input type='hidden' name='object[1].inputArray' value='2'></input>"+
				"<input type='hidden' name='object[1].inputArray' value='3'></input>"+
			"</form>").toJson();

		expect(json.object[0].simpleInputHidden).toBe("1");
		expect(json.object[0].simpleInputText).toBe("2");
		expect(json.object[0].simpleUncheckedCheckbox).toBe(undefined);
		expect(json.object[0].simpleCheckedCheckbox).toBe("4");
		expect(json.object[0].simpleUncheckedRadio).toBe(undefined);
		expect(json.object[0].simpleCheckedRadio).toBe("6");
		expect(json.object[0].simpleInputWithEmptyValue).toBe(undefined);
		expect(json.object[0].simpleSelectField).toBe("C");
		expect(json.object[0].inputArray).toEqual(["1","2"]);

		expect(json.object[1].simpleInputHidden).toBe("1");
		expect(json.object[1].simpleInputText).toBe("2");
		expect(json.object[1].simpleUncheckedCheckbox).toBe(undefined);
		expect(json.object[1].simpleCheckedCheckbox).toBe("4");
		expect(json.object[1].simpleUncheckedRadio).toBe(undefined);
		expect(json.object[1].simpleCheckedRadio).toBe("6");
		expect(json.object[1].simpleInputWithEmptyValue).toBe(undefined);
		expect(json.object[1].simpleSelectField).toBe("C");
		expect(json.object[1].inputArray).toEqual(["1","2","3"]);
		
	});
	
	it("makes PUT requests with serialized JSON", function() {
		var spy = sinon.spy(jQuery, "ajax");
		var jqForm = $(
			"<form action='http://www.api.com/some-service-url'>" +
				"<input type='hidden' name='simpleAttr' value='a'></input>" +
				"<input type='hidden' name='arrayAttr' value='b'></input>" +
				"<input type='hidden' name='arrayAttr' value='c'></input>" +
				"<input type='hidden' name='object.simpleAttr' value='a'></input>" +
				"<input type='hidden' name='object.arrayAttr' value='b'></input>" +
				"<input type='hidden' name='object.arrayAttr' value='c'></input>" +
				"<input type='hidden' name='object.nestedObject.simpleAttr' value='a'></input>" +
				"<input type='hidden' name='object.nestedObject.arrayAttr' value='b'></input>" +
				"<input type='hidden' name='object.nestedObject.arrayAttr' value='c'></input>" +
				"<input type='hidden' name='objectArray[0].simpleAttr' value='a'></input>" +
				"<input type='hidden' name='objectArray[0].arrayAttr' value='b'></input>" +
				"<input type='hidden' name='objectArray[0].arrayAttr' value='c'></input>" +
				"<input type='hidden' name='objectArray[1].simpleAttr' value='a'></input>" +
				"<input type='hidden' name='objectArray[1].arrayAttr' value='b'></input>" +
				"<input type='hidden' name='objectArray[1].arrayAttr' value='c'></input>" +
			"</form>");
		jqForm.putJson();
		expect(spy.calledWith({
			type : "PUT",
			url : "http://www.api.com/some-service-url",
			data : JSON.stringify(jqForm.toJson()),
			dataType : "json",
			processData : false,
			contentType : "application/json; charset=UTF-8"
		})).toBeTruthy();
		jQuery.ajax.restore();		
	});
	
	it("makes POST requests with serialized JSON", function() {
		var spy = sinon.spy(jQuery, "ajax");
		var jqForm = $(
			"<form action='http://www.api.com/some-service-url'>" +
				"<input type='hidden' name='simpleAttr' value='a'></input>" +
				"<input type='hidden' name='arrayAttr' value='b'></input>" +
				"<input type='hidden' name='arrayAttr' value='c'></input>" +
				"<input type='hidden' name='object.simpleAttr' value='a'></input>" +
				"<input type='hidden' name='object.arrayAttr' value='b'></input>" +
				"<input type='hidden' name='object.arrayAttr' value='c'></input>" +
				"<input type='hidden' name='object.nestedObject.simpleAttr' value='a'></input>" +
				"<input type='hidden' name='object.nestedObject.arrayAttr' value='b'></input>" +
				"<input type='hidden' name='object.nestedObject.arrayAttr' value='c'></input>" +
				"<input type='hidden' name='objectArray[0].simpleAttr' value='a'></input>" +
				"<input type='hidden' name='objectArray[0].arrayAttr' value='b'></input>" +
				"<input type='hidden' name='objectArray[0].arrayAttr' value='c'></input>" +
				"<input type='hidden' name='objectArray[1].simpleAttr' value='a'></input>" +
				"<input type='hidden' name='objectArray[1].arrayAttr' value='b'></input>" +
				"<input type='hidden' name='objectArray[1].arrayAttr' value='c'></input>" +
			"</form>");
		jqForm.postJson();
		expect(spy.calledWith({
			type : "POST",
			url : "http://www.api.com/some-service-url",
			data : JSON.stringify(jqForm.toJson()),
			dataType : "json",
			processData : false,
			contentType : "application/json; charset=UTF-8"
		})).toBeTruthy();
		jQuery.ajax.restore();		
	});
	
	it("uses window.location.href on forms without action", function() {
		var ajaxSpy = sinon.spy(jQuery, "ajax");
		var jqForm = $(
			"<form>" +
				"<input type='hidden' name='simpleAttr' value='a'></input>" +
			"</form>");
		var json = JSON.stringify(jqForm.toJson());
		var url = window.location + "";
		jqForm.postJson();
		expect(ajaxSpy.calledWith({
			type : "POST",
			url : url,
			data : json,
			dataType : "json",
			processData : false,
			contentType : "application/json; charset=UTF-8"
		})).toBeTruthy();
		jqForm.putJson();
		expect(ajaxSpy.calledWith({
			type : "PUT",
			url : url,
			data : json,
			dataType : "json",
			processData : false,
			contentType : "application/json; charset=UTF-8"
		})).toBeTruthy();
		jQuery.ajax.restore();		
	});
	
});