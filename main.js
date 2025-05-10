const staticWidth = width,
  staticHeight = height;
let game = new Game();
const inputArray = [];
const replayControls = {
  play_pause: " ",
  advance_frame: "ArrowRight",
  rewind_frame: "ArrowLeft",
  increase_playback_speed: "ArrowUp",
  decrease_playback_speed: "ArrowDown",
  reset: "r",
  minimap: "m",
  hero_card: "h",
  play_in_place: "p",
  camera_up: "w",
  camera_down: "s",
  camera_left: "a",
  camera_right: "d",
  camera_zoom_out: "q",
  camera_zoom_in: "e",
  camera_reset: "f",
};
const cameraControls = {};
let isCustomWorld = true;
let mousePos = new Vector(0, 0);
let mouse = false;
let loaded = false;
let lastRender = 0;
let fov = 32;
let frame = 0;
let play_replay = false;
let replay_loaded = false;
const replay_state_reason = { type: 1, reason: "World changed" };
let replay = { initial: {}, data: [], worlds: [] };
let replayData = {
  area: {},
  player: {},
  input: {},
  area_updated: true,
};
const cameraOffset = { x: 0, y: 0 };
const staticCameraPos = { x: 0, y: 0 };
const cameraSpeed = 0.5;
let areaUpdated = true;
const isCameraStatic = true;
let detachedCamera = false;

function loadMain() {
  isCustomWorld = false;
  game.worlds.push(
    new World(new Vector(0, 0), 0, CENTRAL_CORE),
    new World(new Vector(7399, 0), 1, CENTRL_CORE_HARD),
    new World(new Vector(15040, 0), 2, CATASTROPHIC_CORE),
    new World(new Vector(-110, -22), 3, STELLAR_SQUARE),
    new World(new Vector(-110, -356), 4, STELLAR_SQUARE_HARD),
    new World(new Vector(0, 80), 5, HAUNTED_HALLS),
    new World(new Vector(14904, 2392), 6, MYSTERIOUS_MANSION),
    new World(new Vector(16770, 2480), 7, COUPLED_CORRIDORS),
    new World(new Vector(0, 240), 8, PECULIAR_PYRAMID),
    new World(new Vector(15719, 240), 9, PECULIAR_PYRAMID_HARD),
    new World(new Vector(100, 240), 10, SHIFTING_SANDS),
    new World(new Vector(2290, 418), 11, DUSTY_DEPTHS),
    new World(new Vector(0, 889), 12, WACKY_WONDERLAND),
    new World(new Vector(14900, 889), 13, WACKY_WONDERLAND_HARD),
    new World(new Vector(0, 969), 14, GLACIAL_GORGE),
    new World(new Vector(7397, 969), 15, GLACIAL_GORGE_HARD),
    new World(new Vector(0, 1049), 16, VICIOUS_VALLEY),
    new World(new Vector(7397, 1049), 17, VICIOUS_VALLEY_HARD),
    new World(new Vector(0, 1130), 18, HUMONGOUS_HOLLOW),
    new World(new Vector(14900, 1130), 19, HUMONGOUS_HOLLOW_HARD),
    new World(new Vector(0, 1210), 20, ELITE_EXPANSE),
    new World(new Vector(14900, 1210), 21, ELITE_EXPANSE_HARD),
    new World(new Vector(0, 1290), 22, ENDLESS_ECHO),
    new World(new Vector(-111, 1290), 23, ENDLESS_ECHO_HARD),
    new World(new Vector(0, 1370), 24, DANGEROUS_DISTRICT),
    new World(new Vector(14900, 1370), 25, DANGEROUS_DISTRICT_HARD),
    new World(new Vector(0, 1450), 26, QUIET_QUARRY),
    new World(new Vector(7397, 1450), 27, QUIET_QUARRY_HARD),
    new World(new Vector(0, 1529), 28, MONUMENTAL_MIGRATION),
    new World(new Vector(0, 1609), 29, OMINOUS_OCCULT),
    new World(new Vector(7397, 1609), 30, OMINOUS_OCCULT_HARD),
    new World(new Vector(0, 1770), 31, FROZEN_FJORD),
    new World(new Vector(7397, 1770), 32, FROZEN_FJORD_HARD),
    new World(new Vector(-108.4, 2392), 33, RESTLESS_RIDGE),
    new World(new Vector(7397, 2392), 34, RESTLESS_RIDGE_HARD),
    new World(new Vector(0, 5947), 35, TOXIC_TERRITORY),
    new World(new Vector(5260, 5947), 36, TOXIC_TERRITORY_HARD),
    new World(new Vector(0, 6027), 37, MAGNETIC_MONOPOLE),
    new World(new Vector(5260, 6027), 38, MAGNETIC_MONOPOLE_HARD),
    new World(new Vector(-108.4, 6645), 39, BURNING_BUNKER),
    new World(new Vector(5260, 6645), 40, BURNING_BUNKER_HARD),
    new World(new Vector(0, 7623), 41, GRAND_GARDEN),
    new World(new Vector(5260, 7623), 42, GRAND_GARDEN_HARD),
    new World(new Vector(0, 8220), 43, CYBER_CASTLE),
    new World(new Vector(1242, 9110), 44, CYBER_CASTLE_HARD),
    new World(new Vector(207, 8220), 45, RESEARCH_LAB),
    new World(new Vector(0, 8300), 46, INFINITE_INFERNO),
    new World(new Vector(0, 9651), 47, WITHERING_WASTELAND),
    new World(new Vector(0, 9731), 48, TERRIFYING_TEMPLE)
  );
}

