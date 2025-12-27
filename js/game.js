/**
 * 3D Shooter Game Engine
 * Core game loop, scene management, and game state handling
 */

class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true,
            alpha: true 
        });
        
        this.setupRenderer();
        this.setupCamera();
        this.setupLighting();
        
        // Game state
        this.gameState = {
            isRunning: false,
            isPaused: false,
            score: 0,
            health: 100,
            ammo: 120,
            level: 1,
            waves: [],
            currentWave: 0,
            enemies: [],
            projectiles: [],
            particles: [],
            gameTime: 0
        };
        
        // Game objects
        this.player = null;
        this.camera = null;
        this.skybox = null;
        this.terrain = null;
        this.hud = null;
        this.audioManager = null;
        this.inputManager = null;
        this.particleSystem = null;
        this.effectsManager = null;
        
        // Performance tracking
        this.stats = {
            fps: 0,
            deltaTime: 0,
            lastFrameTime: Date.now()
        };
        
        // Loop control
        this.animationFrameId = null;
        this.isPaused = false;
        
        // Initialize managers
        this.initializeManagers();
    }
    
    setupRenderer() {
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }
    
    setupCamera() {
        this.camera.position.set(0, 1.6, 0);
        this.camera.near = 0.1;
        this.camera.far = 1000;
        this.camera.updateProjectionMatrix();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -200;
        directionalLight.shadow.camera.right = 200;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -200;
        this.scene.add(directionalLight);
        this.directionalLight = directionalLight;
        
        // Fog
        this.scene.fog = new THREE.Fog(0x000000, 0.5, 500);
    }
    
    initializeManagers() {
        this.inputManager = new InputManager();
        this.audioManager = new AudioManager();
        this.particleSystem = new ParticleSystem(this.scene);
        this.effectsManager = new EffectsManager(this.scene, this.particleSystem);
        this.hud = new HUD(this.gameState);
    }
    
    /**
     * Initialize the game world
     */
    async initializeGame() {
        try {
            console.log('Initializing game...');
            
            // Load assets asynchronously
            await this.loadAssets();
            
            // Create game world
            this.createSkybox();
            this.createTerrain();
            this.createPlayer();
            this.createInitialEnemies();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Start game loop
            this.start();
            
            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showErrorMessage('Failed to initialize game. Please refresh.');
        }
    }
    
    /**
     * Load game assets
     */
    async loadAssets() {
        const textureLoader = new THREE.TextureLoader();
        const modelLoader = new THREE.GLTFLoader();
        
        // Load textures
        const groundTexture = await textureLoader.loadAsync('assets/textures/ground.jpg');
        groundTexture.repeat.set(4, 4);
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        
        this.assets = {
            groundTexture: groundTexture,
            modelLoader: modelLoader
        };
    }
    
    /**
     * Create skybox
     */
    createSkybox() {
        const geometry = new THREE.SphereGeometry(450, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x1a1a2e,
            side: THREE.BackSide
        });
        this.skybox = new THREE.Mesh(geometry, material);
        this.scene.add(this.skybox);
    }
    
    /**
     * Create terrain/ground plane
     */
    createTerrain() {
        const geometry = new THREE.PlaneGeometry(500, 500);
        const material = new THREE.MeshStandardMaterial({
            color: 0x444444,
            map: this.assets?.groundTexture || undefined,
            metalness: 0.1,
            roughness: 0.8
        });
        
        this.terrain = new THREE.Mesh(geometry, material);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.receiveShadow = true;
        this.scene.add(this.terrain);
        
        // Add boundary walls
        this.createBoundaryWalls();
    }
    
    /**
     * Create boundary walls
     */
    createBoundaryWalls() {
        const wallHeight = 50;
        const worldSize = 250;
        
        const walls = [
            { pos: [0, wallHeight / 2, worldSize], rot: [0, 0, 0] }, // Back
            { pos: [0, wallHeight / 2, -worldSize], rot: [0, 0, 0] }, // Front
            { pos: [worldSize, wallHeight / 2, 0], rot: [0, 0, 0] }, // Right
            { pos: [-worldSize, wallHeight / 2, 0], rot: [0, 0, 0] } // Left
        ];
        
        walls.forEach(wallData => {
            const geometry = new THREE.PlaneGeometry(worldSize * 2, wallHeight);
            const material = new THREE.MeshStandardMaterial({
                color: 0x222222,
                metalness: 0.3,
                roughness: 0.7
            });
            
            const wall = new THREE.Mesh(geometry, material);
            wall.position.set(...wallData.pos);
            wall.rotation.set(...wallData.rot);
            wall.receiveShadow = true;
            this.scene.add(wall);
        });
    }
    
    /**
     * Create player
     */
    createPlayer() {
        this.player = new Player(this.scene, this.camera);
        this.player.position.set(0, 0, 50);
    }
    
    /**
     * Create initial enemies for wave 1
     */
    createInitialEnemies() {
        this.startWave(1);
    }
    
    /**
     * Start a new wave of enemies
     */
    startWave(waveNumber) {
        const enemyCount = 3 + (waveNumber * 2);
        
        for (let i = 0; i < enemyCount; i++) {
            const angle = (i / enemyCount) * Math.PI * 2;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            const enemy = new Enemy(this.scene, {
                position: [x, 0, z],
                health: 30 + (waveNumber * 5),
                speed: 0.03 + (waveNumber * 0.01),
                damage: 10 + (waveNumber * 2)
            });
            
            this.gameState.enemies.push(enemy);
        }
        
        this.gameState.currentWave = waveNumber;
        console.log(`Wave ${waveNumber} started with ${enemyCount} enemies`);
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle pause/unpause
        document.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P') {
                this.togglePause();
            }
        });
        
        // Handle fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                this.toggleFullscreen();
            }
        });
    }
    
    /**
     * Toggle game pause
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        this.gameState.isPaused = this.isPaused;
        
        if (this.isPaused) {
            console.log('Game paused');
            this.hud.showPauseMenu();
            this.audioManager.pauseAll();
        } else {
            console.log('Game resumed');
            this.hud.hidePauseMenu();
            this.audioManager.resumeAll();
        }
    }
    
    /**
     * Toggle fullscreen
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().catch(err => {
                console.error('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    /**
     * Handle window resize
     */
    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    /**
     * Start the game
     */
    start() {
        this.gameState.isRunning = true;
        this.stats.lastFrameTime = Date.now();
        this.gameLoop();
    }
    
    /**
     * Stop the game
     */
    stop() {
        this.gameState.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
    
    /**
     * Main game loop
     */
    gameLoop() {
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
        
        // Calculate delta time
        const currentTime = Date.now();
        this.stats.deltaTime = (currentTime - this.stats.lastFrameTime) / 1000;
        this.stats.lastFrameTime = currentTime;
        
        // Cap delta time to prevent large jumps
        const dt = Math.min(this.stats.deltaTime, 0.033); // Cap at 30ms
        
        if (!this.isPaused && this.gameState.isRunning) {
            // Update game logic
            this.update(dt);
            
            // Render scene
            this.render();
            
            // Update HUD
            this.hud.update(this.gameState, this.stats);
        }
    }
    
    /**
     * Update game logic
     */
    update(dt) {
        // Update game time
        this.gameState.gameTime += dt;
        
        // Update player
        if (this.player) {
            this.player.update(dt, this.inputManager, this.scene);
            this.gameState.health = this.player.health;
            this.gameState.ammo = this.player.ammo;
        }
        
        // Update camera to follow player
        this.updateCamera(dt);
        
        // Update enemies
        this.updateEnemies(dt);
        
        // Update projectiles
        this.updateProjectiles(dt);
        
        // Update particles
        this.particleSystem.update(dt);
        
        // Check collisions
        this.checkCollisions();
        
        // Check wave completion
        this.checkWaveCompletion();
        
        // Check game over
        this.checkGameOver();
    }
    
    /**
     * Update camera position to follow player
     */
    updateCamera(dt) {
        if (this.player) {
            // First-person camera
            const targetPos = this.player.position.clone();
            targetPos.y += 1.6; // Eye height
            
            // Smooth camera movement
            this.camera.position.lerp(targetPos, 0.1);
            
            // Camera rotation based on mouse
            const mouseX = this.inputManager.mouse.x;
            const mouseY = this.inputManager.mouse.y;
            
            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y = mouseX;
            this.camera.rotation.x = mouseY;
        }
    }
    
    /**
     * Update all enemies
     */
    updateEnemies(dt) {
        for (let i = this.gameState.enemies.length - 1; i >= 0; i--) {
            const enemy = this.gameState.enemies[i];
            
            // Update enemy
            enemy.update(dt);
            
            // Make enemy look at player
            if (this.player) {
                enemy.lookAt(this.player.position);
            }
            
            // Enemy attack
            if (this.player && this.player.health > 0) {
                enemy.attack(this.player, dt, this.scene, this.audioManager);
            }
            
            // Remove dead enemies
            if (enemy.health <= 0) {
                this.removeEnemy(i);
            }
        }
    }
    
    /**
     * Update all projectiles
     */
    updateProjectiles(dt) {
        for (let i = this.gameState.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.gameState.projectiles[i];
            
            // Update projectile position
            projectile.update(dt);
            
            // Remove projectiles that are too old or out of bounds
            if (projectile.lifetime <= 0 || projectile.position.length() > 300) {
                this.removeProjectile(i);
            }
        }
    }
    
    /**
     * Check all collisions
     */
    checkCollisions() {
        // Projectile-Enemy collisions
        for (let i = this.gameState.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.gameState.projectiles[i];
            
            for (let j = this.gameState.enemies.length - 1; j >= 0; j--) {
                const enemy = this.gameState.enemies[j];
                
                if (this.checkSphereCollision(projectile.position, enemy.position, 2)) {
                    // Hit detected
                    enemy.takeDamage(projectile.damage);
                    this.gameState.score += 10;
                    
                    // Create impact effect
                    this.effectsManager.createImpactEffect(projectile.position);
                    this.audioManager.play('hit');
                    
                    // Remove projectile
                    this.removeProjectile(i);
                    break;
                }
            }
        }
        
        // Enemy-Player collisions
        if (this.player) {
            for (const enemy of this.gameState.enemies) {
                if (this.checkSphereCollision(this.player.position, enemy.position, 3)) {
                    this.player.takeDamage(enemy.damage * 0.016); // Reduce damage over time
                    this.effectsManager.createDamageEffect();
                }
            }
        }
    }
    
    /**
     * Check sphere collision
     */
    checkSphereCollision(pos1, pos2, radius) {
        const distance = pos1.distanceTo(pos2);
        return distance < radius * 2;
    }
    
    /**
     * Check if wave is completed
     */
    checkWaveCompletion() {
        if (this.gameState.enemies.length === 0 && this.gameState.isRunning) {
            this.startWave(this.gameState.currentWave + 1);
            this.gameState.score += 500; // Wave bonus
            this.audioManager.play('waveComplete');
        }
    }
    
    /**
     * Check game over condition
     */
    checkGameOver() {
        if (this.player && this.player.health <= 0) {
            this.endGame();
        }
    }
    
    /**
     * Remove enemy from scene and state
     */
    removeEnemy(index) {
        const enemy = this.gameState.enemies[index];
        if (enemy) {
            enemy.remove();
            this.gameState.enemies.splice(index, 1);
        }
    }
    
    /**
     * Remove projectile from scene and state
     */
    removeProjectile(index) {
        const projectile = this.gameState.projectiles[index];
        if (projectile) {
            projectile.remove();
            this.gameState.projectiles.splice(index, 1);
        }
    }
    
    /**
     * Render scene
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * End game
     */
    endGame() {
        this.stop();
        this.hud.showGameOver(this.gameState.score, this.gameState.currentWave);
        this.audioManager.play('gameOver');
    }
    
    /**
     * Restart game
     */
    restart() {
        // Clear scene
        this.scene.clear();
        
        // Reset game state
        this.gameState = {
            isRunning: false,
            isPaused: false,
            score: 0,
            health: 100,
            ammo: 120,
            level: 1,
            waves: [],
            currentWave: 0,
            enemies: [],
            projectiles: [],
            particles: [],
            gameTime: 0
        };
        
        // Reinitialize game
        this.setupLighting();
        this.initializeGame();
    }
    
    /**
     * Show error message
     */
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

/**
 * Input Manager - Handles keyboard and mouse input
 */
class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            locked: false
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            const sensitivity = 0.002;
            this.mouse.dx = e.movementX * sensitivity;
            this.mouse.dy = e.movementY * sensitivity;
            
            this.mouse.x += this.mouse.dx;
            this.mouse.y += this.mouse.dy;
            
            // Clamp vertical rotation
            this.mouse.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.mouse.y));
        });
        
        // Pointer lock
        document.addEventListener('click', () => {
            document.body.requestPointerLock = document.body.requestPointerLock || 
                                              document.body.mozRequestPointerLock;
            document.body.requestPointerLock();
        });
    }
    
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }
    
    getMovementVector() {
        const vector = new THREE.Vector3();
        
        if (this.isKeyPressed('w')) vector.z -= 1;
        if (this.isKeyPressed('s')) vector.z += 1;
        if (this.isKeyPressed('a')) vector.x -= 1;
        if (this.isKeyPressed('d')) vector.x += 1;
        if (this.isKeyPressed(' ')) vector.y += 1;
        if (this.isKeyPressed('control')) vector.y -= 1;
        
        if (vector.length() > 0) {
            vector.normalize();
        }
        
        return vector;
    }
}

