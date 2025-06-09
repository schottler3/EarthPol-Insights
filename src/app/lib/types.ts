// @ts-check
import { Dispatch, SetStateAction } from "react"

export type Shop = {
  id: string
  owner: string
  item: string
  price: number
  type: string
  space: number
  stock: number
  location: {
      world: string
      x: number
      y: number
      z: number
  }
}

export type Nation = {
  allies: {
      name: string,
      uuid: string
  }[]
  board: string;
  capital: {
      name: string,
      uuid: string
  }
  coordinates: {
      spawn: {
          world: string,
          x: number,
          y: number,
          z: number,
          pitch: number,
          yaw: number
      }
  };
  enemies: {
      name: string,
      uuid: string
  }[]
  king: {
      name: string,
      uuid: string
  };
  name: string;
  ranks: {
      "co-leader": { name: string; uuid: string }[];
      minister: { name: string; uuid: string }[];
      recruiter: { name: string; uuid: string }[];
      soldier: { name: string; uuid: string }[];
      general: { name: string; uuid: string }[];
  };
  residents: {
      name: string,
      uuid: string
  }[]
  sanctioned: string[];
  stats: {
      numTownBlocks: number;
      numResidents: number;
      numTowns: number;
      numAllies: number;
      numEnemies: number;
      balance: number;
  };
  status: {
      isPublic: boolean;
      isOpen: boolean;
      isNeutral: boolean;
  };
  timestamps: {
      registered: number;
  };
  towns: {
      name: string,
      uuid: string
  }[]
  uuid: string;
}

export type Town = {
  name: string;
  uuid: string;
  board: string;
  founder: string;
  mayor: {
      name: string;
      uuid: string;
  };
  nation: {
      name: string,
      uuid: string
  };
  timestamps: {
      registered: number;
      joinedNationAt?: number;
      ruinedAt: number | null;
  };
  status: {
      isPublic: boolean;
      isOpen: boolean;
      isNeutral: boolean;
      isCapital: boolean;
      isOverClaimed: boolean;
      isRuined: boolean;
      isForSale: boolean;
      hasNation: boolean;
  };
  stats: {
      numTownBlocks: number;
      maxTownBlocks: number;
      bonusBlocks: number;
      numResidents: number;
      numTrusted: number;
      numOutlaws: number;
      balance: number;
  };
  perms: {
      build: boolean[];
      destroy: boolean[];
      switch: boolean[];
      itemUse: boolean[];
      flags: {
          pvp: boolean;
          explosion: boolean;
          fire: boolean;
          mobs: boolean;
      };
  };
  coordinates: {
      spawn: {
          world: string;
          x: number;
          y: number;
          z: number;
          pitch: number;
          yaw: number;
      };
      homeBlock: number[];
      townBlocks: number[][];
  };
  residents: { name: string; uuid: string }[];
  trusted: { name: string; uuid: string }[];
  outlaws: { name: string; uuid: string }[];
  quarters: string[];
  ranks: {
      assistant: { name: string; uuid: string }[];
      trusted: { name: string; uuid: string }[];
      recruiter: { name: string; uuid: string }[];
      sheriff: { name: string; uuid: string }[];
      guard: { name: string; uuid: string }[];
  };
}

export type Player = {
  name: string;
  uuid: string;
  title: string | null;
  surname: string | null;
  formattedName: string;
  about: string | null;
  town: {
      name: string;
      uuid: string;
  } | null;
  nation: {
      name: string;
      uuid: string;
  } | null;
  timestamps: {
      registered: number;
      joinedTownAt: number | null;
      lastOnline: number;
  };
  status: {
      isOnline: boolean;
      isNPC: boolean;
      isMayor: boolean;
      isKing: boolean;
      hasTown: boolean;
      hasNation: boolean;
  };
  stats: {
      balance: number;
      numFriends: number;
  };
  perms: {
      build: boolean[];
      destroy: boolean[];
      switch: boolean[];
      itemUse: boolean[];
      flags: {
          pvp: boolean;
          explosion: boolean;
          fire: boolean;
          mobs: boolean;
      };
  };
  ranks: {
      townRanks: string[];
      nationRanks: string[];
  };
  friends: {
      name: string;
      uuid: string;
  }[];
}

export type ReactStateHandler = Dispatch<SetStateAction<Nation | Town | null>>;

