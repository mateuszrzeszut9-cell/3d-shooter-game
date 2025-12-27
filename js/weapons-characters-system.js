/**
 * 3D Shooter Game - Weapon and Character System Specifications
 * Comprehensive system definitions for weapons, characters, and their interactions
 * Version: 1.0.0
 * Created: 2025-12-27
 */

// ============================================================================
// WEAPON SYSTEM SPECIFICATIONS
// ============================================================================

const WeaponSystem = {
  /**
   * Weapon Classes and Categorization
   */
  classes: {
    PISTOL: 'pistol',
    RIFLE: 'rifle',
    SHOTGUN: 'shotgun',
    SNIPER: 'sniper',
    SMG: 'smg',
    LAUNCHER: 'launcher',
    MELEE: 'melee',
    SPECIAL: 'special'
  },

  /**
   * Weapon Specifications Database
   */
  weapons: {
    // Pistols
    glock19: {
      id: 'glock19',
      name: 'Glock 19',
      class: 'pistol',
      damage: 25,
      fireRate: 0.1,
      magazineSize: 17,
      ammoType: '9mm',
      accuracy: 0.85,
      recoil: 0.15,
      range: 50,
      weight: 0.65,
      fireMode: ['semi-auto'],
      ammoPerMagazine: 17,
      reloadTime: 2.0,
      equipTime: 0.3,
      muzzleVelocity: 380,
      armorPenetration: 0.2,
      knockback: 0.1,
      description: 'Reliable semi-automatic pistol. Good all-rounder for beginners.'
    },

    deserteagle: {
      id: 'deserteagle',
      name: 'Desert Eagle',
      class: 'pistol',
      damage: 65,
      fireRate: 0.3,
      magazineSize: 7,
      ammoType: '.50 AE',
      accuracy: 0.75,
      recoil: 0.45,
      range: 60,
      weight: 1.27,
      fireMode: ['semi-auto'],
      ammoPerMagazine: 7,
      reloadTime: 2.8,
      equipTime: 0.4,
      muzzleVelocity: 430,
      armorPenetration: 0.5,
      knockback: 0.3,
      description: 'Powerful but slow semi-automatic pistol. High damage output.'
    },

    // Rifles
    ak47: {
      id: 'ak47',
      name: 'AK-47',
      class: 'rifle',
      damage: 40,
      fireRate: 0.08,
      magazineSize: 30,
      ammoType: '7.62x39mm',
      accuracy: 0.70,
      recoil: 0.25,
      range: 150,
      weight: 3.47,
      fireMode: ['semi-auto', 'full-auto'],
      ammoPerMagazine: 30,
      reloadTime: 2.5,
      equipTime: 0.5,
      muzzleVelocity: 715,
      armorPenetration: 0.6,
      knockback: 0.25,
      description: 'Legendary assault rifle. Reliable and powerful.'
    },

    m16: {
      id: 'm16',
      name: 'M16A4',
      class: 'rifle',
      damage: 38,
      fireRate: 0.09,
      magazineSize: 30,
      ammoType: '5.56x45mm',
      accuracy: 0.88,
      recoil: 0.18,
      range: 160,
      weight: 3.26,
      fireMode: ['semi-auto', 'burst', 'full-auto'],
      ammoPerMagazine: 30,
      reloadTime: 2.3,
      equipTime: 0.45,
      muzzleVelocity: 948,
      armorPenetration: 0.55,
      knockback: 0.22,
      description: 'Versatile military rifle with burst fire. Great for medium range.'
    },

    scar: {
      id: 'scar',
      name: 'FN SCAR-L',
      class: 'rifle',
      damage: 42,
      fireRate: 0.087,
      magazineSize: 30,
      ammoType: '5.56x45mm',
      accuracy: 0.89,
      recoil: 0.17,
      range: 165,
      weight: 3.6,
      fireMode: ['semi-auto', 'full-auto'],
      ammoPerMagazine: 30,
      reloadTime: 2.4,
      equipTime: 0.48,
      muzzleVelocity: 940,
      armorPenetration: 0.58,
      knockback: 0.24,
      description: 'Modern tactical rifle. Superior accuracy and handling.'
    },

    // Shotguns
    m1014: {
      id: 'm1014',
      name: 'Benelli M1014',
      class: 'shotgun',
      damage: 80,
      fireRate: 0.25,
      magazineSize: 8,
      ammoType: '12 gauge',
      accuracy: 0.60,
      recoil: 0.60,
      range: 35,
      weight: 3.6,
      fireMode: ['semi-auto'],
      ammoPerMagazine: 8,
      reloadTime: 3.0,
      equipTime: 0.55,
      muzzleVelocity: 400,
      armorPenetration: 0.4,
      knockback: 0.5,
      pelletsPerShot: 8,
      spreadAngle: 15,
      description: 'Combat shotgun. Devastating at close range with wide spread.'
    },

    mossberg: {
      id: 'mossberg',
      name: 'Mossberg 500',
      class: 'shotgun',
      damage: 75,
      fireRate: 0.3,
      magazineSize: 8,
      ammoType: '12 gauge',
      accuracy: 0.55,
      recoil: 0.65,
      range: 30,
      weight: 3.2,
      fireMode: ['pump'],
      ammoPerMagazine: 8,
      reloadTime: 3.5,
      equipTime: 0.6,
      muzzleVelocity: 390,
      armorPenetration: 0.35,
      knockback: 0.55,
      pelletsPerShot: 8,
      spreadAngle: 18,
      description: 'Pump-action shotgun. Lower fire rate but high damage.'
    },

    // Sniper Rifles
    awp: {
      id: 'awp',
      name: 'AWP Dragon Lore',
      class: 'sniper',
      damage: 130,
      fireRate: 1.5,
      magazineSize: 10,
      ammoType: '.338 Lapua Magnum',
      accuracy: 0.98,
      recoil: 0.70,
      range: 300,
      weight: 6.5,
      fireMode: ['bolt-action'],
      ammoPerMagazine: 10,
      reloadTime: 3.5,
      equipTime: 0.8,
      muzzleVelocity: 945,
      armorPenetration: 0.9,
      knockback: 0.4,
      zoomLevel: 8,
      oneHitKill: true,
      description: 'Legendary bolt-action sniper. One-shot kill potential.'
    },

    awm: {
      id: 'awm',
      name: 'AI AWM',
      class: 'sniper',
      damage: 125,
      fireRate: 1.4,
      magazineSize: 5,
      ammoType: '.300 Winchester Magnum',
      accuracy: 0.96,
      recoil: 0.68,
      range: 280,
      weight: 6.2,
      fireMode: ['bolt-action'],
      ammoPerMagazine: 5,
      reloadTime: 3.0,
      equipTime: 0.75,
      muzzleVelocity: 900,
      armorPenetration: 0.85,
      knockback: 0.38,
      zoomLevel: 7,
      oneHitKill: true,
      description: 'Long-range sniper rifle. Extreme damage output.'
    },

    // SMGs
    mp5: {
      id: 'mp5',
      name: 'HK MP5',
      class: 'smg',
      damage: 20,
      fireRate: 0.05,
      magazineSize: 30,
      ammoType: '9mm',
      accuracy: 0.82,
      recoil: 0.10,
      range: 60,
      weight: 2.54,
      fireMode: ['semi-auto', 'full-auto'],
      ammoPerMagazine: 30,
      reloadTime: 1.8,
      equipTime: 0.35,
      muzzleVelocity: 400,
      armorPenetration: 0.25,
      knockback: 0.08,
      description: 'Versatile submachine gun. High fire rate, low recoil.'
    },

    ump45: {
      id: 'ump45',
      name: 'UMP45',
      class: 'smg',
      damage: 28,
      fireRate: 0.06,
      magazineSize: 25,
      ammoType: '.45 ACP',
      accuracy: 0.75,
      recoil: 0.14,
      range: 70,
      weight: 2.7,
      fireMode: ['semi-auto', 'full-auto'],
      ammoPerMagazine: 25,
      reloadTime: 2.0,
      equipTime: 0.38,
      muzzleVelocity: 380,
      armorPenetration: 0.32,
      knockback: 0.12,
      description: 'Powerful submachine gun. Better damage than MP5.'
    },

    // Launchers
    rpg7: {
      id: 'rpg7',
      name: 'RPG-7',
      class: 'launcher',
      damage: 120,
      fireRate: 1.0,
      magazineSize: 1,
      ammoType: 'HEAT Rounds',
      accuracy: 0.65,
      recoil: 2.0,
      range: 200,
      weight: 7.0,
      fireMode: ['semi-auto'],
      ammoPerMagazine: 1,
      reloadTime: 4.0,
      equipTime: 1.0,
      muzzleVelocity: 115,
      armorPenetration: 0.95,
      knockback: 1.5,
      explosionRadius: 10,
      description: 'Heavy launcher. Large explosion area, slow reload.'
    },

    // Melee Weapons
    knife: {
      id: 'knife',
      name: 'Combat Knife',
      class: 'melee',
      damage: 60,
      fireRate: 0.8,
      accuracy: 1.0,
      recoil: 0.0,
      range: 2.5,
      weight: 0.4,
      fireMode: ['melee'],
      reloadTime: 0.0,
      equipTime: 0.2,
      armorPenetration: 0.7,
      knockback: 0.0,
      description: 'Quick melee weapon. One-hit backstab kills.'
    },

    axe: {
      id: 'axe',
      name: 'Battle Axe',
      class: 'melee',
      damage: 100,
      fireRate: 1.2,
      accuracy: 1.0,
      recoil: 0.0,
      range: 2.8,
      weight: 2.5,
      fireMode: ['melee'],
      reloadTime: 0.0,
      equipTime: 0.4,
      armorPenetration: 0.8,
      knockback: 0.2,
      description: 'Heavy melee weapon. Slow but devastating.'
    },

    // Special Weapons
    flamethrower: {
      id: 'flamethrower',
      name: 'Flamethrower',
      class: 'special',
      damage: 35,
      fireRate: 0.15,
      magazineSize: 100,
      ammoType: 'Fuel',
      accuracy: 0.40,
      recoil: 0.35,
      range: 40,
      weight: 8.0,
      fireMode: ['continuous'],
      ammoPerMagazine: 100,
      reloadTime: 3.0,
      equipTime: 0.7,
      muzzleVelocity: 50,
      armorPenetration: 0.1,
      knockback: 0.15,
      burnDamage: 5,
      description: 'Area denial weapon. Continuous flame with burn damage.'
    }
  },

  /**
   * Ammo Types and Properties
   */
  ammoTypes: {
    '9mm': {
      velocity: 350,
      penetration: 0.2,
      weight: 8,
      cost: 0.50
    },
    '.50 AE': {
      velocity: 430,
      penetration: 0.5,
      weight: 25,
      cost: 2.50
    },
    '7.62x39mm': {
      velocity: 715,
      penetration: 0.6,
      weight: 9.5,
      cost: 0.75
    },
    '5.56x45mm': {
      velocity: 940,
      penetration: 0.55,
      weight: 4,
      cost: 0.60
    },
    '12 gauge': {
      velocity: 400,
      penetration: 0.4,
      weight: 30,
      cost: 1.20
    },
    '.338 Lapua Magnum': {
      velocity: 945,
      penetration: 0.9,
      weight: 16.2,
      cost: 3.00
    },
    '.300 Winchester Magnum': {
      velocity: 900,
      penetration: 0.85,
      weight: 14.3,
      cost: 2.75
    },
    '.45 ACP': {
      velocity: 260,
      penetration: 0.32,
      weight: 14.9,
      cost: 0.85
    },
    'HEAT Rounds': {
      velocity: 115,
      penetration: 0.95,
      weight: 2200,
      cost: 50.00
    },
    'Fuel': {
      velocity: 50,
      penetration: 0.1,
      weight: 5,
      cost: 1.00
    }
  },

  /**
   * Weapon Attachments System
   */
  attachments: {
    scopes: {
      holoSight: {
        name: 'Holographic Sight',
        accuracy: 0.15,
        aimSpeed: 1.1,
        weight: 0.1,
        cost: 300
      },
      acog: {
        name: 'ACOG 4x Scope',
        accuracy: 0.25,
        aimSpeed: 0.9,
        zoomLevel: 4,
        weight: 0.25,
        cost: 500
      },
      thermalScope: {
        name: 'Thermal Scope',
        accuracy: 0.30,
        aimSpeed: 0.7,
        zoomLevel: 6,
        weight: 0.35,
        cost: 800,
        heatDetection: true
      }
    },

    barrels: {
      suppressedBarrel: {
        name: 'Suppressed Barrel',
        accuracy: 0.05,
        sound: -30,
        damage: -5,
        weight: 0.15,
        cost: 200
      },
      longBarrel: {
        name: 'Long Barrel',
        accuracy: 0.10,
        range: 1.2,
        weight: 0.3,
        cost: 250
      },
      flareBarrel: {
        name: 'Flare Barrel',
        accuracy: -0.05,
        muzzleFlash: 1.5,
        weight: 0.2,
        cost: 150
      }
    },

    magazines: {
      extendedMag: {
        name: 'Extended Magazine',
        ammoBonus: 1.5,
        reloadTime: 0.3,
        weight: 0.2,
        cost: 150
      },
      quickMag: {
        name: 'Quick-Change Magazine',
        ammoBonus: 1.0,
        reloadTime: -0.5,
        weight: -0.05,
        cost: 200
      }
    },

    grips: {
      tacticalGrip: {
        name: 'Tactical Grip',
        recoil: -0.08,
        aimSpeed: 1.05,
        weight: 0.05,
        cost: 100
      },
      ergonomicGrip: {
        name: 'Ergonomic Grip',
        recoil: -0.10,
        accuracy: 0.05,
        weight: 0.08,
        cost: 120
      }
    }
  }
};