/**
 * Player class
 */
class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.position = new THREE.Vector3(0, 0, 0);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = new THREE.Vector3(0, 0, 0);
        
        this.health = 100;
        this.maxHealth = 100;
        this.ammo = 120;
        this.maxAmmo = 120;
        this.speed = 0.1;
        this.jumpForce = 0.15;
        this.gravity = 0.01;
        
        this.isGrounded = true;
        this.fireRate = 0.1;
        this.lastFireTime = 0;
        
        this.createWeapon();
    }
    
    createWeapon() {
        const weaponGeometry = new THREE.BoxGeometry(0.3, 0.3, 1.5);
        const weaponMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        this.weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
        this.weapon.position.set(0.3, -0.2, -0.5);
        this.weapon.castShadow = true;
    }
    
    update(dt, inputManager, scene) {
        // Get movement input
        const moveVector = inputManager.getMovementVector();
        
        // Apply movement in camera space
        const forward = new THREE.Vector3(0, 0, -1);
        forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), inputManager.mouse.x);
        
        const right = new THREE.Vector3(1, 0, 0);
        right.applyAxisAngle(new THREE.Vector3(0, 1, 0), inputManager.mouse.x);
        
        const moveDirection = new THREE.Vector3();
        moveDirection.add(forward.multiplyScalar(moveVector.z));
        moveDirection.add(right.multiplyScalar(moveVector.x));
        
        if (moveDirection.length() > 0) {
            moveDirection.normalize();
            this.position.addScaledVector(moveDirection, this.speed);
        }
        
        // Jump
        if (inputManager.isKeyPressed(' ') && this.isGrounded) {
            this.velocity.y = this.jumpForce;
            this.isGrounded = false;
        }
        
        // Apply gravity
        this.velocity.y -= this.gravity;
        this.position.y += this.velocity.y;
        
        // Ground collision
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y = 0;
            this.isGrounded = true;
        }
        
        // World boundaries
        this.position.x = Math.max(-240, Math.min(240, this.position.x));
        this.position.z = Math.max(-240, Math.min(240, this.position.z));
        
        // Update camera position
        this.camera.position.copy(this.position);
        this.camera.position.y += 1.6;
        
        // Firing
        if (inputManager.isKeyPressed('mousedown') || inputManager.isKeyPressed(' ')) {
            this.fire(scene);
        }
    }
    
    fire(scene) {
        const currentTime = Date.now() / 1000;
        if (currentTime - this.lastFireTime > this.fireRate && this.ammo > 0) {
            this.ammo--;
            this.lastFireTime = currentTime;
            
            // Create projectile
            const direction = new THREE.Vector3(0, 0, -1);
            direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.camera.rotation.y);
            direction.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.camera.rotation.x);
            
            const projectile = new Projectile(
                scene,
                this.camera.position.clone().add(direction.clone().multiplyScalar(2)),
                direction,
                20
            );
            
            scene.userData.gameState?.projectiles.push(projectile);
        }
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    reload() {
        this.ammo = this.maxAmmo;
    }
}

