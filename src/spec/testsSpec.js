describe('Unit tests', function() {

	it('check if simple attributes are serialized according to the ruless', function() {
		var json = $(
			'<form>' +
				'<input type="hidden" name="simpleInputHidden" value="1"></input>'+
				'<input type="text" name="simpleInputText" value="2"></input>'+
				'<input type="checkbox" name="simpleUncheckedCheckbox" value="3"></input>'+
				'<input type="checkbox" name="simpleCheckedCheckbox" value="4" checked></input>'+
				'<input type="radio" name="simpleUncheckedRadio" value="5"></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="6" checked></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="7"></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="8"></input>'+
				'<input type="text" name="simpleInputWithEmptyValue" value=""></input>'+
				'<select name="simpleSelectField">' +
					'<option value="A">A</option>'+
					'<option value="B">B</option>'+
					'<option value="C" selected="selected">C</option>'+
				'</select>'+	
			'</form>').toJson();
		expect(json.simpleInputHidden).toBe('1');
		expect(json.simpleInputText).toBe('2');
		expect(json.simpleUncheckedCheckbox).toBe(undefined);
		expect(json.simpleCheckedCheckbox).toBe('4');
		expect(json.simpleUncheckedRadio).toBe(undefined);
		expect(json.simpleCheckedRadio).toBe('6');
		expect(json.simpleInputWithEmptyValue).toBe(undefined);
		expect(json.simpleSelectField).toBe('C');
	});
	
	it('check if simple attributes with json-form-array class are serialized as arrays', function() {
		var json = $(
			'<form>' +
				'<input type="hidden" name="simpleInputHidden" value="1" class="json-form-array"></input>'+
				'<input type="text" name="simpleInputText" value="2" class="json-form-array"></input>'+
				'<input type="checkbox" name="simpleUncheckedCheckbox" value="3" class="json-form-array"></input>'+
				'<input type="checkbox" name="simpleCheckedCheckbox" value="4" checked  class="json-form-array"></input>'+
				'<input type="radio" name="simpleUncheckedRadio" value="5"  class="json-form-array"></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="6" checked  class="json-form-array"></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="7" class="json-form-array"></input>'+
				'<input type="radio" name="simpleCheckedRadio" value="8" class="json-form-array"></input>'+
				'<input type="text" name="simpleInputWithEmptyValue" value="" class="json-form-array"></input>'+
				'<select name="simpleSelectField" class="json-form-array">' +
					'<option value="A">A</option>'+
					'<option value="B">B</option>'+
					'<option value="C" selected="selected">C</option>'+
				'</select>'+	
			'</form>').toJson();
		expect(json.simpleInputHidden).toEqual(['1']);
		expect(json.simpleInputText).toEqual(['2']);
		expect(json.simpleUncheckedCheckbox).toBe(undefined);
		expect(json.simpleCheckedCheckbox).toEqual(['4']);
		expect(json.simpleUncheckedRadio).toBe(undefined);
		expect(json.simpleCheckedRadio).toEqual(['6']);
		expect(json.simpleInputWithEmptyValue).toBe(undefined);
		expect(json.simpleSelectField).toEqual(['C']);
	});

	it('check if inputs with the same name are serialized as arrays', function() {
		var json = $(
			'<form>' +
				'<input type="hidden" name="simpleInputHidden" value="1"></input>'+
				'<input type="hidden" name="simpleInputHidden" value="2"></input>'+
			'</form>').toJson();
		expect(json.simpleInputHidden).toEqual(['1','2']);
	});

	
});