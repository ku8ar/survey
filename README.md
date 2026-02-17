# SurveyJS Headless --- Copilot Ultra Guide

Headless SurveyJS.

JSON = structure + logic\
React = rendering\
renderAs = layout\
x-props = direct props for wcs-styleguide

------------------------------------------------------------------------

## Mental Model

Survey → Tree\
Panel → Layout container\
visibleIf → Show / hide\
enableIf → Disabled\
readOnly → Read-only (NOT disabled)\
contains → For arrays\
calculatedValues → Computed state\
triggers → Auto logic\
validators → Validation rules

------------------------------------------------------------------------

## Supported Types

text → string\
comment → string (textarea)\
boolean → boolean\
file → file\[\]\
radiogroup → string (single select)\
dropdown → string (single select)\
checkbox → string\[\] (multi select)\
tagbox → string\[\] (multi + search)\
expression → computed display\
multipletext → object (grouped fields)\
panel → container

------------------------------------------------------------------------

## Core Properties

isRequired → Mandatory\
requiredIf → Conditional mandatory\
visibleIf → Show / hide\
enableIf → Disabled (false = disabled)\
readOnly → Read-only (NOT disabled)\
choices → Static options\
choicesFromExpression → Dynamic options\
validators → Validation rules\
x-props → UI props (passed to wcs-styleguide)

------------------------------------------------------------------------

## Expression Rules

Reference another field:

    {field}

Operators:

Compare:

    = != > < >= <=

Logic:

    and or not

Array:

    contains

Rules:

-   string value → use `=`
-   array value → use `contains`

Example:

    {roles} contains 'admin'
    {age} >= 18 and not {isMinor}

------------------------------------------------------------------------

## calculatedValues

    {
      "calculatedValues": [
        { "name": "total", "expression": "{price} * {qty}" }
      ]
    }

------------------------------------------------------------------------

## triggers

    {
      "triggers": [
        { "type": "setvalue", "expression": "{age}<18", "setToName": "minor", "setValue": true }
      ]
    }

Types: setvalue\
copyvalue\
runexpression\
skip

------------------------------------------------------------------------

## validators

    "validators": [
      { "type": "regex", "regex": "pattern" }
    ]

Supported: regex\
expression\
minValue / maxValue\
minLength / maxLength\
minCount / maxCount

------------------------------------------------------------------------

## Minimal Field Template

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