export function isTown(item: Town | Nation | null): item is Town {
  return item !== null && 'nation' in item;
}

export function isNation(item: Town | Nation | null): item is Nation {
  return item !== null && 'towns' in item;
}

export type Invite = {
    guildId: string;
    serverName: string;
    imageURL: string | null;
    inviteURL: string;
};

export const USINGFAKE = false;

export const FAKENATIONS = 
[
    {
        "name": "Cuba",
        "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
    },
    {
        "name": "Japan",
        "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
    },
    {
        "name": "Cascadia",
        "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
    }
]

export const FAKETOWNS = [
  // HAVANA - CUBA
  {
    "name": "Havana",
    "uuid": "ff50d039-669d-413e-84e0-18c3fd370ea3",
    "board": "VIVA LA LIBERTAD CARAJO",
    "founder": "5u5u",
    "mayor": {
      "name": "jhjhjh098k",
      "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
    },
    "nation": {
      "name": "Cuba",
      "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
    },
    "timestamps": {
      "registered": 1719014016273,
      "joinedNationAt": 1719176120296,
      "ruinedAt": null
    },
    "status": {
      "isPublic": true,
      "isOpen": false,
      "isNeutral": false,
      "isCapital": true,
      "isOverClaimed": true,
      "isRuined": false,
      "isForSale": false,
      "hasNation": true
    },
    "stats": {
      "numTownBlocks": 1020,
      "maxTownBlocks": 985,
      "bonusBlocks": 0,
      "numResidents": 14,
      "numTrusted": 9,
      "numOutlaws": 1,
      "balance": 81.8
    },
    "perms": {
      "build": [false, false, false, false],
      "destroy": [false, false, false, false],
      "switch": [false, false, false, false],
      "itemUse": [false, false, false, false],
      "flags": {
        "pvp": false,
        "explosion": false,
        "fire": false,
        "mobs": false
      }
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": -27417.0297,
        "y": 88.75061,
        "z": -7704.7489,
        "pitch": 41.038494,
        "yaw": -97.12445
      },
      "homeBlock": [-1714, -482],
      "townBlocks": [[-1745, -479]]
    },
    "residents": [
      {
        "name": "MrTytanic",
        "uuid": "d904bb76-412d-4f6a-af9f-13853b5fc614"
      },
      {
        "name": "jhjhjh098k",
        "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
      }
    ],
    "trusted": [
      {
        "name": "jhjhjh098k",
        "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
      },
      {
        "name": "Kauntar",
        "uuid": "67dbe22c-f9f8-4f27-a372-3ec9cf7c8ea8"
      }
    ],
    "outlaws": [
      {
        "name": "kreepsta",
        "uuid": "dc013ac2-23b9-4a56-84f2-74b6e559ffe1"
      }
    ],
    "quarters": [],
    "ranks": {
      "assistant": [
        {
          "name": "Ethnzz",
          "uuid": "bb045b6c-df6a-4f83-be01-5eb745273f72"
        }
      ],
      "trusted": [],
      "recruiter": [],
      "sheriff": [],
      "guard": []
    }
  },
  
  // TOKYO - JAPAN
  {
    "name": "Tokyo",
    "uuid": "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3",
    "board": "東京へようこそ | Imperial Capital",
    "founder": "SakuraSan",
    "mayor": {
      "name": "SakuraSan",
      "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2"
    },
    "nation": {
      "name": "Japan",
      "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
    },
    "timestamps": {
      "registered": 1719089462147,
      "joinedNationAt": 1719089562147,
      "ruinedAt": null
    },
    "status": {
      "isPublic": true,
      "isOpen": true,
      "isNeutral": false,
      "isCapital": true,
      "isOverClaimed": false,
      "isRuined": false,
      "isForSale": false,
      "hasNation": true
    },
    "stats": {
      "numTownBlocks": 742,
      "maxTownBlocks": 800,
      "bonusBlocks": 50,
      "numResidents": 8,
      "numTrusted": 3,
      "numOutlaws": 2,
      "balance": 157.25
    },
    "perms": {
      "build": [false, true, false, false],
      "destroy": [false, false, false, false],
      "switch": [false, true, false, false],
      "itemUse": [false, true, false, false],
      "flags": {
        "pvp": true,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": 14582.47,
        "y": 76.0,
        "z": -2471.92,
        "pitch": 12.45,
        "yaw": -178.32
      },
      "homeBlock": [912, -155],
      "townBlocks": [[912, -155], [913, -155], [912, -156]]
    },
    "residents": [
      {
        "name": "SakuraSan",
        "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2"
      },
      {
        "name": "Kitsune42",
        "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
      },
      {
        "name": "MountFuji",
        "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
      }
    ],
    "trusted": [
      {
        "name": "Kitsune42",
        "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
      },
      {
        "name": "NinjaWarrior",
        "uuid": "9f6ed37a-25bf-4a5c-8e75-2f783c42e05f"
      }
    ],
    "outlaws": [
      {
        "name": "MongoRaider",
        "uuid": "fa397e1d-54cb-4d27-9b1e-21c9dd502903"
      }
    ],
    "quarters": ["Imperial District", "Harbor District"],
    "ranks": {
      "assistant": [
        {
          "name": "Kitsune42",
          "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
        }
      ],
      "trusted": [
        {
          "name": "SamuraiCode",
          "uuid": "63aa4187-ed9b-4ac6-8074-0fd43cc2c4ea"
        }
      ],
      "recruiter": [
        {
          "name": "MountFuji",
          "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
        }
      ],
      "sheriff": [],
      "guard": [
        {
          "name": "ShogunWarrior",
          "uuid": "db1a7c93-8942-4b78-9c4d-f5379871a532"
        }
      ]
    }
  },
  
  // PORTLAND - CASCADIA
  {
    "name": "Portland",
    "uuid": "a7c891f6-7d3e-495b-b276-c4a7328ab9e1",
    "board": "City of Roses | Home of Cascadia",
    "founder": "PNWExplorer",
    "mayor": {
      "name": "PNWExplorer",
      "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
    },
    "nation": {
      "name": "Cascadia",
      "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
    },
    "timestamps": {
      "registered": 1719230614783,
      "joinedNationAt": 1719235614783,
      "ruinedAt": null
    },
    "status": {
      "isPublic": true,
      "isOpen": true,
      "isNeutral": true,
      "isCapital": true,
      "isOverClaimed": false,
      "isRuined": false,
      "isForSale": false,
      "hasNation": true
    },
    "stats": {
      "numTownBlocks": 312,
      "maxTownBlocks": 350,
      "bonusBlocks": 25,
      "numResidents": 6,
      "numTrusted": 4,
      "numOutlaws": 0,
      "balance": 95.75
    },
    "perms": {
      "build": [true, true, false, false],
      "destroy": [false, true, false, false],
      "switch": [true, true, false, false],
      "itemUse": [true, true, false, false],
      "flags": {
        "pvp": false,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": -12483.52,
        "y": 68.0,
        "z": -4219.18,
        "pitch": -5.78,
        "yaw": 92.46
      },
      "homeBlock": [-781, -264],
      "townBlocks": [[-781, -264], [-781, -263], [-782, -264]]
    },
    "residents": [
      {
        "name": "PNWExplorer",
        "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
      },
      {
        "name": "ForestKeeper",
        "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
      },
      {
        "name": "RiverGuide",
        "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
      }
    ],
    "trusted": [
      {
        "name": "ForestKeeper",
        "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
      },
      {
        "name": "RiverGuide",
        "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
      },
      {
        "name": "MountainClimber",
        "uuid": "5d7845f9-c2a6-4f83-b758-c32e761af9d4"
      }
    ],
    "outlaws": [],
    "quarters": ["Rose Quarter", "Pearl District", "Waterfront"],
    "ranks": {
      "assistant": [
        {
          "name": "ForestKeeper",
          "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
        }
      ],
      "trusted": [
        {
          "name": "RiverGuide",
          "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
        }
      ],
      "recruiter": [
        {
          "name": "ForestKeeper",
          "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
        }
      ],
      "sheriff": [
        {
          "name": "PacificDefender",
          "uuid": "1a8b72c5-e96d-4973-8462-d27f8ab95e18"
        }
      ],
      "guard": []
    }
  },
  
  // SEATTLE - CASCADIA
  {
    "name": "Seattle",
    "uuid": "f25acd71-9e38-4712-89b4-f24a963c320e",
    "board": "Emerald City | Coffee & Rain",
    "founder": "RainCity",
    "mayor": {
      "name": "RainCity",
      "uuid": "29e47b48-c631-4958-b07e-814e218ab5a9"
    },
    "nation": {
      "name": "Cascadia",
      "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
    },
    "timestamps": {
      "registered": 1719233614783,
      "joinedNationAt": 1719235989783,
      "ruinedAt": null
    },
    "status": {
      "isPublic": true,
      "isOpen": true,
      "isNeutral": true,
      "isCapital": false,
      "isOverClaimed": false,
      "isRuined": false,
      "isForSale": false,
      "hasNation": true
    },
    "stats": {
      "numTownBlocks": 216,
      "maxTownBlocks": 250,
      "bonusBlocks": 0,
      "numResidents": 5,
      "numTrusted": 2,
      "numOutlaws": 1,
      "balance": 53.50
    },
    "perms": {
      "build": [false, true, false, false],
      "destroy": [false, true, false, false],
      "switch": [false, true, false, false],
      "itemUse": [false, true, false, false],
      "flags": {
        "pvp": false,
        "explosion": false,
        "fire": false,
        "mobs": false
      }
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": -12283.64,
        "y": 72.0,
        "z": -5219.38,
        "pitch": 2.45,
        "yaw": 178.92
      },
      "homeBlock": [-768, -327],
      "townBlocks": [[-768, -327], [-769, -327], [-768, -328]]
    },
    "residents": [
      {
        "name": "RainCity",
        "uuid": "29e47b48-c631-4958-b07e-814e218ab5a9"
      },
      {
        "name": "CoastalGuard",
        "uuid": "73e894f2-57b1-49d5-ba8c-fd3a95e2782f"
      }
    ],
    "trusted": [
      {
        "name": "PNWExplorer",
        "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
      }
    ],
    "outlaws": [
      {
        "name": "Trespasser",
        "uuid": "3cd8e4a1-47bc-4fee-9540-e2a0ea347b29"
      }
    ],
    "quarters": ["Downtown", "Space Needle"],
    "ranks": {
      "assistant": [],
      "trusted": [
        {
          "name": "MountainClimber",
          "uuid": "5d7845f9-c2a6-4f83-b758-c32e761af9d4"
        }
      ],
      "recruiter": [],
      "sheriff": [],
      "guard": [
        {
          "name": "CoastalGuard",
          "uuid": "73e894f2-57b1-49d5-ba8c-fd3a95e2782f"
        }
      ]
    }
  }
];

