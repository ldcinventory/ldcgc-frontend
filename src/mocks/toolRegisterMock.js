const toolRegisterMock = [
  {
    id: 0,
    inRegistration: null,
    outRegistration: "2024-02-23T11:04:53.386Z",
    tool: {
      id: 0,
      barcode: "string",
      category: {
        id: 0,
        name: "string",
        locked: true,
        parent: {
          id: 0,
          name: "string",
          locked: true,
          parent: "string",
          categories: [
            "string"
          ]
        },
        categories: [
          "string"
        ]
      },
      brand: {
        id: 0,
        name: "string",
        locked: true,
        parent: {
          id: 0,
          name: "string",
          locked: true,
          parent: "string",
          categories: [
            "string"
          ]
        },
        categories: [
          "string"
        ]
      },
      name: "Taladradora eléctrica",
      model: "string",
      description: "string",
      urlImages: "string",
      maintenancePeriod: 0,
      maintenanceTime: "DAYS",
      lastMaintenance: "2024-02-23T11:04:53.386Z",
      status: "AVAILABLE",
      location: {
        id: 0,
        name: "string",
        description: "string",
        url: "string",
        parent: "string",
        locations: [
          "string"
        ]
      },
      group: {
        id: 0,
        name: "string",
        description: "string",
        urlImage: "string",
        phoneNumber: "string",
        location: {
          id: 0,
          name: "string",
          description: "string",
          url: "string",
          parent: "string",
          locations: [
            "string"
          ]
        }
      }
    },
    volunteer: {
      id: 0,
      name: "Pepe",
      lastName: "Perez",
      builderAssistantId: "string",
      isActive: true,
      availability: {
        volunteerId: 0,
        availabilityDays: [
          "MONDAY"
        ]
      },
      absences: [
        {
          id: 0,
          dateFrom: "2024-02-23",
          dateTo: "2024-02-23",
          volunteerId: 0
        }
      ],
      groupDto: {
        id: 0,
        name: "string",
        description: "string",
        urlImage: "string",
        phoneNumber: "string",
        location: {
          id: 0,
          name: "string",
          description: "string",
          url: "string",
          parent: "string",
          locations: [
            "string"
          ]
        }
      }
    }
  },
  {
    id: 1,
    inRegistration: "2024-02-23T11:04:53.386Z",
    outRegistration: "2024-02-23T11:04:53.386Z",
    tool: {
      id: 0,
      barcode: "string",
      category: {
        id: 0,
        name: "string",
        locked: true,
        parent: {
          id: 0,
          name: "string",
          locked: true,
          parent: "string",
          categories: [
            "string"
          ]
        },
        categories: [
          "string"
        ]
      },
      brand: {
        id: 0,
        name: "string",
        locked: true,
        parent: {
          id: 0,
          name: "string",
          locked: true,
          parent: "string",
          categories: [
            "string"
          ]
        },
        categories: [
          "string"
        ]
      },
      name: "Martillo",
      model: "string",
      description: "string",
      urlImages: "string",
      maintenancePeriod: 0,
      maintenanceTime: "DAYS",
      lastMaintenance: "2024-02-23T11:04:53.386Z",
      status: "AVAILABLE",
      location: {
        id: 0,
        name: "string",
        description: "string",
        url: "string",
        parent: "string",
        locations: [
          "string"
        ]
      },
      group: {
        id: 0,
        name: "string",
        description: "string",
        urlImage: "string",
        phoneNumber: "string",
        location: {
          id: 0,
          name: "string",
          description: "string",
          url: "string",
          parent: "string",
          locations: [
            "string"
          ]
        }
      }
    },
    volunteer: {
      id: 0,
      name: "Eleazar",
      lastName: "Rivera",
      builderAssistantId: "string",
      isActive: true,
      availability: {
        volunteerId: 0,
        availabilityDays: [
          "MONDAY"
        ]
      },
      absences: [
        {
          id: 0,
          dateFrom: "2024-02-23",
          dateTo: "2024-02-23",
          volunteerId: 0
        }
      ],
      groupDto: {
        id: 0,
        name: "string",
        description: "string",
        urlImage: "string",
        phoneNumber: "string",
        location: {
          id: 0,
          name: "string",
          description: "string",
          url: "string",
          parent: "string",
          locations: [
            "string"
          ]
        }
      }
    }
  }
];

export default function getToolRegister() {
  return toolRegisterMock
}