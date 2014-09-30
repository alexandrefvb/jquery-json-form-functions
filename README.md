jquery-json-form-functions
==========================

An extension of jQuery with functions that simplifies JSON ajax requests using html forms.

This script adds three utility functions to jQuery to convert form data to json objects and do ajax requests to POST or PUT the converted form data to http services.

This project was created to simplify the integration of our jQuery enabled websites to consume REST webservices developed with Spring MVC, but can be used with any webservice that consumes JSON on request body and produces JSON on response body.  

### Dependencies

- [jQuery](http://jquery.com/) (tested with jquery-1.11.1.min.js)
- [json2](https://github.com/douglascrockford/JSON-js) polyfill for use in IE < 8.

### Why to use this library:
- It uses jQuery.serializeArray() to get form data in JSON format, so all W3C rules are followed and serialization works in any browser.
- The JSON returned by jQuery.serializeArray() (which is flat) is manipulated to support nested objects.
- It is compatible with most common REST webservice frameworks that consumes and produces JSON.
- It is very small (minified version has only **1 kb**)
- It is fully tested with jasmine and has **100%** of unit test coverage. (see [istambul report](http://alexandrefvb.github.io/jquery-json-form-functions/0.2.0/report/index.html))
  
### Usage:

[Click here to play with an example page](http://alexandrefvb.github.io/jquery-json-form-functions/0.2.0/example.html)

#####Import script on html (after jquery script):
```html
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="jquery-json-form-functions-0.2.0.min.js"></script>
```

#####Use jQuery selector to select form and call library methods:
```javascript
// returns form data converted to json based on input names.
$(form-selector).toJson(); 

// converts form data to JSON based on input names and do a POST  
// ajax request to the url configured in action form attribute. 
// The return will be the jQuery ajax promise.
$(form-selector).postJson().done(doneHandler).fail(failHandler);
 

// converts form data to JSON based on input names and do a PUT  
// ajax request to the url configured in action form attribute. 
// The return will be the jQuery ajax promise.
$(form-selector).putJson().done(doneHandler).fail(failHandler);
```
  
### Conversion rules:

  - All inputs on form that have a name attribute will be added to the JSON.
  - The name attribute defines which property of JSON will be populated.
  - Nested objects with multiple levels of attributes can be created using dots "." to specify nested properties.
  - Arrays of values can be created using the notation "[]" on name attribute.
  - To create arrays of objects indexes must be used to determine which object of list will hold input value.
  - Inputs with empty values are ommitted on JSON.
  - For checkboxes and radio buttons just "checked" values are added to JSON.
    

### Full example:

#####HTML form:

```html
<form id="aForm" action="http://some-service-url">   
	<input type="hidden" name="simpleAttribute" value="123"/>

	<input type="text" name="arrayAttribute[]" value="a"/>
	<input type="text" name="arrayAttribute[]" value="b"/>
  
	<input type="text" name="object.simpleAtrtribute" value="456"/>
	<input type="text" name="object.arrayAttribute[]" value="c"/>
	<input type="text" name="object.arrayAttribute[]" value="d"/>
	<input type="text" name="object.nestedObject.simpleAtrtribute" value="789"/>  
	<input type="text" name="object.nestedObject.arrayAttribute[]" value="e"/>
	<input type="text" name="object.nestedObject.arrayAttribute[]" value="f"/>
      
	<input type="text" name="objectList[0].simpleAtrtribute" value="101112"/>
    <input type="text" name="objectList[0].arrayAttribute[]" value="g"/>
    <input type="text" name="objectList[0].arrayAttribute[]" value="h"/>
	<input type="text" name="objectList[1].simpleAtrtribute" value="131515"/>
    <input type="text" name="objectList[1].arrayAttribute[]" value="i"/>
	<input type="text" name="objectList[1].arrayAttribute[]" value="j"/>

    <input type="hidden" name="ignoredAttribute" value=""/>

    <input type="hidden" name="singleValueArrayAttribute[]" value="x"/>

    <input type="checkbox" name="checkboxField[]" value="Value 1" checked="checked"/> 
    <input type="checkbox" name="checkboxField[]" value="Value 2" /> 
    <input type="checkbox" name="checkboxField[]" value="Value 3" />
    
    <input type="radio" name="radioField" value="Value 1" checked="checked"/>
    <input type="radio" name="radioField" value="Value 2"/>
    <input type="radio" name="radioField" value="Value 3"/> 
    
    <select name="selectField">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C" selected="selected">C</option>
    </select>
    
    <select name="multipleSelectField[]" multiple="multiple">
        <option value="A" selected="selected">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
    </select>        
</form>
```

#####Converting to JSON:
    
```javascript
$("#aform").toJson(); 
```
  
The result will be:
```javascript
{ 
	"simpleAttribute": "123",
	"arrayAttribute": ["a", "b"],
	"object": {
		"simpleAttribute": "456",
		"arrayAttribute": ["c", "d"],
		"nestedObject": {
			"simpleAttribute": "789",
			"arrayAttribute": ["e", "f"]
		} 
	}
	"objectList": [
		{
			"simpleAttribute": "101112",
			"arrayAttribute": ["g", "h"],
		},  
		{
			"simpleAttribute": "131515",
			"arrayAttribute": ["i", "j"],
		}  
	],
	"singleValueArrayAttribute": ["x"],
	"checkboxField": ["Value 1"],
	"radioField": "Value 1",
    "selectField": "C",
    "multipleSelectField": [ "A" ]   		
}
```
  
#####POST JSON to action url:
   
```javascript
$("#aform").postJson();
```
   
#####PUT JSON to action url:

```javascript
$("#aform").putJson();
```

### How to build latest stable version from source:
forcedArrayAttribute
Lastest production release is allways on master branch.

You will need git, node.js and grunt to build it from the source:

	$ git clone https://github.com/alexandrefvb/jquery-json-form-functions.git
	$ cd jquery-json-form-functions
	$ npm install
	$ grunt

After doing this a minified version of script is generated on: 

**jquery-json-form-functions/dist/0.2.0/jquery-json-form-functions-0.2.0.min.js**

An example html using the functions is generated on:

**jquery-json-form-functions/dist/0.2.0/example.html**


----
######Version history
**0.2.0** - 30 Sep 2014
 
 - Syntax highlight on documentation.
 - Change of simple arrays name syntax (introduction of [] notation).
 - Example page scrolls to show toJson() result.
 
**0.1.1** - 29 Sep 2014 

- Improved usage documentation.
- Added build information to project documentation.
- Added dependencies information to project documentation.
 
**0.1.0** - 29 Sep 2014 

- Initial release with fully tested code (using jasmine). 