export const FAKECUBA: Nation = 
{
        "name": "Cuba",
        "uuid": "5eda99c0-e430-4552-abae-4e7604579483",
        "board": "Welcome to the Empire of Cuba",
        "king": {
            "name": "jhjhjh098k",
            "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
        },
        "capital": {
            "name": "Havana",
            "uuid": "ff50d039-669d-413e-84e0-18c3fd370ea3"
        },
        "timestamps": {
            "registered": 1719176120296
        },
        "status": {
            "isPublic": true,
            "isOpen": false,
            "isNeutral": false
        },
        "stats": {
            "numTownBlocks": 1021,
            "numResidents": 15,
            "numTowns": 2,
            "numAllies": 9,
            "numEnemies": 0,
            "balance": 0.0
        },
        "coordinates": {
            "spawn": {
                "world": "world",
                "x": -27720.00379749501,
                "y": 64.0,
                "z": -7744.0120470932,
                "pitch": -1.3423146,
                "yaw": 0.06389673
            }
        },
        "residents": [
            {
                "name": "MrTytanic",
                "uuid": "d904bb76-412d-4f6a-af9f-13853b5fc614"
            },
            {
                "name": "jhjhjh098k",
                "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
            }
        ],
        "towns": [
            {
                "name": "Havana",
                "uuid": "ff50d039-669d-413e-84e0-18c3fd370ea3"
            },
            {
                "name": "Skibidi",
                "uuid": "0b86c2db-da31-4ac2-84f3-de3e4166164c"
            }
        ],
        "allies": [
            {
                "name": "Cuba",
                "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
            },
            {
                "name": "Japan",
                "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
            },
            {
                "name": "Cascadia",
                "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
            }
        ],
        "enemies": [],
        "sanctioned": [],
        "ranks": {
            "co-leader": [
                {
                    "name": "schottler3",
                    "uuid": "2f6f620b-6d60-4c89-bd50-974aff8da13f"
                }
            ],
            "minister": [
                {
                    "name": "schottler3",
                    "uuid": "2f6f620b-6d60-4c89-bd50-974aff8da13f"
                }
            ],
            "recruiter": [
                {
                    "name": "schottler3",
                    "uuid": "2f6f620b-6d60-4c89-bd50-974aff8da13f"
                }
            ],
            "soldier": [
                {
                    "name": "schottler3",
                    "uuid": "2f6f620b-6d60-4c89-bd50-974aff8da13f"
                }
            ],
            "general": [
                {
                    "name": "NimbKied",
                    "uuid": "f0256093-23b5-4fdd-96f0-451ef4acb63c"
                }
            ]
        }
    }

