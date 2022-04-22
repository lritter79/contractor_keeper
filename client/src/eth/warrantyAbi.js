const warrantyAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_warrantyExpirationDate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_warrantyExpires",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_numberOfDaysToCorrect",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_workCompleted",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_projectName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_transferable",
          "type": "bool"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "partyAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "streetAddressLine1",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "streetAddressLine2",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "city",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "state",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "postalCode",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.Location",
              "name": "physicalLocation",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneMobile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneHome",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.ContactInformation",
              "name": "contactInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Party",
          "name": "_warrantyProvider",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "partyAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "streetAddressLine1",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "streetAddressLine2",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "city",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "state",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "postalCode",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.Location",
              "name": "physicalLocation",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneMobile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneHome",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.ContactInformation",
              "name": "contactInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Party",
          "name": "_warrantyHolder",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "streetAddressLine1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "streetAddressLine2",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "state",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "postalCode",
              "type": "string"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Location",
          "name": "_location",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "partyAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "streetAddressLine1",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "streetAddressLine2",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "city",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "state",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "postalCode",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.Location",
              "name": "physicalLocation",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneMobile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneHome",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.ContactInformation",
              "name": "contactInfo",
              "type": "tuple"
            }
          ],
          "indexed": false,
          "internalType": "struct BaseWarrantySmartContract.Party",
          "name": "_newOwner",
          "type": "tuple"
        }
      ],
      "name": "CurrentHolderChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "dateOfWorkCompletion",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "descriptionOfProject",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isTransferable",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "locationOfWork",
      "outputs": [
        {
          "internalType": "string",
          "name": "streetAddressLine1",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "streetAddressLine2",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "state",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "postalCode",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfDaysToCorrect",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "projectName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stateOfWarranty",
      "outputs": [
        {
          "internalType": "enum BaseWarrantySmartContract.WarrantyState",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warrantyExpirationDate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warrantyExpires",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warrantyHolder",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "partyAddress",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "streetAddressLine1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "streetAddressLine2",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "state",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "postalCode",
              "type": "string"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Location",
          "name": "physicalLocation",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "phoneMobile",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "phoneHome",
              "type": "string"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.ContactInformation",
          "name": "contactInfo",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warrantyProvider",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "partyAddress",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "streetAddressLine1",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "streetAddressLine2",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "state",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "postalCode",
              "type": "string"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Location",
          "name": "physicalLocation",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "phoneMobile",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "phoneHome",
              "type": "string"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.ContactInformation",
          "name": "contactInfo",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warrantyStartDate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkIfExpired",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDaysUntilExpiration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLocationAsString",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "partyAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "streetAddressLine1",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "streetAddressLine2",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "city",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "state",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "postalCode",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.Location",
              "name": "physicalLocation",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneMobile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneHome",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.ContactInformation",
              "name": "contactInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Party",
          "name": "newParty",
          "type": "tuple"
        }
      ],
      "name": "transferWarrantyToAnotherParty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPreviousHolders",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "partyAddress",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "streetAddressLine1",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "streetAddressLine2",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "city",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "state",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "postalCode",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.Location",
              "name": "physicalLocation",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneMobile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "phoneHome",
                  "type": "string"
                }
              ],
              "internalType": "struct BaseWarrantySmartContract.ContactInformation",
              "name": "contactInfo",
              "type": "tuple"
            }
          ],
          "internalType": "struct BaseWarrantySmartContract.Party[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
export default warrantyAbi;