# SurveyJS Headless --- Copilot Ultra Guide

Headless SurveyJS.

-   **JSON** = structure + logic\
-   **React** = rendering\
-   **renderAs** = layout\
-   **x-props** = direct props for `wcs-styleguide` components

------------------------------------------------------------------------

## Root

``` json
{ "elements": [] }
```

------------------------------------------------------------------------

## Base Field

``` json
{
  "type": "text",
  "name": "field"
}
```

  Key    Required   Description
  ------ ---------- -------------
  type   yes        Field type
  name   yes        Result key

------------------------------------------------------------------------

## Panel (Layout)

``` json
{
  "type": "panel",
  "renderAs": "Card",
  "elements": []
}
```

Panel = layout container.

------------------------------------------------------------------------

## Supported Types

  Type           Result       Description
  -------------- ------------ -----------------------
  text           string       Input
  comment        string       Textarea
  boolean        boolean      True / False
  file           file\[\]     Upload
  radiogroup     string       Single select
  dropdown       string       Single select
  checkbox       string\[\]   Multi select
  tagbox         string\[\]   Multi select + search
  expression     any          Computed display
  multipletext   object       Grouped inputs
  panel          ---          Container

------------------------------------------------------------------------

## Core Properties

  Property                Meaning
  ----------------------- -----------------------------
  isRequired              Mandatory
  requiredIf              Conditional mandatory
  visibleIf               Show / hide
  enableIf                Disabled (false = disabled)
  readOnly                Read-only (NOT disabled)
  choices                 Static options
  choicesFromExpression   Dynamic options from data
  validators              Validation rules
  x-props                 UI props

------------------------------------------------------------------------

## Expressions

Reference:

    {field}

Operators:

  Type      Operators
  --------- --------------------
  compare   = != \> \< \>= \<=
  logic     and · or · not
  array     contains

Rules: - **string** → use `=` - **array** → use `contains`

Examples:

    {age} >= 18
    {country} = 'PL'
    {roles} contains 'admin'
    {a} = 'x' and {b} != 'y'
    not {isAdmin}

------------------------------------------------------------------------

## calculatedValues

Computed state.

``` json
{
  "calculatedValues": [
    { "name": "total", "expression": "{price} * {qty}" }
  ]
}
```

------------------------------------------------------------------------

## Triggers

Auto actions.

``` json
{
  "triggers": [
    {
      "type": "setvalue",
      "expression": "{age} < 18",
      "setToName": "minor",
      "setValue": true
    }
  ]
}
```

  Type            Action
  --------------- -----------------
  setvalue        Set value
  copyvalue       Copy value
  runexpression   Run expression
  skip            Skip to element

------------------------------------------------------------------------

## Validators

``` json
"validators": [
  { "type": "regex", "regex": "pattern" }
]
```

  Category   Validators
  ---------- ----------------------
  text       regex, expression
  number     minValue, maxValue
  string     minLength, maxLength
  array      minCount, maxCount

------------------------------------------------------------------------

## x-props

``` json
"x-props": { "size": "large" }
```

Passed **directly** to `wcs-styleguide`.\
Ignored by SurveyJS logic.

------------------------------------------------------------------------

## Minimal Template

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

## Mental Model

  Concept            Meaning
  ------------------ -------------
  Survey             Tree
  Panel              Layout
  visibleIf          Show / hide
  enableIf           Disabled
  readOnly           Read-only
  contains           Arrays
  calculatedValues   Computed
  triggers           Auto logic
  validators         Validation
