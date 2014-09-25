jquery-json-form-functions
==========================

A extension of jQuery with functions that simplifies JSON ajax requests using html forms.

This script adds three utility functions to jQuery to convert form data to json objects and do ajax requests to POST or PUT the converted form data to http services.
  
Usage:
  
$(form-selector).toJson() - return form data converted to json based on input names.
$(form-selector).postJson() - converts form data to json based on input names and post the json to the url configured in action attribute. The return will be the jQuery ajax promise.
$(form-selector).putJson() - converts form data to json based on input names and post the json to the url configured in action attribute. The return will be the jQuery ajax promise.

Conversion rules:

  - All inputs on form that have a name attribute will be added to the json.
  - The name attribute defines which property of json will be populated.
  - Nested objects with multiple levels of attributes can be created using dots "." to specify nested properties.
  - Arrays of values can be created using the same name in more than one input on same form.
  - To create arrays of objects indexes must be used to determine which object of list will hold input value.
  

Full example:
  
  <form id="aForm" action="http://some-service-url">
      <input type="hidden" name="simpleAttribute" value="123"/>
 
      <input type="text" name="listAttribute" value="a"/>
      <input type="text" name="listAttribute" value="b"/>
      
      <input type="text" name="object.simpleAtrtribute" value="456"/>
      <input type="text" name="object.listAttribute" value="c"/>
      <input type="text" name="object.listAttribute" value="d"/>
      <input type="text" name="object.nestedObject.simpleAtrtribute" value="789"/>
      <input type="text" name="object.nestedObject.listAttribute" value="e"/>
      <input type="text" name="object.nestedObject.listAttribute" value="f"/>
      
      <input type="text" name="objectList[0].simpleAtrtribute" value="101112"/>
      <input type="text" name="objectList[0].listAttribute" value="g"/>
      <input type="text" name="objectList[0].listAttribute" value="h"/>
      <input type="text" name="objectList[1].simpleAtrtribute" value="131515"/>
      <input type="text" name="objectList[1].listAttribute" value="i"/>
      <input type="text" name="objectList[1].listAttribute" value="j"/>
           
  </form>
  
  $('#aform').toJson(); will convert the above form to the following JSON:
  
  	{ 
  		"simpleAttribute": "123",
  		"listAttribute": ["a", "b"],
  		"object": {
  			"simpleAttribute": "456",
  			"listAttribute": ["c", "d"],
 			"nestedObject": {
  				"simpleAttribute": "789",
  				"listAttribute": ["e", "f"]
  			} 
  		}
  		"objectList": [
  			{
  				"simpleAttribute": "101112",
  				"listAttribute": ["g", "h"],
  			},  
  			{
  				"simpleAttribute": "131515",
  				"listAttribute": ["i", "j"],
  			}  
  		]
  	}
  
   To do a POST request to form action with above JSON on request body you can execute: 
   
   	$('#aform').postJson();
   
   To do a PUT request to form action with above JSON on request body you can execute:
    
   	$('#aform').putJson();