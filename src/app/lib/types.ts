// @ts-check
import { Dispatch, SetStateAction } from "react"

export interface EndpointData {
  version: string;
  moonPhase: string;
  time: {
    newDayTime: number;
    serverTimeOfDay: number;
    stormDuration: number;
    thunderDuration: number;
    time: number;
    fullTime: number;
    eraDate: string;
    eraDay: number;
  };
  status: {
    hasStorm: boolean;
    isThundering: boolean;
    daylightCycle: boolean;
    mobSpawning: boolean;
    keepInventory: boolean;
    randomTickSpeed: number;
    viewDistance: number;
    simulationDistance: number;
  };
  stats: {
    maxPlayers: number;
    numOnlinePlayers: number;
    numOnlineNomads: number;
    numResidents: number;
    numNomads: number;
    numTowns: number;
    numTownBlocks: number;
    numNations: number;
    numQuarters: number;
  };
  endpoints: {
    towns: string;
    nations: string;
    players: string;
    shops: string;
    location: string;
    discord: string;
    quarters: string;
    chat: string;
  };
}

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
  timestamp?:number
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
  discord: string;
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

export type Wilderness = {
    location: {
        x: number,
        z: number
    },
    isWilderness: boolean,
    town: {
        name: string,
        uuid: string
    },
    nation: {
        name: string,
        uuid: string
    },
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