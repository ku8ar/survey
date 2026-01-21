export const surveyJson = {
  title: "Demo",
  pages: [
    {
      name: "p1",
      elements: [
        { type: "text", name: "firstName", title: "First name", isRequired: true },
        { type: "text", name: "email", title: "Email", inputType: "email", isRequired: true },
        {
          type: "boolean",
          name: "hasCar",
          title: "Do you have a car?",
          labelTrue: "Yes",
          labelFalse: "No",
        },
        {
          type: "text",
          name: "carModel",
          title: "Car model",
          visibleIf: "{hasCar} = true",
          isRequired: true,
        },
      ],
    },
  ],
};