/**
 * Enemy class
 */
class Enemy {
    constructor(scene, config) {
        this.scene = scene;
        this.position = new THREE.Vector3(...config.position);
        this.velocity = new THREE.Vector3();
        
        this.health = config.health;
        this.maxHealth = config.health;
        this.speed = config.speed;
        this.damage = config.damage;
        this.attackCooldown = 2;
        this.lastAttackTime = 0;
        
        this.createMesh();
    }
    
    createMesh() {
        const geometry = new THREE.ConeGeometry(0.5, 2, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x660000
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        
        // Health bar
        this.createHealthBar();
    }
    
    createHealthBar() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 8;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, 0, 64, 8);
        
        const texture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry(2, 0.3);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        
        this.healthBar = new THREE.Mesh(geometry, material);
        this.healthBar.position.y = 2;
        this.mesh.add(this.healthBar);
    }
    
    update(dt) {
        // Simple AI: move towards player
        this.mesh.position.copy(this.position);
    }
    
    lookAt(target) {
        this.mesh.lookAt(target);
    }
    
    attack(player, dt, scene, audioManager) {
        const currentTime = Date.now() / 1000;
        const distance = this.position.distanceTo(player.position);
        
        if (distance < 100 && currentTime - this.lastAttackTime > this.attackCooldown) {
            this.lastAttackTime = currentTime;
            
            // Fire projectile at player
            const direction = player.position.clone().sub(this.position).normalize();
            const projectile = new EnemyProjectile(scene, this.position.clone(), direction, this.damage);
            
            audioManager.play('enemyFire');
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        this.updateHealthBar();
    }
    
    updateHealthBar() {
        const health = Math.max(0, this.health);
        const scale = health / this.maxHealth;
        this.healthBar.scale.x = scale;
    }
    
    remove() {
        this.scene.remove(this.mesh);
    }
}

