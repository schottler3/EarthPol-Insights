// @ts-check
import { Dispatch, SetStateAction } from "react"

export type Nation = {
    allies: [
        {
            name: string,
            uuid: string
        }
    ]
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
    enemies: [
        {
            name: string,
            uuid: string
        }
    ]
    king: {
        name: string,
        uuid: string
    };
    name: string;
    ranks: {
        coleader: [];
        minister: [];
        recruiter: [];
        soldier: [];
        general: [];
    };
    residents: [
        {
            name: string,
            uuid: string
        }
    ]
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
    towns: [
        {
            name: string,
            uuid: string
        }
    ]
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
    }
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
  id: string;
  name: string;
  properties: {
    name: string;
    value: string;
  }[];
  profileActions: any[];
}

export type ReactStateHandler = Dispatch<SetStateAction<Nation | Town | null>>;

export function isTown(item: Town | Nation | null): item is Town {
  return item !== null && 'nation' in item;
}

export function isNation(item: Town | Nation | null): item is Nation {
  return item !== null && 'towns' in item;
}

export const USINGFAKE = true;

export const FAKENATIONS = 
[
    {
        "name": "Cuba",
        "uuid": "5eda99c0-e430-4552-abae-4e7604579483"
    }
]

export const FAKENATION = 
[
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
]

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