export const FAKEJAPAN: Nation = 
{
    "name": "Japan",
    "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2",
    "board": "Welcome to the Empire of Japan | みなさん、こんにちは！",
    "king": {
      "name": "SakuraSan",
      "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2"
    },
    "capital": {
      "name": "Tokyo",
      "uuid": "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3"
    },
    "timestamps": {
      "registered": 1719089562147
    },
    "status": {
      "isPublic": true,
      "isOpen": true,
      "isNeutral": false
    },
    "stats": {
      "numTownBlocks": 1587,
      "numResidents": 23,
      "numTowns": 4,
      "numAllies": 5,
      "numEnemies": 1,
      "balance": 250.75
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": 14582.47,
        "y": 76.0,
        "z": -2471.92,
        "pitch": 12.45,
        "yaw": -178.32
      }
    },
    "residents": [
      {
        "name": "SakuraSan",
        "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2"
      },
      {
        "name": "Kitsune42",
        "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
      },
      {
        "name": "MountFuji",
        "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
      }
    ],
    "towns": [
      {
        "name": "Tokyo",
        "uuid": "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3"
      },
      {
        "name": "Kyoto",
        "uuid": "ae0c6b97-1fd0-443c-bf82-9351b36ffec2"
      },
      {
        "name": "Osaka",
        "uuid": "d1a27e83-c910-4b86-9b85-1c151cd1b0a5"
      },
      {
        "name": "Hiroshima",
        "uuid": "6fc59b76-4b5c-414a-9842-cb26f7fbf25d"
      }
    ],
    "allies": [
      {
        "name": "Cuba",
        "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
      },
      {
        "name": "Cascadia",
        "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
      },
      {
        "name": "Korea",
        "uuid": "8af291a4-2d7a-4b86-b578-9a233c691057"
      }
    ],
    "enemies": [
      {
        "name": "Mongolia",
        "uuid": "c741a9c6-e8a7-4158-8c7f-61bd3ee16902"
      }
    ],
    "sanctioned": [],
    "ranks": {
      "co-leader": [
        {
          "name": "Kitsune42",
          "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
        }
      ],
      "minister": [
        {
          "name": "NinjaWarrior",
          "uuid": "9f6ed37a-25bf-4a5c-8e75-2f783c42e05f"
        },
        {
          "name": "SamuraiCode",
          "uuid": "63aa4187-ed9b-4ac6-8074-0fd43cc2c4ea"
        }
      ],
      "recruiter": [
        {
          "name": "MountFuji",
          "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
        }
      ],
      "soldier": [
        {
          "name": "ShogunWarrior",
          "uuid": "db1a7c93-8942-4b78-9c4d-f5379871a532"
        }
      ],
      "general": [
        {
          "name": "Kitsune42",
          "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
        }
      ]
    }
  }