// ============================================================================
// CHARACTER SYSTEM SPECIFICATIONS
// ============================================================================

const CharacterSystem = {
  /**
   * Character Classes
   */
  classes: {
    ASSAULT: 'assault',
    SNIPER: 'sniper',
    SUPPORT: 'support',
    RECON: 'recon',
    ENGINEER: 'engineer',
    MEDIC: 'medic'
  },

  /**
   * Character Specifications Database
   */
  characters: {
    // Assault Class
    commandoJack: {
      id: 'commando-jack',
      name: 'Commando Jack',
      class: 'assault',
      avatar: 'assets/models/commando-jack.model',
      faction: 'alpha',
      stats: {
        health: 100,
        armor: 25,
        speed: 9.5,
        stamina: 80,
        reloadSpeed: 0.95,
        turnSpeed: 1.0,
        jumpHeight: 1.0,
        firearmAccuracy: 0.88,
        meleeAccuracy: 0.90
      },
      startingWeapon: 'ak47',
      secondaryWeapon: 'glock19',
      abilities: ['fieldMedkit', 'grenadeThrow', 'tacticialRoll'],
      passiveAbilities: ['improvedWeaponHandling'],
      grenades: {
        fragGrenade: 2,
        smokeGrenade: 1
      },
      equipment: {
        armor: 'kevlarVest',
        helmet: 'combatHelmet'
      },
      description: 'Highly trained assault operative. Master of all-purpose combat.',
      experienceMultiplier: 1.0,
      costInCurrency: 0
    },

    rebelRex: {
      id: 'rebel-rex',
      name: 'Rebel Rex',
      class: 'assault',
      avatar: 'assets/models/rebel-rex.model',
      faction: 'bravo',
      stats: {
        health: 110,
        armor: 30,
        speed: 8.5,
        stamina: 90,
        reloadSpeed: 0.90,
        turnSpeed: 0.95,
        jumpHeight: 0.95,
        firearmAccuracy: 0.85,
        meleeAccuracy: 0.95
      },
      startingWeapon: 'm16',
      secondaryWeapon: 'deserteagle',
      abilities: ['berserkerMode', 'powerSlam', 'grenadeThrow'],
      passiveAbilities: ['toughness'],
      grenades: {
        fragGrenade: 3,
        inceniaryGrenade: 1
      },
      equipment: {
        armor: 'heavyArmor',
        helmet: 'reinforcedHelmet'
      },
      description: 'Aggressive fighter with increased health. Excels in close quarters.',
      experienceMultiplier: 1.1,
      costInCurrency: 5000
    },

    // Sniper Class
    phantomSilence: {
      id: 'phantom-silence',
      name: 'Phantom Silence',
      class: 'sniper',
      avatar: 'assets/models/phantom-silence.model',
      faction: 'alpha',
      stats: {
        health: 75,
        armor: 10,
        speed: 8.0,
        stamina: 100,
        reloadSpeed: 1.0,
        turnSpeed: 1.1,
        jumpHeight: 0.9,
        firearmAccuracy: 0.98,
        meleeAccuracy: 0.70
      },
      startingWeapon: 'awp',
      secondaryWeapon: 'mp5',
      abilities: ['deathmark', 'distantShot', 'bulletDrop'],
      passiveAbilities: ['steadyHand', 'extraVision'],
      grenades: {
        smokeGrenade: 2,
        concussionGrenade: 1
      },
      equipment: {
        armor: 'lightArmor',
        helmet: 'tacticialHelmet'
      },
      description: 'Expert sniper with pinpoint accuracy. Best from distance.',
      experienceMultiplier: 1.2,
      costInCurrency: 7500
    },

    shadowHunter: {
      id: 'shadow-hunter',
      name: 'Shadow Hunter',
      class: 'sniper',
      avatar: 'assets/models/shadow-hunter.model',
      faction: 'bravo',
      stats: {
        health: 80,
        armor: 15,
        speed: 8.2,
        stamina: 95,
        reloadSpeed: 1.05,
        turnSpeed: 1.15,
        jumpHeight: 0.85,
        firearmAccuracy: 0.96,
        meleeAccuracy: 0.65
      },
      startingWeapon: 'awm',
      secondaryWeapon: 'ump45',
      abilities: ['cloakMode', 'distantShot', 'heightAdvantage'],
      passiveAbilities: ['nightVision', 'silentFootsteps'],
      grenades: {
        smokeGrenade: 2,
        flashGrenade: 2
      },
      equipment: {
        armor: 'ghillieSuit',
        helmet: 'tacticialHelmet'
      },
      description: 'Master of stealth. Lethal from the shadows.',
      experienceMultiplier: 1.25,
      costInCurrency: 8000
    },

    // Support Class
    bombardierBill: {
      id: 'bombardier-bill',
      name: 'Bombardier Bill',
      class: 'support',
      avatar: 'assets/models/bombardier-bill.model',
      faction: 'alpha',
      stats: {
        health: 95,
        armor: 20,
        speed: 7.5,
        stamina: 70,
        reloadSpeed: 1.0,
        turnSpeed: 0.9,
        jumpHeight: 0.85,
        firearmAccuracy: 0.75,
        meleeAccuracy: 0.75
      },
      startingWeapon: 'rpg7',
      secondaryWeapon: 'pistol',
      abilities: ['areaBlast', 'shrapnelDetonation', 'explosiveSupply'],
      passiveAbilities: ['explosiveExpertise'],
      grenades: {
        fragGrenade: 4,
        inceniaryGrenade: 2,
        smokeGrenade: 1
      },
      equipment: {
        armor: 'explosiveProtection',
        helmet: 'combatHelmet'
      },
      description: 'Heavy weapons specialist. Master of destruction.',
      experienceMultiplier: 1.15,
      costInCurrency: 6500
    },

    ironForge: {
      id: 'iron-forge',
      name: 'Iron Forge',
      class: 'support',
      avatar: 'assets/models/iron-forge.model',
      faction: 'bravo',
      stats: {
        health: 120,
        armor: 35,
        speed: 6.5,
        stamina: 75,
        reloadSpeed: 0.85,
        turnSpeed: 0.8,
        jumpHeight: 0.8,
        firearmAccuracy: 0.70,
        meleeAccuracy: 0.85
      },
      startingWeapon: 'm249',
      secondaryWeapon: 'glock19',
      abilities: ['machineGunBarrage', 'suppressiveFire', 'ammoSupply'],
      passiveAbilities: ['heavyWeaponSpecialist', 'steelSkin'],
      grenades: {
        fragGrenade: 2,
        smokeGrenade: 3
      },
      equipment: {
        armor: 'heavyPlateArmor',
        helmet: 'reinforcedHelmet'
      },
      description: 'Tanky support character. Carries heavy weaponry.',
      experienceMultiplier: 1.1,
      costInCurrency: 6000
    },

    // Recon Class
    scoutEcho: {
      id: 'scout-echo',
      name: 'Scout Echo',
      class: 'recon',
      avatar: 'assets/models/scout-echo.model',
      faction: 'alpha',
      stats: {
        health: 85,
        armor: 12,
        speed: 11.0,
        stamina: 110,
        reloadSpeed: 1.1,
        turnSpeed: 1.2,
        jumpHeight: 1.1,
        firearmAccuracy: 0.82,
        meleeAccuracy: 0.80
      },
      startingWeapon: 'scar',
      secondaryWeapon: 'mp5',
      abilities: ['speedBurst', 'scout', 'evasiveManeuver'],
      passiveAbilities: ['lightFooted', 'environmentalAwareness'],
      grenades: {
        smokeGrenade: 2,
        flashGrenade: 2,
        concussionGrenade: 1
      },
      equipment: {
        armor: 'lightArmor',
        helmet: 'tacticialHelmet'
      },
      description: 'Fast and agile scout. Master of reconnaissance.',
      experienceMultiplier: 1.15,
      costInCurrency: 5500
    },

    ghostNinja: {
      id: 'ghost-ninja',
      name: 'Ghost Ninja',
      class: 'recon',
      avatar: 'assets/models/ghost-ninja.model',
      faction: 'bravo',
      stats: {
        health: 80,
        armor: 8,
        speed: 11.5,
        stamina: 120,
        reloadSpeed: 1.15,
        turnSpeed: 1.25,
        jumpHeight: 1.2,
        firearmAccuracy: 0.80,
        meleeAccuracy: 0.95
      },
      startingWeapon: 'scar',
      secondaryWeapon: 'knife',
      abilities: ['shadowDash', 'wallRun', 'silentAssassin'],
      passiveAbilities: ['invisibility', 'masterOfStealth'],
      grenades: {
        smokeGrenade: 3,
        concussionGrenade: 2
      },
      equipment: {
        armor: 'lightArmor',
        helmet: 'ninjaMask'
      },
      description: 'Ultimate infiltrator. Perfect for hit-and-run tactics.',
      experienceMultiplier: 1.20,
      costInCurrency: 7000
    },

    // Engineer Class
    techWizard: {
      id: 'tech-wizard',
      name: 'Tech Wizard',
      class: 'engineer',
      avatar: 'assets/models/tech-wizard.model',
      faction: 'alpha',
      stats: {
        health: 90,
        armor: 18,
        speed: 8.5,
        stamina: 85,
        reloadSpeed: 1.05,
        turnSpeed: 1.0,
        jumpHeight: 0.95,
        firearmAccuracy: 0.80,
        meleeAccuracy: 0.75
      },
      startingWeapon: 'mp5',
      secondaryWeapon: 'glock19',
      abilities: ['deployTurret', 'hackDevices', 'repairSystem'],
      passiveAbilities: ['techMastery', 'improvedScanning'],
      grenades: {
        fragmentationGrenade: 2,
        smokeGrenade: 1,
        empGrenade: 2
      },
      equipment: {
        armor: 'tacticalArmor',
        helmet: 'smartHelmet'
      },
      description: 'Tech expert. Deploys gadgets and hacking devices.',
      experienceMultiplier: 1.10,
      costInCurrency: 5000
    },

    mechanicJeff: {
      id: 'mechanic-jeff',
      name: 'Mechanic Jeff',
      class: 'engineer',
      avatar: 'assets/models/mechanic-jeff.model',
      faction: 'bravo',
      stats: {
        health: 100,
        armor: 22,
        speed: 8.0,
        stamina: 80,
        reloadSpeed: 1.0,
        turnSpeed: 0.95,
        jumpHeight: 0.90,
        firearmAccuracy: 0.78,
        meleeAccuracy: 0.80
      },
      startingWeapon: 'ump45',
      secondaryWeapon: 'glock19',
      abilities: ['deployMines', 'fortifyPosition', 'weaponRepair'],
      passiveAbilities: ['resourcefulness', 'durabilityBoost'],
      grenades: {
        fragmentationGrenade: 1,
        smokeGrenade: 2,
        mineGrenade: 3
      },
      equipment: {
        armor: 'reinforcedArmor',
        helmet: 'workerHelmet'
      },
      description: 'Demolitions expert. Sets traps and fortifies positions.',
      experienceMultiplier: 1.12,
      costInCurrency: 5500
    },

    // Medic Class
    doctoratica: {
      id: 'doctoratica',
      name: 'Doctor Atica',
      class: 'medic',
      avatar: 'assets/models/doctoratica.model',
      faction: 'alpha',
      stats: {
        health: 85,
        armor: 12,
        speed: 9.0,
        stamina: 90,
        reloadSpeed: 1.1,
        turnSpeed: 1.0,
        jumpHeight: 1.0,
        firearmAccuracy: 0.75,
        meleeAccuracy: 0.70
      },
      startingWeapon: 'mp5',
      secondaryWeapon: 'glock19',
      abilities: ['healAlly', 'areaHeal', 'reviveTeammate'],
      passiveAbilities: ['medicalExpertise', 'calmingPresence'],
      grenades: {
        smokeGrenade: 2,
        healGrenade: 3
      },
      equipment: {
        armor: 'medicalArmor',
        helmet: 'medicalHelmet'
      },
      description: 'Field medic. Supports team through healing.',
      experienceMultiplier: 1.25,
      costInCurrency: 4000
    },

    nurseRuth: {
      id: 'nurse-ruth',
      name: 'Nurse Ruth',
      class: 'medic',
      avatar: 'assets/models/nurse-ruth.model',
      faction: 'bravo',
      stats: {
        health: 88,
        armor: 14,
        speed: 9.2,
        stamina: 95,
        reloadSpeed: 1.05,
        turnSpeed: 1.05,
        jumpHeight: 1.05,
        firearmAccuracy: 0.76,
        meleeAccuracy: 0.72
      },
      startingWeapon: 'mp5',
      secondaryWeapon: 'glock19',
      abilities: ['instantHeal', 'areaRevive', 'healingAura'],
      passiveAbilities: ['improvementTech', 'bufferAura'],
      grenades: {
        smokeGrenade: 2,
        healGrenade: 4
      },
      equipment: {
        armor: 'medicalArmor',
        helmet: 'medicalHelmet'
      },
      description: 'Advanced medic support specialist.',
      experienceMultiplier: 1.30,
      costInCurrency: 4500
    }
  },

  /**
   * Character Abilities System
   */
  abilities: {
    // Assault Abilities
    fieldMedkit: {
      name: 'Field Medkit',
      type: 'active',
      cooldown: 30,
      duration: 2,
      effect: { healthRestore: 50 },
      range: 10,
      radius: 0,
      description: 'Use field medkit to restore 50 health.'
    },

    grenadeThrow: {
      name: 'Grenade Throw',
      type: 'active',
      cooldown: 5,
      duration: 0,
      effect: { damage: 75, radius: 8 },
      range: 50,
      radius: 8,
      description: 'Throw a grenade to damage enemies in radius.'
    },

    tacticialRoll: {
      name: 'Tactical Roll',
      type: 'active',
      cooldown: 3,
      duration: 0.5,
      effect: { dodgeChance: 1.0 },
      range: 0,
      radius: 0,
      description: 'Roll to dodge incoming damage.'
    },

    improvedWeaponHandling: {
      name: 'Improved Weapon Handling',
      type: 'passive',
      effect: { reloadSpeed: 1.10, aimSpeed: 1.05 },
      description: 'Increase reload speed and aim speed by 10%.'
    },

    // Rebel Abilities
    berserkerMode: {
      name: 'Berserker Mode',
      type: 'active',
      cooldown: 60,
      duration: 10,
      effect: { damageMultiplier: 1.5, speedBoost: 1.2, healthReduction: 0.8 },
      range: 0,
      radius: 0,
      description: 'Enter berserker rage. Increased damage and speed but reduced health.'
    },

    powerSlam: {
      name: 'Power Slam',
      type: 'active',
      cooldown: 45,
      duration: 1,
      effect: { damage: 150, knockback: 1.5, radius: 10 },
      range: 0,
      radius: 10,
      description: 'Slam the ground dealing massive damage.'
    },

    toughness: {
      name: 'Toughness',
      type: 'passive',
      effect: { armorBonus: 1.2, knockbackResistance: 0.7 },
      description: 'Increase armor by 20% and reduce knockback.'
    },

    // Sniper Abilities
    deathmark: {
      name: 'Death Mark',
      type: 'active',
      cooldown: 20,
      duration: 8,
      effect: { headshotDamage: 2.0, targetVisibility: true },
      range: 300,
      radius: 0,
      description: 'Mark target for increased headshot damage.'
    },

    distantShot: {
      name: 'Distant Shot',
      type: 'active',
      cooldown: 40,
      duration: 0,
      effect: { damage: 200, accuracy: 1.0 },
      range: 500,
      radius: 0,
      description: 'Fire a powerful shot from extreme distance.'
    },

    steadyHand: {
      name: 'Steady Hand',
      type: 'passive',
      effect: { accuracy: 1.15, recoil: 0.7 },
      description: 'Improve accuracy by 15% and reduce recoil.'
    },

    cloakMode: {
      name: 'Cloak Mode',
      type: 'active',
      cooldown: 50,
      duration: 8,
      effect: { invisibility: true, movementSpeed: 0.8 },
      range: 0,
      radius: 0,
      description: 'Become invisible for 8 seconds.'
    },

    nightVision: {
      name: 'Night Vision',
      type: 'passive',
      effect: { visionBonus: 1.5, darknessVisibility: true },
      description: 'See in darkness with enhanced vision.'
    },

    // Support Abilities
    areaBlast: {
      name: 'Area Blast',
      type: 'active',
      cooldown: 35,
      duration: 0,
      effect: { damage: 100, radius: 15 },
      range: 100,
      radius: 15,
      description: 'Blast area dealing damage to all enemies.'
    },

    machineGunBarrage: {
      name: 'Machine Gun Barrage',
      type: 'active',
      cooldown: 45,
      duration: 5,
      effect: { fireRateBoost: 2.0, damageBoost: 1.2 },
      range: 0,
      radius: 0,
      description: 'Unleash rapid fire for 5 seconds.'
    },

    suppressiveFire: {
      name: 'Suppressive Fire',
      type: 'active',
      cooldown: 20,
      duration: 6,
      effect: { accuracy: 0.7, enemyAimPenalty: 0.6 },
      range: 0,
      radius: 0,
      description: 'Pin down enemies with suppressive fire.'
    },

    // Recon Abilities
    speedBurst: {
      name: 'Speed Burst',
      type: 'active',
      cooldown: 15,
      duration: 5,
      effect: { speedBoost: 1.5 },
      range: 0,
      radius: 0,
      description: 'Boost movement speed for 5 seconds.'
    },

    scout: {
      name: 'Scout',
      type: 'active',
      cooldown: 30,
      duration: 10,
      effect: { enemyDetection: true, visionRange: 1.5 },
      range: 0,
      radius: 0,
      description: 'Scan area and reveal enemies.'
    },

    shadowDash: {
      name: 'Shadow Dash',
      type: 'active',
      cooldown: 10,
      duration: 0.3,
      effect: { speedBoost: 3.0, evasion: 1.0 },
      range: 0,
      radius: 0,
      description: 'Quick dash to evade attacks.'
    },

    silentAssassin: {
      name: 'Silent Assassin',
      type: 'active',
      cooldown: 60,
      duration: 10,
      effect: { invisibility: true, backstabDamage: 3.0 },
      range: 0,
      radius: 0,
      description: 'Become invisible and deal increased backstab damage.'
    },

    // Engineer Abilities
    deployTurret: {
      name: 'Deploy Turret',
      type: 'active',
      cooldown: 40,
      duration: 30,
      effect: { turretDamage: 20, turretFireRate: 0.1 },
      range: 50,
      radius: 0,
      description: 'Deploy an automated turret to assist.'
    },

    hackDevices: {
      name: 'Hack Devices',
      type: 'active',
      cooldown: 45,
      duration: 8,
      effect: { controlledDevices: true },
      range: 30,
      radius: 0,
      description: 'Hack enemy devices and turrets.'
    },

    deployMines: {
      name: 'Deploy Mines',
      type: 'active',
      cooldown: 25,
      duration: 0,
      effect: { mineDamage: 80, mineRadius: 6 },
      range: 10,
      radius: 6,
      description: 'Plant explosive mines.'
    },

    // Medic Abilities
    healAlly: {
      name: 'Heal Ally',
      type: 'active',
      cooldown: 5,
      duration: 0,
      effect: { healthRestore: 60 },
      range: 30,
      radius: 0,
      description: 'Heal a nearby ally for 60 health.'
    },

    areaHeal: {
      name: 'Area Heal',
      type: 'active',
      cooldown: 25,
      duration: 2,
      effect: { healthRestore: 40, radius: 15 },
      range: 50,
      radius: 15,
      description: 'Heal all allies in radius.'
    },

    reviveTeammate: {
      name: 'Revive Teammate',
      type: 'active',
      cooldown: 60,
      duration: 3,
      effect: { reviveHealth: 50 },
      range: 5,
      radius: 0,
      description: 'Revive fallen teammate.'
    },

    healingAura: {
      name: 'Healing Aura',
      type: 'passive',
      effect: { auraRadius: 15, healingPerSecond: 5 },
      description: 'Continuously heal nearby allies.'
    }
  },

  /**
   * Equipment System
   */
  equipment: {
    armor: {
      lightArmor: {
        name: 'Light Armor',
        protection: 10,
        weight: 2,
        mobility: 1.1,
        cost: 500
      },
      tacticalArmor: {
        name: 'Tactical Armor',
        protection: 20,
        weight: 4,
        mobility: 1.0,
        cost: 1000
      },
      heavyArmor: {
        name: 'Heavy Armor',
        protection: 40,
        weight: 8,
        mobility: 0.9,
        cost: 2000
      },
      explosiveProtection: {
        name: 'Explosive Protection',
        protection: 25,
        explosionResistance: 0.7,
        weight: 5,
        mobility: 0.95,
        cost: 1500
      },
      medicalArmor: {
        name: 'Medical Armor',
        protection: 15,
        healBonus: 1.2,
        weight: 3,
        mobility: 1.05,
        cost: 800
      }
    },

    helmets: {
      combatHelmet: {
        name: 'Combat Helmet',
        headshotReduction: 0.15,
        weight: 0.5,
        cost: 300
      },
      reinforcedHelmet: {
        name: 'Reinforced Helmet',
        headshotReduction: 0.25,
        weight: 1,
        cost: 500
      },
      tacticialHelmet: {
        name: 'Tactical Helmet',
        headshotReduction: 0.20,
        visionBonus: 1.1,
        weight: 0.6,
        cost: 400
      },
      medicalHelmet: {
        name: 'Medical Helmet',
        headshotReduction: 0.10,
        healBonus: 1.1,
        weight: 0.4,
        cost: 250
      },
      smartHelmet: {
        name: 'Smart Helmet',
        headshotReduction: 0.18,
        targetTracking: true,
        weight: 0.8,
        cost: 600
      }
    }
  },

  /**
   * Skill System
   */
  skills: {
    marksmanship: {
      name: 'Marksmanship',
      maxLevel: 10,
      baseDamage: 1.0,
      damagePerLevel: 0.05,
      description: 'Increase firearm damage.'
    },
    reflexes: {
      name: 'Reflexes',
      maxLevel: 10,
      baseReloadSpeed: 1.0,
      speedPerLevel: 0.05,
      description: 'Increase reload and reaction speed.'
    },
    endurance: {
      name: 'Endurance',
      maxLevel: 10,
      baseStamina: 100,
      staminaPerLevel: 10,
      description: 'Increase maximum stamina.'
    },
    tactics: {
      name: 'Tactics',
      maxLevel: 10,
      baseAbilityCooldown: 1.0,
      cooldownReductionPerLevel: 0.05,
      description: 'Reduce ability cooldowns.'
    },
    awareness: {
      name: 'Awareness',
      maxLevel: 10,
      baseVisionRange: 1.0,
      rangePerLevel: 0.1,
      description: 'Increase vision and detection range.'
    }
  },

  /**
   * Character Progression System
   */
  progression: {
    levels: {
      maxLevel: 50,
      experiencePerLevel: [
        100, 200, 350, 550, 800, 1100, 1450, 1850, 2300, 2800,
        3350, 3950, 4600, 5300, 6050, 6850, 7700, 8600, 9550, 10550,
        11600, 12700, 13850, 15050, 16300, 17600, 18950, 20350, 21800, 23300,
        24850, 26450, 28100, 29800, 31550, 33350, 35200, 37100, 39050, 41050,
        43100, 45200, 47350, 49550, 51800, 54100, 56450, 58850, 61300, 63800
      ]
    },

    ranks: {
      recruit: { minLevel: 1, maxLevel: 5, rewards: { currency: 100, battlePass: 50 } },
      soldier: { minLevel: 6, maxLevel: 10, rewards: { currency: 200, battlePass: 100 } },
      sergeant: { minLevel: 11, maxLevel: 20, rewards: { currency: 300, battlePass: 150 } },
      lieutenant: { minLevel: 21, maxLevel: 30, rewards: { currency: 400, battlePass: 200 } },
      captain: { minLevel: 31, maxLevel: 40, rewards: { currency: 500, battlePass: 250 } },
      general: { minLevel: 41, maxLevel: 50, rewards: { currency: 600, battlePass: 300 } }
    },

    achievements: {
      firstBlood: {
        name: 'First Blood',
        description: 'Get your first kill',
        reward: 250,
        difficulty: 'easy'
      },
      headhunter: {
        name: 'Headhunter',
        description: 'Get 10 headshots in a match',
        reward: 500,
        difficulty: 'medium'
      },
      killingSpree: {
        name: 'Killing Spree',
        description: 'Get 10 kills without dying',
        reward: 750,
        difficulty: 'hard'
      },
      teamSupporter: {
        name: 'Team Supporter',
        description: 'Deal 500 damage to enemies',
        reward: 300,
        difficulty: 'medium'
      }
    }
  }
};

