const serverURL = "https://project-noticine-backend.vercel.app";

async function getAllTemplate() {
  url = `${serverURL}/getAllTemplates`;
  data = await fetch(url).then((response) => response.json());
  return data;
}

async function getTemplate() {
  let id = document.getElementById("medicine-id").value;
  console.log(isNaN(id));
  if (isNaN(id)) {
    return;
  }
  data = await getId(id);
  console.log(data);
}
async function getId(id) {
  url = `${serverURL}/getTemplate/${id}`;
  return await fetch(url).then((response) => response.json());
}

async function createTemplate({ Name, Description, medications }) {
  url = `${serverURL}/saveTemplate`;

  const template = {
    Name: "Paracetamol",
    Description: "Paracetamol template",
    medications: [
      {
        Name: "Paracetamol",
        Unit: "pill",
        times: [
          { time: "08:00", dose: 1 },
          { time: "12:00", dose: 1 },
          { time: "18:00", dose: 1 },
          { time: "22:00", dose: 1 },
        ],
        frequency: 1,
        duration: 15,
        note: "Take with food",
      },
    ],
  };

  if (Name) {
    template.Name = Name;
  }
  if (Description) {
    template.Description = Description;
  }
  if (medications) {
    template.medications = medications;
  }

  data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(template),
  }).then((response) => response.json());
  return data;
}

async function editTemplate() {
  let id = document.getElementById("medicine-id").value;
  console.log(isNaN(id));
  if (isNaN(id)) {
    return;
  }
  data = await editTemplateId(id);
  console.log(data);
}

async function editTemplateId(id, template) {
  url = `${serverURL}/editTemplate/${id}`;

  // const template = {
  //   Name: "Paracetamol3",
  //   Description: "Paracetamol template",
  //   medications: [
  //     {
  //       Name: "Paracetamol2",
  //       Unit: "pill",
  //       times: [
  //         { time: "08:00", dose: 1 },
  //         { time: "12:00", dose: 1 },
  //         { time: "18:00", dose: 1 },
  //         { time: "22:00", dose: 1 },
  //       ],
  //       frequency: 1,
  //       duration: 15,
  //       note: "Take with food",
  //     },
  //   ],
  // };

  data = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(template),
  }).then((response) => response.json());
  return data;
}