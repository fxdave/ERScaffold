# Attributes

## format

**AttributeName** : type(typeOptions) = defaultValue

The attribute will be required if no default value is given, you also can give null as default value.



## Types

### string
Description: short texts
input: `<input type="text">`

### email
Description: for email
input: `<input type="email">`
output: mailto link

### phone
Description: for phone numbers
input: `<input type="text">` with format checks
format: +COUTNRY_CODE SERVICE XXX XXXX

### text
Description: unlimited string
input: `<textarea></textarea>`


### html
Description: unlimited string
input: `<textarea></textarea>` with tinyMCE
output: unescaped text

### integer(step=STEP, min=MIN, max=MAX, unit=UNIT)
Description: int | float | double
Defaults:
 - STEP = 1
 - MIN = undefined
 - MAX = undefined
 - UNIT = ""

input: `<input type="number" step="STEP" [min="MIN"] [max="MAX"]> UNIT`

### float(step=STEP, min=MIN, max=MAX, unit=UNIT)
Description: int | float | double
Defaults:
 - STEP = "any"
 - MIN = undefined
 - MAX = undefined
 - UNIT = ""

input: `<input type="number" step="STEP" [min="MIN"] [max="MAX"]> UNIT`

### double(step=STEP, min=MIN, max=MAX, unit=UNIT)
Defaults:
 - STEP = "any"
 - MIN = undefined
 - MAX = undefined
 - UNIT = ""

input: `<input type="number" step="STEP" [min="MIN"] [max="MAX"]> UNIT`

### money = double(step=STEP, min=MIN, max=MAX)
Defaults:
 - STEP = "0.001"
 - MIN = undefined
 - MAX = undefined
 - UNIT = "$"

### boolean
input: `<input type="checkbox">`

### set('val1', 'val2', ...)
input: `<input type="checkbox"> val1, <input type="checkbox"> val2, ...`

### enum('val1', 'val2', ...)
input: `<select><option>val1</option> <option>val2</option> ... </select>`

### date(step=STEP, min=MIN, max=MAX)
input: `<input type="date" [step="STEP"] [min="MIN"] [max="MAX"]>`

### time(step=STEP, min=MIN, max=MAX)
input: `<input type="time" [step="STEP"] [min="MIN"] [max="MAX"]>`

### datetime(step=STEP, min=MIN, max=MAX)
input: `<input type="datetime" [step="STEP"] [min="MIN"] [max="MAX"]>`

### image
suggestion: In db it would be stored by a string which is the url to the image.
input: file upload with image drop and image paste support
output: `<img>`

### audio
suggestion: In db it would be stored by a string which is the url to the audio.
input: file upload
output: a HTML5 player

### video
suggestion: In db it would be stored by a string which is the url to the video.
input: file upload
output: a HTML6 player