function loadHard() {
  isCustomWorld = false;
  game.worlds.push(
    new World(new Vector(0, 0), 0, CENTRAL_CORE_FAST),
    //new World(new Vector(85373, 1529), 1, CENTRAL_CORE_50),
    //new World(new Vector(85373, 1529), 2, CENTRAL_CORE_ROUTE_2),
    new World(new Vector(-61, -15), 2, STELLAR_SQUARE_HARD),
    //new World(new Vector(0, 80), 4, ASSORTED_ALCOVE_OLD),
    new World(new Vector(-61, 1440), 3, ASSORTED_ALCOVE),
    new World(new Vector(5194, 0), 4, ASSORTED_ALCOVE_HARD),
    //new World(new Vector(85373, 1529), 5, MONUMENTAL_MIGRATION_HARD),
    //new World(new Vector(0, 0), 6, TRANSFORMING_TURBIDITY),
    //new World(new Vector(0, 357 * (32 / 18)), 7, BALLISTIC_BATTLEFIELD),
    //new World(new Vector(0, 969), 8, SWITCH_STATION),
  );
}

function loadSecondary() {
  isCustomWorld = false;
  game.worlds.push(
    new World(new Vector(0, 0), 0, TRANSFORMING_TURBIDITY),
    new World(new Vector(0, 45 * (32 / 18)), 1, UNEXPLORED_UTOPIA),
    new World(new Vector(0, 90 * (32 / 18)), 2, LITTLE_LANDSCAPE),
    new World(new Vector(0, 132 * (32 / 18)), 3, DARKNESS_DIMENSION),
    new World(new Vector(0, 177 * (32 / 18)), 4, CROWDED_CAVERN),
    new World(new Vector(0, 222 * (32 / 18)), 5, CENTRAL_CORE_IMPOSSIBLE),
    new World(new Vector(0, 267 * (32 / 18)), 6, TRANSFORMING_TURBIDITY_IMPOSSIBLE),
    new World(new Vector(0, 312 * (32 / 18)), 7, ELONGATING_ESCALATORS),
    new World(new Vector(0, 357 * (32 / 18)), 8, BALLISTIC_BATTLEFIELD),
    new World(new Vector(0, 402 * (32 / 18)), 9, INSANITY_ISLE),
    new World(new Vector(0, 447 * (32 / 18)), 10, NATURAL_NIGHTMARE)
  );
}

function loadReplay() {
  if (replay.initial.isSandbox) {
    replay.worlds.forEach((world, i) => {
      game.worlds.push(new ReplayWorld(new Vector(world.pos.x, world.pos.y), i, world));
    })
  }
  else {
    replay.worlds.forEach((world, i) => {
      game.worlds.push(new ReplayWorld(new Vector((world.pos.x - 1952) / 32, world.pos.y / 32), i, world));
    })
  }
}

function loadEvadesReplay() {

}