/**
 * Projectile class
 */
class Projectile {
    constructor(scene, position, direction, damage) {
        this.scene = scene;
        this.position = position.clone();
        this.direction = direction.normalize();
        this.damage = damage;
        this.speed = 0.5;
        this.lifetime = 10;
        
        this.createMesh();
    }
    
    createMesh() {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.scene.add(this.mesh);
    }
    
    update(dt) {
        this.position.addScaledVector(this.direction, this.speed);
        this.mesh.position.copy(this.position);
        this.lifetime -= dt;
    }
    
    remove() {
        this.scene.remove(this.mesh);
    }
}

/**
 * Enemy Projectile class
 */
class EnemyProjectile extends Projectile {
    constructor(scene, position, direction, damage) {
        super(scene, position, direction, damage);
        this.speed = 0.3;
    }
    
    createMesh() {
        const geometry = new THREE.SphereGeometry(0.15, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.scene.add(this.mesh);
    }
}

/**
 * Particle System
 */
class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
    }
    
    addParticle(position, velocity, lifetime, color) {
        const geometry = new THREE.SphereGeometry(0.05, 4, 4);
        const material = new THREE.MeshBasicMaterial({ color: color });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        
        this.scene.add(mesh);
        
        this.particles.push({
            mesh: mesh,
            velocity: velocity,
            lifetime: lifetime,
            maxLifetime: lifetime
        });
    }
    
    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.lifetime -= dt;
            particle.mesh.position.addScaledVector(particle.velocity, dt);
            
            if (particle.lifetime <= 0) {
                this.scene.remove(particle.mesh);
                this.particles.splice(i, 1);
            } else {
                const alpha = particle.lifetime / particle.maxLifetime;
                particle.mesh.material.opacity = alpha;
            }
        }
    }
}