// ============================================================================
// WEAPON-CHARACTER COMPATIBILITY SYSTEM
// ============================================================================

const CompatibilitySystem = {
  /**
   * Weapon Class bonuses per character class
   */
  classWeaponBonuses: {
    assault: {
      rifle: { damage: 1.1, accuracy: 1.05 },
      smg: { fireRate: 1.05, accuracy: 1.0 }
    },
    sniper: {
      sniper: { accuracy: 1.2, range: 1.15 },
      rifle: { accuracy: 1.1 }
    },
    support: {
      launcher: { damage: 1.15, weight: 0.9 },
      smg: { fireRate: 1.1 }
    },
    recon: {
      smg: { fireRate: 1.1, accuracy: 1.05 },
      rifle: { accuracy: 1.05 }
    },
    engineer: {
      smg: { accuracy: 1.1 },
      rifle: { accuracy: 1.05 }
    },
    medic: {
      pistol: { fireRate: 1.0, accuracy: 1.05 },
      smg: { fireRate: 1.05, accuracy: 1.1 }
    }
  },

  /**
   * Starting equipment templates per class
   */
  startingTemplates: {
    assault: {
      primaryWeapon: 'ak47',
      secondaryWeapon: 'glock19',
      melee: 'knife',
      armor: 'kevlarVest',
      helmet: 'combatHelmet'
    },
    sniper: {
      primaryWeapon: 'awp',
      secondaryWeapon: 'mp5',
      melee: 'knife',
      armor: 'lightArmor',
      helmet: 'tacticialHelmet'
    },
    support: {
      primaryWeapon: 'rpg7',
      secondaryWeapon: 'glock19',
      melee: 'axe',
      armor: 'heavyArmor',
      helmet: 'combatHelmet'
    },
    recon: {
      primaryWeapon: 'scar',
      secondaryWeapon: 'mp5',
      melee: 'knife',
      armor: 'lightArmor',
      helmet: 'tacticialHelmet'
    },
    engineer: {
      primaryWeapon: 'mp5',
      secondaryWeapon: 'glock19',
      melee: 'knife',
      armor: 'tacticalArmor',
      helmet: 'smartHelmet'
    },
    medic: {
      primaryWeapon: 'mp5',
      secondaryWeapon: 'glock19',
      melee: 'knife',
      armor: 'medicalArmor',
      helmet: 'medicalHelmet'
    }
  }
};

// ============================================================================
// EXPORT MODULES (for use in other files)
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WeaponSystem,
    CharacterSystem,
    CompatibilitySystem
  };
}

// If using ES6 modules
export { WeaponSystem, CharacterSystem, CompatibilitySystem };