const images = {
  tiles: new Image(),
  hat: new Image(),
  gem: new Image(),
  magnetDown: new Image(),
  magnetUp: new Image(),
  pumpkinOn: new Image(),
  pumpkinOff: new Image(),
  lotusOn: new Image(),
  lotusOff: new Image(),
  torch: new Image(),
  torchUp: new Image(),
  flashlight_item: new Image(),
  flashlight: new Image(),
  abilityOne: new Image(),
  abilityTwo: new Image(),
  sweet_tooth_item: new Image(),
  vengeance_projectile: new Image(),
  ninja_star_sniper_projectile: new Image(),
  gate: new Image(),
  lantern: new Image()
};
let tick_time, tick_speed = 1;
const missing_world = new World(new Vector(0, 0), 0, MISSING_MAP);

// calculate fps (dev mode only)
const filterStrength = 25;
let frameTime = 0, lastLoop = new Date, thisLoop;

function animate(time) {
  const progress = settings.fps_limit === "unlimited" ? Math.min(time - lastRender, 1000) : tick_time;

  if (settings.fps_limit === "unlimited") {
    window.requestAnimationFrame(animate);
  }

  if (!inMenu) {
    if (settings.dev) calculateFps();
    updateBackground(context, width, height, '#333');

    const input = { keys: [...keys], mouse: mousePos, isMouse: mouse };

    if (settings.slow_upgrade) {
      const allowedKeys = [KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.DOWN, KEYS.W, KEYS.A, KEYS.S, KEYS.D, KEYS.SHIFT];
      Object.keys(keys).forEach(key => {
        if (keys[key] && !allowedKeys.includes(parseInt(key))) {
          keys[key] = false;
        }
      });
    }

    const player = game.players[0];

    if (inputArray.length > settings.tick_delay && settings.fps_limit !== "unlimited" && settings.tick_delay > 0) {
      inputArray.splice(0, inputArray.length - settings.tick_delay);
      game.inputPlayer(0, inputArray[0]);
    } else {
      game.inputPlayer(0, input);
    }
    inputArray.push(input);

    const oldArea = player.area;
    const oldWorld = player.world;

    handleReplay(areaUpdated, input);
    game.update(progress * tick_speed);

    const world = game.worlds[player.world];
    const area = world.areas[player.area];
    const wasVictory = area.getActiveBoundary().t;
    const strokeColor = area.title_stroke_color || "#425a6d";
    const areaText = wasVictory ? "Victory!" : area.name;
    const areaChanged = oldArea !== player.area;
    const worldChanged = oldWorld !== player.world;
    areaUpdated = areaChanged || worldChanged;

    if (areaChanged) {
      // This may not be needed, but just in case
      replay_state_reason.type = 0;
      replay_state_reason.reason = "Area changed";
    }

    if (worldChanged) {
      replay_state_reason.type = 1;
      replay_state_reason.reason = "World changed";
    }

    renderArea(game.getStates(0), game.players, player.pos, areaUpdated);

    applyScale(context, settings.scale, () => {
      drawAreaHeader(context, 6, strokeColor, areaText, staticWidth, 40, world);

      if (settings.timer) {
        const style = player.victoryTimer > 0 ? 'yellow' : null;
        const timerTime = secondsFormat(Math.floor(player.timer / 1000));
        drawAreaHeader(context, 6, strokeColor, timerTime, staticWidth, 80, null, 30, style);
      }

      if (settings.world.selectedIndex === 3 && !loaded) {
        area.text = "this is to import a map, top left in the menu";
      }

      if (area.text) {
        const size = world.selectedIndex === 2 && player.area === 0 ? 35 : 25;
        drawAreaHeader(context, 5, "#006b2c", area.text, staticWidth, staticHeight - 120, null, size, "#00ff6b");
      }
    });
  }

  lastRender = time;
}

function playReplay() {
  if (settings.fps_limit === "unlimited") {
    window.requestAnimationFrame(playReplay);
  }

  if (!inMenu) {
    updateBackground(context, width, height, '#333');

    const player = game.players[0];
    const oldArea = player.area;
    const oldWorld = player.world;

    game.setToFrame(frame);

    const world = game.worlds[player.world];
    const area = world.areas[player.area];
    const wasVictory = area.getActiveBoundary().t;
    const strokeColor = area.title_stroke_color || "#425a6d";
    const areaText = wasVictory ? "Victory!" : area.name;
    areaChanged = oldArea !== player.area;
    worldChanged = oldWorld !== player.world;
    areaUpdated = areaChanged || worldChanged;
    
    renderArea(game.getStates(0), game.players, handleCamera(player.pos), areaUpdated);

    applyScale(context, settings.scale, () => {
      drawAreaHeader(context, 6, strokeColor, areaText, staticWidth, 40, world);

      if (settings.timer) {
        const style = player.victoryTimer > 0 ? 'yellow' : null;
        const timerTime = secondsFormat(Math.floor(player.timer / 1000));
        drawAreaHeader(context, 6, strokeColor, timerTime, staticWidth, 80, null, 30, style);
      }

      if (area.text) {
        drawAreaHeader(context, 5, "#006b2c", area.text, staticWidth, staticHeight - 120, null, 25, "#00ff6b");
      }
    });

    // Will be changed for full controls in future time
    if (canAdvanceFrame() && play_replay) {
      frame++;
    }
    else {
      play_replay = false;
    }
  }
}

