class ReplayGame extends Game {
    setToFrame(frame) {
        const frameData = replay.data[frame];

        for (const player of this.players) {
            //Object.assign(player, frameData.player);
            player.pos = frameData.player.pos;
            player.world = this.findPlayerWorldId(frameData);
            player.area = frameData.player.area;

            const playerArea = this.worlds[player.world].areas[player.area];

            if (frameData.area_updated && !playerArea.loaded) {
                switch (replay_state_reason.type) {
                    case 0: // Area change
                        break;
                    case 1: // World change
                        playerArea.load();
                        break;
                    case 2: // Pellet change
                        break;

                    default:
                        break;
                }
            }

            playerArea.setToFrame(frame);
        }
    }
    findPlayerWorldId(frameData) {
        for (let i = 0 ; i < this.worlds.length ; i++) {
            const world = this.worlds[i];
            if (world.id === frameData.player.world) {
                return i
            }
            else if (world.name === frameData.state.name) {
                return i
            }
        }
    }
}

class ReplayWorld extends World {
    constructor(pos, id, map) {
        super(pos, id, map);

        this.pos = pos;
        this.id = id;
        this.name = map.name;
        this.background_color = map.background_color;
        this.friction = map.friction;
        this.lighting = map.lighting;
        this.magnetism = map.magnetism;
        this.pellet_count = map.pellet_count;
        this.pellet_multiplier = map.pellet_multiplier;

        this.areas = [];
        for (const area of map.areas) {
            const replayArea = new ReplayArea(area.pos, area.id);

            const replayZones = [];
            const replayAssets = [];
            const replayEffects = {};
            const replayEntities = {};
            const replayStaticEntities = {};

            for (const zone of area.zones) {
                // Zone
                const zonePos = new Vector(zone.x, zone.y);
                const replayZone = new Zone(zonePos, zone.size, zone.type);

                Object.assign(replayZone, zone);
                replayZones.push(replayZone);
            }

            for (const asset of area.assets) {
                // Asset
                const assetPos = new Vector(asset.x, asset.y);
                const newAsset = new Asset(assetPos, asset.size, asset.type);

                Object.assign(newAsset, asset);

                replayAssets.push(newAsset);
            }

            // Effects
            // May be fine to leave since it gets simluated in the replay

            for (const [type, entityList] of Object.entries(area.entities)) {
                const replayEntityList = [];

                for (const entity of entityList) {
                    const replayEntity = replayArea.createEnemy(type, entity.pos.x, entity.pos.y, entity.radius, entity.speed, entity.angle, area.preset, entity.auraSize * 32, 2, 1);

                    Object.assign(replayEntity, entity);
                    replayEntityList.push(replayEntity);
                }

                replayEntities[type] = replayEntityList;
            }

            /*
            for (const [type, staticEntityList] of Object.entries(area.static_entities)) {
                // Static Entity
                const replayStaticEntityList = [];

                for (const staticEntity of staticEntityList) {
                    const replayStaticEntity = replayArea.addEntity(type, staticEntity);

                    Object.assign(replayStaticEntity, staticEntity);
                    replayStaticEntityList.push(replayStaticEntity);
                }

                replayStaticEntities[type] = replayStaticEntityList;
            }
            */

            Object.assign(replayArea, {
                name: area.name,
                background_color: area.background_color,
                title_stroke_color: area.title_stroke_color,
                text: area.text || String.empty,
                lighting: area.lighting,
                pellet_count: area.pellet_count,
                pellet_multiplier: area.pellet_multiplier,
                texture: area.texture,
                zones: replayZones,
                assets: replayAssets,
                effects: replayEffects,
                entities: replayEntities,
                static_entities: replayStaticEntities,
                preset: [] //area.preset,
            });

            this.areas.push(replayArea);
        }
    }
    fromJson(json) {
        this.name = json.name;
    }
    entityIdentifier() {
        return this.id;
    }
}

class ReplayArea extends Area {
    constructor(pos) {
        super(pos);
        this.loaded = false;
    }
    load() {
        const boundary = this.getActiveBoundary();
        this.spawnPellets(boundary);
        this.spawnEnemies();
        this.loaded = true;
    }
    setToFrame(frame) {
        const replayArea = replay.data[frame].state;

        /*
        // Assets
        this.assets.forEach((asset, i) => {
            Object.assign(asset, replayArea[i]);
        });

        // Effects
        this.effects.forEach((effect) => {

        })
        */

        // Entities
        Object.entries(this.entities).forEach(([type, entityList]) => {
            entityList.forEach((entity, i) => {
                Object.assign(entity, replayArea.entities[type][i]);
            });
        });

        // Static Entities
        Object.entries(this.static_entities).forEach(([type, entityList]) => {
            entityList.forEach((entity, j) => {
                const replayEntity = replayArea.static_entities[type][j];

                const scaleOscillator = entity.scaleOscillator;
                const pos = entity.pos;
                const vel = entity.vel;


                Object.assign(scaleOscillator, replayEntity.scaleOscillator);
                Object.assign(pos, replayEntity.pos);
                Object.assign(vel, replayEntity.vel);

                replayEntity.scaleOscillator = scaleOscillator;
                replayEntity.pos = pos;
                replayEntity.vel = vel;

                Object.assign(entity, replayEntity);
            });
        });

        Object.assign(this, {
            lighting: replayArea.lighting,
            texture: replayArea.texture,
        });
    }
}