export const FAKECASCADIA: Nation = 
{
    "name": "Cascadia",
    "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693",
    "board": "The Pacific Northwest Awaits | Forests, Mountains, Rivers",
    "king": {
      "name": "PNWExplorer",
      "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
    },
    "capital": {
      "name": "Portland",
      "uuid": "a7c891f6-7d3e-495b-b276-c4a7328ab9e1"
    },
    "timestamps": {
      "registered": 1719235614783
    },
    "status": {
      "isPublic": true,
      "isOpen": true,
      "isNeutral": true
    },
    "stats": {
      "numTownBlocks": 832,
      "numResidents": 18,
      "numTowns": 5,
      "numAllies": 4,
      "numEnemies": 0,
      "balance": 183.25
    },
    "coordinates": {
      "spawn": {
        "world": "world",
        "x": -12483.52,
        "y": 68.0,
        "z": -4219.18,
        "pitch": -5.78,
        "yaw": 92.46
      }
    },
    "residents": [
      {
        "name": "PNWExplorer",
        "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
      },
      {
        "name": "ForestKeeper",
        "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
      },
      {
        "name": "RiverGuide",
        "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
      }
    ],
    "towns": [
      {
        "name": "Portland",
        "uuid": "a7c891f6-7d3e-495b-b276-c4a7328ab9e1"
      },
      {
        "name": "Seattle",
        "uuid": "f25acd71-9e38-4712-89b4-f24a963c320e"
      },
      {
        "name": "Vancouver",
        "uuid": "28e7bf61-5923-4d8a-b1c7-63df8927e932"
      },
      {
        "name": "Eugene",
        "uuid": "9b731c82-4b5d-48a1-87d3-cb83e518ab75"
      },
      {
        "name": "Bellingham",
        "uuid": "d37cb216-79e2-4834-8b67-1a192d8f862f"
      }
    ],
    "allies": [
      {
        "name": "Cuba",
        "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
      },
      {
        "name": "Japan",
        "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
      },
      {
        "name": "California",
        "uuid": "2c95f4e7-38c9-4c8a-b23d-3d3465921b18"
      },
      {
        "name": "Alaska",
        "uuid": "f6d82c7f-52a1-47b9-8324-a531e7c4b517"
      }
    ],
    "enemies": [],
    "sanctioned": [],
    "ranks": {
      "co-leader": [
        {
          "name": "ForestKeeper",
          "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
        }
      ],
      "minister": [
        {
          "name": "RiverGuide",
          "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
        },
        {
          "name": "MountainClimber",
          "uuid": "5d7845f9-c2a6-4f83-b758-c32e761af9d4"
        }
      ],
      "recruiter": [
        {
          "name": "ForestKeeper",
          "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
        }
      ],
      "soldier": [
        {
          "name": "PacificDefender",
          "uuid": "1a8b72c5-e96d-4973-8462-d27f8ab95e18"
        },
        {
          "name": "CoastalGuard",
          "uuid": "73e894f2-57b1-49d5-ba8c-fd3a95e2782f"
        }
      ],
      "general": [
        {
          "name": "RainCity",
          "uuid": "29e47b48-c631-4958-b07e-814e218ab5a9"
        }
      ]
    }
  }

