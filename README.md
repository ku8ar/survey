# SurveyJS Headless --- Copilot Ultra Guide

Headless SurveyJS.

-   **JSON** = structure + logic
-   **React** = rendering
-   **renderAs** = layout
-   **x-props** = direct props for `wcs-styleguide`

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

------------------------------------------------------------------------

## Supported Types

  Type           Result
  -------------- ------------
  text           string
  comment        string
  boolean        boolean
  file           file\[\]
  radiogroup     string
  dropdown       string
  checkbox       string\[\]
  tagbox         string\[\]
  expression     computed
  multipletext   object
  panel          container

------------------------------------------------------------------------

## Core Properties

  Property                Purpose
  ----------------------- -----------------------------
  isRequired              Mandatory
  requiredIf              Conditional required
  visibleIf               Show / hide
  enableIf                Disabled (false = disabled)
  readOnly                Read-only (NOT disabled)
  choices                 Static options
  choicesFromExpression   Dynamic options
  validators              Validation
  x-props                 UI props

------------------------------------------------------------------------

## Expression Rules

Reference:

    {field}

Operators:

  Category   Operators
  ---------- --------------------
  Compare    = != \> \< \>= \<=
  Logic      and, or, not
  Array      contains

Rules:

-   string → use `=`
-   array → use `contains`

Example:

    {roles} contains 'admin'

------------------------------------------------------------------------

## Minimal Field Template

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