function handleCamera(playerPos) {
  if (!isCameraStatic) {
    return new Vector(playerPos.x + cameraOffset.x, playerPos.y + cameraOffset.y);
  }

  if (detachedCamera) {
    return new Vector(staticCameraPos.x + cameraOffset.x, staticCameraPos.y + cameraOffset.y);
  }

  staticCameraPos.x = playerPos.x;
  staticCameraPos.y = playerPos.y;

  return playerPos;
}

function startAnimation() {
  const fpsLimit = settings.fps_limit;

  if (fpsLimit === "unlimited") {
    requestAnimationFrame(animate);
  } else {
    tick_time = 1000 / parseInt(fpsLimit);

    if (!settings.v_sync) {
      const gameInterval = new interval(tick_time, animate);
      gameInterval.run();
    } else {
      let lastTime = 0;

      function animateRAF(currentTime) {
        if (currentTime - lastTime >= tick_time) {
          animate(currentTime);
          lastTime = currentTime - ((currentTime - lastTime) % tick_time);
        }
        requestAnimationFrame(animateRAF);
      }

      requestAnimationFrame(animateRAF);
    }
  }
}

function startReplay() {
  const fpsLimit = settings.fps_limit;

  if (fpsLimit === "unlimited") {
    requestAnimationFrame(playReplay);
  } else {
    tick_time = 1000 / parseInt(fpsLimit);

    if (!settings.v_sync) {
      const gameInterval = new interval(tick_time, playReplay);
      gameInterval.run();
    } else {
      let lastTime = 0;

      function animateRAF(currentTime) {
        if (currentTime - lastTime >= tick_time) {
          playReplay(currentTime);
          lastTime = currentTime - ((currentTime - lastTime) % tick_time);
        }
        requestAnimationFrame(animateRAF);
      }

      requestAnimationFrame(animateRAF);
    }
  }
}

function getArea() {
  var player = game.players[0];
  var obj = {}
  var area = game.worlds[player.world].areas[player.area]
  obj.name = game.worlds[player.world].name;
  obj.zones = area.zones;
  obj.assets = area.assets;
  obj.entities = area.entities;
  obj.static_entities = area.static_entities;
  obj.effects = area.effects;
  obj.background_color = area.background_color;
  obj.lighting = area.lighting;
  obj.texture = area.texture || 0;
  //obj.variables = area.variables;
  //obj.pattern_amount = area.pattern_amount;
  obj.text = area.text;
  obj.pos = new Vector(area.pos.x + game.worlds[player.world].pos.x, area.pos.y + game.worlds[player.world].pos.y);
  obj.boundary = area.getBoundary();
  obj.magnetism = area.magnetism;
  obj.partial_magnetism = area.partial_magnetism;
  obj.applies_lantern = area.applies_lantern;
  obj.pellet_count = area.pellet_count;
  obj.pellet_multiplier = area.multiplier;
  obj.boss = area.boss;
  return obj;
}

function handleReplay(area_has_updated, input) {
  if (area_has_updated) {
    const newlyAddedWorld = game.worlds[game.players[0].world];
    //replayData.state_change_reason = replay_state_reason;
    //replayData.settings = settings;

    let valid = true;
    for (const world of replay.worlds) {
      if (world.id === newlyAddedWorld.id || world.name === newlyAddedWorld.name) {
        valid = false;
      }
    }

    if (valid) {
      replay.worlds.push(newlyAddedWorld);
    }
  }

  replayData = {
    player: { ...game.players[0] },
    area: structuredClone(getArea()), //area,
    area_updated: area_has_updated,
    input: input,
    //frame: frame
    //state_change_type: replay_state_reason.type,
  };

  replay.data.push(replayData);
  replayData = {};

  frame++;
}