export const FAKETOWN = 
[
    {
        "name": "Havana",
        "uuid": "ff50d039-669d-413e-84e0-18c3fd370ea3",
        "board": "VIVA LA LIBERTAD CARAJO",
        "founder": "5u5u",
        "mayor": {
            "name": "jhjhjh098k",
            "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
        },
        "nation": {
            "name": "Cuba",
            "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
        },
        "timestamps": {
            "registered": 1719014016273,
            "joinedNationAt": 1719176120296,
            "ruinedAt": null
        },
        "status": {
            "isPublic": true,
            "isOpen": false,
            "isNeutral": false,
            "isCapital": true,
            "isOverClaimed": true,
            "isRuined": false,
            "isForSale": false,
            "hasNation": true
        },
        "stats": {
            "numTownBlocks": 1020,
            "maxTownBlocks": 985,
            "bonusBlocks": 0,
            "numResidents": 14,
            "numTrusted": 9,
            "numOutlaws": 1,
            "balance": 81.8
        },
        "perms": {
            "build": [false, false, false, false],
            "destroy": [false, false, false, false],
            "switch": [false, false, false, false],
            "itemUse": [false, false, false, false],
            "flags": {
                "pvp": false,
                "explosion": false,
                "fire": false,
                "mobs": false
            }
        },
        "coordinates": {
            "spawn": {
                "world": "world",
                "x": -27417.029697659815,
                "y": 88.75061076465869,
                "z": -7704.748858546749,
                "pitch": 41.038494,
                "yaw": -97.12445
            },
            "homeBlock": [
                -1714,
                -482
            ],
            "townBlocks": [
                [
                    -1745,
                    -479
                ]
            ]
        },
        "residents": [
            {
                "name": "MrTytanic",
                "uuid": "d904bb76-412d-4f6a-af9f-13853b5fc614"
            },

            {
                "name": "jhjhjh098k",
                "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
            }
        ],
        "trusted": [
            {
                "name": "jhjhjh098k",
                "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0"
            },
            {
                "name": "Kauntar",
                "uuid": "67dbe22c-f9f8-4f27-a372-3ec9cf7c8ea8"
            }
        ],
        "outlaws": [
            {
                "name": "kreepsta",
                "uuid": "dc013ac2-23b9-4a56-84f2-74b6e559ffe1"
            }
        ],
        "quarters": [],
        "ranks": {
            "assistant": [
                {
                    "name": "Ethnzz",
                    "uuid": "bb045b6c-df6a-4f83-be01-5eb745273f72"
                }
            ],
            "trusted": [],
            "recruiter": [],
            "sheriff": [],
            "guard": []
        }
    }
]

