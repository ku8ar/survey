# SurveyJS (Headless) --- Copilot Guide

Headless SurveyJS. JSON = structure + logic. React = rendering.
`renderAs` = layout. `x-props` = direct props to wcs-styleguide
components.

------------------------------------------------------------------------

# Root

``` json
{ "elements": [] }
```

------------------------------------------------------------------------

# Element Base

``` json
{
  "type": "text",
  "name": "fieldName",
  "title": "Label"
}
```

Required keys: - type - name

------------------------------------------------------------------------

# Panel

``` json
{
  "type": "panel",
  "renderAs": "Card",
  "elements": []
}
```

Panel = layout container.

------------------------------------------------------------------------

# Types

text → input\
comment → textarea\
boolean → true/false\
file → upload\
radiogroup → single (string)\
dropdown → single (string)\
checkbox → multi (array)\
tagbox → multi searchable (array)\
expression → computed display\
multipletext → grouped inputs

------------------------------------------------------------------------

# Core Properties

isRequired → mandatory\
requiredIf → conditional required\
visibleIf → show/hide\
enableIf → disabled (false = disabled)\
readOnly → read-only (NOT disabled)\
choices → static options\
choicesFromExpression → dynamic options from data\
validators → validation rules

------------------------------------------------------------------------

# Expressions

Reference:

    {fieldName}

Operators:

    = != > < >= <=
    and or not
    contains

Rules: - Single value → use `=` - Array value → use `contains`

Examples:

    {age} >= 18
    {country} = 'PL'
    {roles} contains 'admin'
    {a} = 'x' and {b} != 'y'
    not {isAdmin}

------------------------------------------------------------------------

# calculatedValues

Computed state.

``` json
{
  "calculatedValues": [
    {
      "name": "total",
      "expression": "{price} * {qty}",
      "includeIntoResult": true
    }
  ]
}
```

------------------------------------------------------------------------

# Triggers

Auto actions.

``` json
{
  "triggers": [
    {
      "type": "setvalue",
      "expression": "{age} < 18",
      "setToName": "isMinor",
      "setValue": true
    }
  ]
}
```

Types: - setvalue - copyvalue - runexpression - skip

------------------------------------------------------------------------

# Validators

``` json
"validators": [
  { "type": "regex", "regex": "pattern" }
]
```

Supported: - regex - expression - minValue / maxValue - minLength /
maxLength - minCount / maxCount

------------------------------------------------------------------------

# x-props

``` json
"x-props": { "size": "large" }
```

Passed directly to wcs-styleguide. Ignored by SurveyJS logic.

------------------------------------------------------------------------

# Minimal Field Template

``` json
{
  "type": "",
  "name": "",
  "isRequired": false,
  "visibleIf": "",
  "enableIf": "",
  "readOnly": false,
  "choices": [],
  "choicesFromExpression": "",
  "validators": [],
  "x-props": {}
}
```

------------------------------------------------------------------------

# Mental Model

Survey = tree\
Panel = layout\
visibleIf = show/hide\
enableIf = disabled\
readOnly ≠ disabled\
contains = arrays\
calculatedValues = computed\
triggers = auto logic\
validators = validation