/**
 * Effects Manager
 */
class EffectsManager {
    constructor(scene, particleSystem) {
        this.scene = scene;
        this.particleSystem = particleSystem;
    }
    
    createImpactEffect(position) {
        for (let i = 0; i < 5; i++) {
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                Math.random() * 0.3,
                (Math.random() - 0.5) * 0.5
            );
            
            this.particleSystem.addParticle(position, velocity, 0.5, 0xffaa00);
        }
    }
    
    createDamageEffect() {
        // Screen shake or visual effect
    }
}

/**
 * Audio Manager
 */
class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = {};
        this.masterVolume = 0.5;
    }
    
    play(soundName) {
        // Placeholder for sound playing
        console.log('Playing sound:', soundName);
    }
    
    pauseAll() {
        if (this.audioContext) {
            this.audioContext.suspend();
        }
    }
    
    resumeAll() {
        if (this.audioContext) {
            this.audioContext.resume();
        }
    }
}

/**
 * HUD Manager
 */
class HUD {
    constructor(gameState) {
        this.gameState = gameState;
        this.createHUDElements();
    }
    
    createHUDElements() {
        const hud = document.createElement('div');
        hud.id = 'hud';
        hud.innerHTML = `
            <div id="health-display">Health: <span id="health">100</span>/<span id="max-health">100</span></div>
            <div id="ammo-display">Ammo: <span id="ammo">120</span></div>
            <div id="score-display">Score: <span id="score">0</span></div>
            <div id="wave-display">Wave: <span id="wave">1</span></div>
            <div id="fps-display">FPS: <span id="fps">60</span></div>
        `;
        document.body.appendChild(hud);
    }
    
    update(gameState, stats) {
        document.getElementById('health').textContent = Math.ceil(gameState.health);
        document.getElementById('ammo').textContent = gameState.ammo;
        document.getElementById('score').textContent = gameState.score;
        document.getElementById('wave').textContent = gameState.currentWave;
        document.getElementById('fps').textContent = Math.round(1 / stats.deltaTime);
    }
    
    showPauseMenu() {
        const pauseMenu = document.createElement('div');
        pauseMenu.id = 'pause-menu';
        pauseMenu.innerHTML = '<h1>PAUSED</h1><p>Press P to resume</p>';
        document.body.appendChild(pauseMenu);
    }
    
    hidePauseMenu() {
        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu) pauseMenu.remove();
    }
    
    showGameOver(score, wave) {
        const gameOverScreen = document.createElement('div');
        gameOverScreen.id = 'game-over';
        gameOverScreen.innerHTML = `
            <h1>GAME OVER</h1>
            <p>Score: ${score}</p>
            <p>Wave: ${wave}</p>
            <button onclick="location.reload()">Restart</button>
        `;
        document.body.appendChild(gameOverScreen);
    }
}

// Export for use in HTML
window.GameEngine = GameEngine;