export const FAKEPLAYERS = [
  // Cuban leader
  {
    "name": "jhjhjh098k",
    "uuid": "9a2657ea-e15c-4469-8886-6c101151eff0",
    "title": "El Presidente",
    "surname": "de Cuba",
    "formattedName": "El Presidente jhjhjh098k de Cuba",
    "about": "Leading the glorious revolution in the Caribbean since 2023! ¡Viva la Cuba!",
    "town": {
      "name": "Havana",
      "uuid": "ff50d039-669d-413e-84e0-18c3fd370ea3"
    },
    "nation": {
      "name": "Cuba",
      "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
    },
    "timestamps": {
      "registered": 1719014000000,
      "joinedTownAt": 1719014016273,
      "lastOnline": 1717894650000
    },
    "status": {
      "isOnline": true,
      "isNPC": false,
      "isMayor": true,
      "isKing": true,
      "hasTown": true,
      "hasNation": true
    },
    "stats": {
      "balance": 358.42,
      "numFriends": 7
    },
    "perms": {
      "build": [true, true, true, true],
      "destroy": [true, true, true, true],
      "switch": [true, true, true, true],
      "itemUse": [true, true, true, true],
      "flags": {
        "pvp": true,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "ranks": {
      "townRanks": ["mayor"],
      "nationRanks": ["king"]
    },
    "friends": [
      {
        "name": "MrTytanic",
        "uuid": "d904bb76-412d-4f6a-af9f-13853b5fc614"
      },
      {
        "name": "schottler3",
        "uuid": "2f6f620b-6d60-4c89-bd50-974aff8da13f"
      }
    ]
  },
  
  // Japanese leader
  {
    "name": "SakuraSan",
    "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2",
    "title": "Emperor",
    "surname": "of the Rising Sun",
    "formattedName": "Emperor SakuraSan of the Rising Sun",
    "about": "Bringing honor and prosperity to the Empire of Japan. 日本へようこそ!",
    "town": {
      "name": "Tokyo",
      "uuid": "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3"
    },
    "nation": {
      "name": "Japan",
      "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
    },
    "timestamps": {
      "registered": 1719089000000,
      "joinedTownAt": 1719089462147,
      "lastOnline": 1719289000000
    },
    "status": {
      "isOnline": true,
      "isNPC": false,
      "isMayor": true,
      "isKing": true,
      "hasTown": true,
      "hasNation": true
    },
    "stats": {
      "balance": 425.75,
      "numFriends": 5
    },
    "perms": {
      "build": [true, true, true, true],
      "destroy": [true, true, true, true],
      "switch": [true, true, true, true],
      "itemUse": [true, true, true, true],
      "flags": {
        "pvp": true,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "ranks": {
      "townRanks": ["mayor"],
      "nationRanks": ["king"]
    },
    "friends": [
      {
        "name": "Kitsune42",
        "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f"
      },
      {
        "name": "MountFuji",
        "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
      }
    ]
  },
  
  // Cascadia leader
  {
    "name": "PNWExplorer",
    "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b",
    "title": "President",
    "surname": "of Cascadia",
    "formattedName": "President PNWExplorer of Cascadia",
    "about": "Leading the Pacific Northwest into a sustainable future of peace and conservation.",
    "town": {
      "name": "Portland",
      "uuid": "a7c891f6-7d3e-495b-b276-c4a7328ab9e1"
    },
    "nation": {
      "name": "Cascadia",
      "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
    },
    "timestamps": {
      "registered": 1719230000000,
      "joinedTownAt": 1719230614783,
      "lastOnline": 1719300000000
    },
    "status": {
      "isOnline": false,
      "isNPC": false,
      "isMayor": true,
      "isKing": true,
      "hasTown": true,
      "hasNation": true
    },
    "stats": {
      "balance": 278.50,
      "numFriends": 8
    },
    "perms": {
      "build": [true, true, true, true],
      "destroy": [true, true, true, true],
      "switch": [true, true, true, true],
      "itemUse": [true, true, true, true],
      "flags": {
        "pvp": false,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "ranks": {
      "townRanks": ["mayor"],
      "nationRanks": ["king"]
    },
    "friends": [
      {
        "name": "ForestKeeper",
        "uuid": "37d9e142-5b76-4a3d-9e4c-61af8f8693a2"
      },
      {
        "name": "RiverGuide",
        "uuid": "ba1f63c8-9371-47d5-b89e-32f47582d841"
      },
      {
        "name": "RainCity",
        "uuid": "29e47b48-c631-4958-b07e-814e218ab5a9"
      }
    ]
  },
  
  // Regular player (Seattle mayor)
  {
    "name": "RainCity",
    "uuid": "29e47b48-c631-4958-b07e-814e218ab5a9",
    "title": null,
    "surname": "the Emerald",
    "formattedName": "RainCity the Emerald",
    "about": "Builder of Seattle and coffee enthusiast. Rainy days are the best days!",
    "town": {
      "name": "Seattle",
      "uuid": "f25acd71-9e38-4712-89b4-f24a963c320e"
    },
    "nation": {
      "name": "Cascadia",
      "uuid": "e38c9fbc-78d9-4e9b-a90f-870fba949693"
    },
    "timestamps": {
      "registered": 1719233000000,
      "joinedTownAt": 1719233614783,
      "lastOnline": 1719294000000
    },
    "status": {
      "isOnline": true,
      "isNPC": false,
      "isMayor": true,
      "isKing": false,
      "hasTown": true,
      "hasNation": true
    },
    "stats": {
      "balance": 178.25,
      "numFriends": 4
    },
    "perms": {
      "build": [true, true, true, true],
      "destroy": [true, true, true, true],
      "switch": [true, true, true, true],
      "itemUse": [true, true, true, true],
      "flags": {
        "pvp": false,
        "explosion": false,
        "fire": false,
        "mobs": false
      }
    },
    "ranks": {
      "townRanks": ["mayor"],
      "nationRanks": ["general"]
    },
    "friends": [
      {
        "name": "PNWExplorer",
        "uuid": "4cba82d5-94fa-42f8-b7a7-83d9c06e3f6b"
      },
      {
        "name": "CoastalGuard",
        "uuid": "73e894f2-57b1-49d5-ba8c-fd3a95e2782f"
      }
    ]
  },
  
  // Regular player (Tokyo resident)
  {
    "name": "Kitsune42",
    "uuid": "753cb829-69c4-48c5-9432-8dfa12631d7f",
    "title": "Shogun",
    "surname": null,
    "formattedName": "Shogun Kitsune42",
    "about": "Right hand of the Emperor. Architect of Tokyo's Imperial District. 狐の魂!",
    "town": {
      "name": "Tokyo",
      "uuid": "47dc1e57-8b5a-4b83-a9d4-7f92c621e9d3"
    },
    "nation": {
      "name": "Japan",
      "uuid": "93f28b00-51ba-43b2-930f-a63e496317a2"
    },
    "timestamps": {
      "registered": 1719090000000,
      "joinedTownAt": 1719090462147,
      "lastOnline": 1719283200000
    },
    "status": {
      "isOnline": true,
      "isNPC": false,
      "isMayor": false,
      "isKing": false,
      "hasTown": true,
      "hasNation": true
    },
    "stats": {
      "balance": 218.15,
      "numFriends": 6
    },
    "perms": {
      "build": [true, true, true, false],
      "destroy": [true, true, false, false],
      "switch": [true, true, true, false],
      "itemUse": [true, true, true, false],
      "flags": {
        "pvp": true,
        "explosion": false,
        "fire": false,
        "mobs": true
      }
    },
    "ranks": {
      "townRanks": ["assistant", "trusted"],
      "nationRanks": ["co-leader", "general"]
    },
    "friends": [
      {
        "name": "SakuraSan",
        "uuid": "b71c2a48-3f76-49a2-9e4c-b9826376a8f2"
      },
      {
        "name": "MountFuji",
        "uuid": "e275d96b-943c-4c7d-a67f-9f49b68f067d"
      },
      {
        "name": "SamuraiCode",
        "uuid": "63aa4187-ed9b-4ac6-8074-0fd43cc2c4ea"
      }
    ]
  }
];