// Расширенные типы руды
const oreTypes = {
    iron: { name: "Железо", rarity: "common", baseValue: 1, color: "#9e9e9e", chance: 0.4, luckMultiplier: 1.0, image: "iron.png" },
    copper: { name: "Медь", rarity: "common", baseValue: 1.5, color: "#b87333", chance: 0.3, luckMultiplier: 1.1, image: "copper.png" },
    tin: { name: "Олово", rarity: "common", baseValue: 2, color: "#a0a0a0", chance: 0.25, luckMultiplier: 1.1, image: "tin.png" },
    silver: { name: "Серебро", rarity: "uncommon", baseValue: 5, color: "#c0c0c0", chance: 0.15, unlockRequirement: 100, luckMultiplier: 1.3, image: "silver.png" },
    gold: { name: "Золото", rarity: "uncommon", baseValue: 10, color: "#ffd700", chance: 0.1, unlockRequirement: 250, luckMultiplier: 1.5, image: "gold.png" },
    platinum: { name: "Платина", rarity: "rare", baseValue: 25, color: "#e5e4e2", chance: 0.07, unlockRequirement: 500, luckMultiplier: 2.0, image: "platinum.png" },
    titanium: { name: "Титан", rarity: "rare", baseValue: 40, color: "#878681", chance: 0.05, unlockRequirement: 1000, luckMultiplier: 2.2, image: "titanium.png" },
    uranium: { name: "Уран", rarity: "epic", baseValue: 100, color: "#7cfc00", chance: 0.03, unlockRequirement: 2500, luckMultiplier: 3.0, image: "uranium.png" },
    palladium: { name: "Палладий", rarity: "epic", baseValue: 200, color: "#ceb180", chance: 0.02, unlockRequirement: 5000, luckMultiplier: 3.5, image: "palladium.png" },
    mithril: { name: "Мифрил", rarity: "legendary", baseValue: 500, color: "#4b8bff", chance: 0.01, unlockRequirement: 10000, luckMultiplier: 5.0, image: "mithril.png" },
    adamantite: { name: "Адамантит", rarity: "legendary", baseValue: 1000, color: "#ff4500", chance: 0.005, unlockRequirement: 20000, luckMultiplier: 7.0, image: "adamantite.png" },
    unobtainium: { name: "Недостающий элемент", rarity: "mythic", baseValue: 5000, color: "#ff00ff", chance: 0.001, unlockRequirement: 50000, luckMultiplier: 10.0, image: "unobtainium.png" },
    starstone: { name: "Звездный камень", rarity: "mythic", baseValue: 10000, color: "#00ffff", chance: 0.0005, unlockRequirement: 100000, luckMultiplier: 15.0, image: "starstone.png" },
    blackmatter: { name: "Черная материя", rarity: "mythic", baseValue: 25000, color: "#000000", chance: 0.0001, unlockRequirement: 250000, luckMultiplier: 20.0, image: "blackmatter.png" }
};

// Майнеры с изображениями
const minersData = [
    { id: "basic_miner", name: "Базовый майнер", description: "Добывает 0.1 руды в секунду", baseCost: 10, baseProduction: 0.1, costMultiplier: 1.15, unlockRequirement: 0, image: "miner1.png", scale: 0.8 },
    { id: "advanced_miner", name: "Продвинутый майнер", description: "Добывает 0.5 руды в секунду", baseCost: 50, baseProduction: 0.5, costMultiplier: 1.2, unlockRequirement: 100, image: "miner2.png", scale: 0.9 },
    { id: "professional_miner", name: "Профессиональный майнер", description: "Добывает 2 руды в секунду", baseCost: 200, baseProduction: 2, costMultiplier: 1.25, unlockRequirement: 500, image: "miner3.png", scale: 1.0 },
    { id: "industrial_miner", name: "Промышленный майнер", description: "Добывает 10 руды в секунду", baseCost: 1000, baseProduction: 10, costMultiplier: 1.3, unlockRequirement: 2000, image: "miner4.png", scale: 1.1 },
    { id: "quantum_miner", name: "Квантовый майнер", description: "Добывает 50 руды в секунду", baseCost: 5000, baseProduction: 50, costMultiplier: 1.35, unlockRequirement: 10000, image: "miner5.png", scale: 1.2 },
    { id: "cosmic_miner", name: "Космический майнер", description: "Добывает 200 руды в секунду", baseCost: 20000, baseProduction: 200, costMultiplier: 1.4, unlockRequirement: 50000, image: "miner6.png", scale: 1.3 },
    { id: "singularity_miner", name: "Майнер сингулярности", description: "Добывает 1000 руды в секунду", baseCost: 100000, baseProduction: 1000, costMultiplier: 1.5, unlockRequirement: 200000, image: "miner7.png", scale: 1.4 },
    { id: "reality_miner", name: "Майнер реальности", description: "Добывает 5000 руды в секунду", baseCost: 500000, baseProduction: 5000, costMultiplier: 1.6, unlockRequirement: 1000000, image: "miner8.png", scale: 1.5 }
];

// Основные улучшения
const upgradesData = [
    { id: "pickaxe_upgrade", name: "Улучшение кирки", description: "Увеличивает добычу руды вручную на 50%", baseCost: 100, effect: { clickMultiplier: 0.5 }, costMultiplier: 2, maxLevel: 10, unlockRequirement: 50, icon: "pickaxe.png" },
    { id: "luck_upgrade", name: "Улучшение удачи", description: "Увеличивает шанс найти редкую руду на 5%", baseCost: 200, effect: { luckBonus: 5 }, costMultiplier: 2.5, maxLevel: 10, unlockRequirement: 200, icon: "luck.png" },
    { id: "miner_efficiency", name: "Эффективность майнеров", description: "Увеличивает производство всех майнеров на 10%", baseCost: 500, effect: { minerMultiplier: 0.1 }, costMultiplier: 3, maxLevel: 5, unlockRequirement: 1000, icon: "efficiency.png" }
];

// Особые улучшения
const specialUpgradesData = [
    { id: "auto_clicker", name: "Автокликер", description: "Автоматически кликает каждые 10 секунд", baseCost: 5000, effect: { autoClick: true }, costMultiplier: 5, maxLevel: 1, unlockRequirement: 5000, icon: "autoclicker.png" },
    { id: "ore_doubler", name: "Удвоитель руды", description: "Удваивает всю получаемую руду", baseCost: 10000, effect: { oreMultiplier: 2 }, costMultiplier: 10, maxLevel: 1, unlockRequirement: 10000, icon: "doubler.png" },
    { id: "critical_booster", name: "Усилитель критов", description: "Увеличивает шанс критического удара до 15%", baseCost: 15000, effect: { criticalChance: 0.15 }, costMultiplier: 15, maxLevel: 1, unlockRequirement: 15000, icon: "critical.png" }
];

// Перки перерождения
const prestigePerks = [
    { id: "eternal_miners", name: "Вечные майнеры", description: "Сохраняет 10% ваших майнеров после перерождения", cost: 5, icon: "eternal.png" },
    { id: "lucky_start", name: "Удачный старт", description: "Начинает игру с 50% удачи", cost: 10, icon: "luckystart.png" },
    { id: "prestige_boost", name: "Ускорение перерождения", description: "Увеличивает бонус перерождения на 25%", cost: 20, icon: "boost.png" },
    { id: "unlock_all_ores", name: "Все руды", description: "Начинает игру со всеми разблокированными рудами", cost: 50, icon: "allores.png" }
];

// Игровое состояние
let gameState = {
    ores: 0,
    oresTotal: 0,
    oresPerSecond: 0,
    miningPower: 1,
    prestigePoints: 0,
    prestigeBonus: 0,
    luck: 100,
    miners: [],
    upgrades: [],
    specialUpgrades: [],
    unlockedOres: ['iron'],
    unlockedPerks: [],
    weather: 'clear',
    timeOfDay: 'day',
    season: 'spring',
    lastUpdate: Date.now(),
    visualMiners: []
};

// Инициализация игры
function initGame() {
    loadGame();
    
    // Инициализация майнеров
    minersData.forEach(miner => {
        gameState.miners.push({
            ...miner,
            owned: 0,
            currentCost: miner.baseCost
        });
    });
    
    // Инициализация улучшений
    upgradesData.forEach(upgrade => {
        gameState.upgrades.push({
            ...upgrade,
            level: 0,
            currentCost: upgrade.baseCost
        });
    });
    
    // Инициализация особых улучшений
    specialUpgradesData.forEach(upgrade => {
        gameState.specialUpgrades.push({
            ...upgrade,
            level: 0,
            currentCost: upgrade.baseCost
        });
    });
    
    setupUI();
    setInterval(gameLoop, 1000);
    setInterval(saveGame, 30000);
    setInterval(updateWeatherAndTime, 30000);
    setInterval(autoClick, 10000); // Автокликер
    
    gameState.lastUpdate = Date.now();
}

// Настройка интерфейса
function setupUI() {
    document.getElementById('mine-button').addEventListener('click', mineOre);
    document.getElementById('prestige-button').addEventListener('click', prestige);
    
    updateUI();
    
    // Майнеры
    const minersList = document.getElementById('miners-list');
    gameState.miners.forEach(miner => {
        const minerElement = document.createElement('div');
        minerElement.className = 'miner';
        minerElement.id = `miner-${miner.id}`;
        minerElement.innerHTML = `
            <img src="images/miners/${miner.image}" class="miner-icon">
            <div class="miner-name">${miner.name}</div>
            <div class="miner-stats">${miner.description}</div>
            <div class="miner-cost">Цена: <span id="cost-${miner.id}">${formatNumber(miner.currentCost)}</span> руды</div>
            <button class="buy-button" id="buy-${miner.id}">Купить</button>
            <div class="miner-owned">Количество: <span id="owned-${miner.id}">0</span></div>
        `;
        minersList.appendChild(minerElement);
        document.getElementById(`buy-${miner.id}`).addEventListener('click', () => buyMiner(miner.id));
    });
    
    // Улучшения
    const upgradesList = document.getElementById('upgrades-list');
    gameState.upgrades.forEach(upgrade => {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.id = `upgrade-${upgrade.id}`;
        upgradeElement.innerHTML = `
            <img src="images/upgrades/${upgrade.icon}" class="upgrade-icon">
            <div class="upgrade-name">${upgrade.name} <span id="level-${upgrade.id}">0</span>/${upgrade.maxLevel}</div>
            <div class="upgrade-stats">${upgrade.description}</div>
            <div class="upgrade-cost">Цена: <span id="upgrade-cost-${upgrade.id}">${formatNumber(upgrade.currentCost)}</span> руды</div>
            <button class="buy-button" id="buy-upgrade-${upgrade.id}">Улучшить</button>
        `;
        upgradesList.appendChild(upgradeElement);
        document.getElementById(`buy-upgrade-${upgrade.id}`).addEventListener('click', () => buyUpgrade(upgrade.id));
    });
    
    // Особые улучшения
    const specialUpgradesList = document.getElementById('special-upgrades-list');
    gameState.specialUpgrades.forEach(upgrade => {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade special-upgrade';
        upgradeElement.id = `special-upgrade-${upgrade.id}`;
        upgradeElement.innerHTML = `
            <img src="images/upgrades/${upgrade.icon}" class="upgrade-icon">
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-stats">${upgrade.description}</div>
            <div class="upgrade-cost">Цена: <span id="special-upgrade-cost-${upgrade.id}">${formatNumber(upgrade.currentCost)}</span> руды</div>
            <button class="buy-button" id="buy-special-upgrade-${upgrade.id}">Приобрести</button>
        `;
        specialUpgradesList.appendChild(upgradeElement);
        document.getElementById(`buy-special-upgrade-${upgrade.id}`).addEventListener('click', () => buySpecialUpgrade(upgrade.id));
    });
    
    // Перки перерождения
    const prestigePerksList = document.getElementById('prestige-perks');
    prestigePerks.forEach(perk => {
        const perkElement = document.createElement('div');
        perkElement.className = `prestige-perk ${gameState.unlockedPerks.includes(perk.id) ? 'unlocked' : ''}`;
        perkElement.id = `perk-${perk.id}`;
        perkElement.innerHTML = `
            <img src="images/perks/${perk.icon}" class="perk-icon">
            <div class="prestige-perk-title">${perk.name}</div>
            <div class="prestige-perk-description">${perk.description}</div>
            <div class="prestige-perk-cost">Стоимость: ${perk.cost} очков перерождения</div>
        `;
        prestigePerksList.appendChild(perkElement);
        
        if (!gameState.unlockedPerks.includes(perk.id)) {
            perkElement.addEventListener('click', () => buyPrestigePerk(perk.id));
        }
    });
}

// Покупка перка перерождения
function buyPrestigePerk(perkId) {
    const perk = prestigePerks.find(p => p.id === perkId);
    if (perk && gameState.prestigePoints >= perk.cost && !gameState.unlockedPerks.includes(perkId)) {
        gameState.prestigePoints -= perk.cost;
        gameState.unlockedPerks.push(perkId);
        
        // Применение эффекта перка
        applyPrestigePerk(perkId);
        
        // Обновление интерфейса
        const perkElement = document.getElementById(`perk-${perkId}`);
        perkElement.classList.add('unlocked');
        perkElement.innerHTML = `
            <img src="images/perks/${perk.icon}" class="perk-icon">
            <div class="prestige-perk-title">${perk.name}</div>
            <div class="prestige-perk-description">${perk.description}</div>
            <div class="prestige-perk-cost">Активировано</div>
        `;
        
        showNotification(`Перк активирован!`, `Вы получили "${perk.name}"`, '#9c27b0');
        playUnlockSound();
    }
}

// Применение эффектов перков
function applyPrestigePerk(perkId) {
    switch (perkId) {
        case 'lucky_start':
            gameState.luck = Math.max(gameState.luck, 50);
            break;
        case 'prestige_boost':
            gameState.prestigeBonus += 25;
            break;
    }
}

// Покупка особого улучшения
function buySpecialUpgrade(upgradeId) {
    const upgrade = gameState.specialUpgrades.find(u => u.id === upgradeId);
    
    if (upgrade && upgrade.level < upgrade.maxLevel && gameState.ores >= upgrade.currentCost) {
        gameState.ores -= upgrade.currentCost;
        upgrade.level++;
        
        // Применение эффекта
        if (upgrade.effect.autoClick) {
            // Автокликер уже работает благодаря setInterval
        }
        if (upgrade.effect.oreMultiplier) {
            // Множитель применяется в функции добычи
        }
        if (upgrade.effect.criticalChance) {
            // Шанс крита учитывается в mineOre()
        }
        
        // Обновление интерфейса
        updateUI();
        playBuySound();
        
        // Уведомление
        showNotification(`Улучшение куплено!`, `Вы приобрели "${upgrade.name}"`, '#9c27b0');
    }
}

// Автокликер
function autoClick() {
    const autoClicker = gameState.specialUpgrades.find(u => u.id === 'auto_clicker');
    if (autoClicker && autoClicker.level > 0) {
        mineOre();
    }
}

// Обновление визуальных майнеров
function updateVisualMiners() {
    const container = document.getElementById('miners-visual');
    container.innerHTML = '';
    
    gameState.visualMiners = [];
    
    // Создаем визуальные элементы для каждого майнера
    gameState.miners.forEach(miner => {
        if (miner.owned > 0) {
            // Создаем несколько визуальных элементов для каждого майнера
            const count = Math.min(Math.floor(Math.log10(miner.owned + 1)) + 1, 5);
            
            for (let i = 0; i < count; i++) {
                const visualMiner = document.createElement('img');
                visualMiner.src = `images/miners/${miner.image}`;
                visualMiner.className = 'miner-visual';
                visualMiner.style.width = `${miner.scale * 50}px`;
                visualMiner.style.left = `${10 + Math.random() * 80}%`;
                visualMiner.style.bottom = `${10 + Math.random() * 20}px`;
                visualMiner.style.opacity = '0.8';
                visualMiner.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
                
                container.appendChild(visualMiner);
                gameState.visualMiners.push(visualMiner);
            }
        }
    });
}

// Обновление изображения руды
function updateOreImage(oreType) {
    const oreImage = document.getElementById('current-ore');
    if (oreImage) {
        oreImage.src = `images/ores/${oreType.image}`;
        oreImage.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            oreImage.style.animation = '';
        }, 500);
    }
}

// Эффект летающей валюты
function createCurrencyParticles(amount, x, y) {
    for (let i = 0; i < Math.min(10, amount); i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '+1';
        particle.style.color = '#ffeb3b';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontWeight = 'bold';
        particle.style.animation = `currencyFly ${0.5 + Math.random()}s forwards`;
        
        document.getElementById('game-container').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Обновленный mineOre с эффектами
function mineOre() {
    let oreGain = gameState.miningPower;
    
    // Применение улучшений кирки
    const pickaxeUpgrade = gameState.upgrades.find(u => u.id === 'pickaxe_upgrade');
    if (pickaxeUpgrade) {
        oreGain *= (1 + pickaxeUpgrade.level * pickaxeUpgrade.effect.clickMultiplier);
    }
    
    // Применение бонуса перерождения
    oreGain *= (1 + gameState.prestigeBonus / 100);
    
    // Применение особых улучшений
    const oreDoubler = gameState.specialUpgrades.find(u => u.id === 'ore_doubler');
    if (oreDoubler && oreDoubler.level > 0) {
        oreGain *= oreDoubler.effect.oreMultiplier;
    }
    
    // Шанс критического удара
    let criticalChance = 0.05;
    const luckUpgrade = gameState.upgrades.find(u => u.id === 'luck_upgrade');
    if (luckUpgrade) {
        criticalChance += luckUpgrade.level * 0.01;
    }
    
    const criticalBooster = gameState.specialUpgrades.find(u => u.id === 'critical_booster');
    if (criticalBooster && criticalBooster.level > 0) {
        criticalChance = criticalBooster.effect.criticalChance;
    }
    
    const isCritical = Math.random() < criticalChance;
    if (isCritical) {
        oreGain *= 5;
        showCriticalHit();
    }
    
    // Определение типа руды
    const oreType = determineOreType(isCritical);
    updateOreImage(oreType);
    
    // Добавление руды
    const actualOre = oreType.baseValue * oreGain;
    gameState.ores += actualOre;
    gameState.oresTotal += actualOre;
    
    // Эффект частиц
    const buttonRect = document.getElementById('mine-button').getBoundingClientRect();
    createCurrencyParticles(actualOre, buttonRect.left + buttonRect.width/2, buttonRect.top);
    
    // Обновление удачи
    updateLuck(oreType);
    
    // Логирование добычи
    logOreMined(oreType, actualOre, isCritical);
    
    // Обновление интерфейса
    updateUI();
    
    // Воспроизведение звука
    playMineSound(isCritical);
    
    // Анимация добычи
    animateMining();
}

// Обновленный UI
function updateUI() {
    document.getElementById('ores-count').textContent = formatNumber(gameState.ores);
    document.getElementById('ores-per-second').textContent = formatNumber(gameState.oresPerSecond);
    document.getElementById('luck').textContent = `${Math.floor(gameState.luck)}%`;
    document.getElementById('mining-power').textContent = formatNumber(gameState.miningPower);
    
    // Майнеры
    gameState.miners.forEach(miner => {
        document.getElementById(`owned-${miner.id}`).textContent = miner.owned;
        document.getElementById(`cost-${miner.id}`).textContent = formatNumber(miner.currentCost);
        
        const buyButton = document.getElementById(`buy-${miner.id}`);
        buyButton.disabled = gameState.ores < miner.currentCost;
    });
    
    // Улучшения
    gameState.upgrades.forEach(upgrade => {
        document.getElementById(`level-${upgrade.id}`).textContent = upgrade.level;
        document.getElementById(`upgrade-cost-${upgrade.id}`).textContent = formatNumber(upgrade.currentCost);
        
        const buyButton = document.getElementById(`buy-upgrade-${upgrade.id}`);
        buyButton.disabled = gameState.ores < upgrade.currentCost || upgrade.level >= upgrade.maxLevel;
        
        if (upgrade.level >= upgrade.maxLevel) {
            buyButton.textContent = 'Макс. уровень';
        }
    });
    
    // Особые улучшения
    gameState.specialUpgrades.forEach(upgrade => {
        document.getElementById(`special-upgrade-cost-${upgrade.id}`).textContent = formatNumber(upgrade.currentCost);
        
        const buyButton = document.getElementById(`buy-special-upgrade-${upgrade.id}`);
        buyButton.disabled = gameState.ores < upgrade.currentCost || upgrade.level >= upgrade.maxLevel;
        
        if (upgrade.level >= upgrade.maxLevel) {
            buyButton.textContent = 'Куплено';
        }
    });
    
    // Кнопка перерождения
    const prestigeButton = document.getElementById('prestige-button');
    prestigeButton.disabled = gameState.oresTotal < 1000;
    prestigeButton.textContent = `Перерождение (${Math.floor(gameState.oresTotal/1000)}/1000)`;
    document.getElementById('prestige-bonus').textContent = `Бонус перерождения: +${gameState.prestigeBonus}% к добыче`;
    
    // Обновление визуальных майнеров
    updateVisualMiners();
}

// Обновленный prestige с учетом перков
function prestige() {
    if (gameState.oresTotal >= 1000) {
        // Расчет очков перерождения
        const points = Math.floor(Math.sqrt(gameState.oresTotal / 1000));
        
        // Обновление состояния
        gameState.prestigePoints += points;
        
        // Применение перка "Вечные майнеры"
        const eternalMiners = gameState.unlockedPerks.includes('eternal_miners');
        let minersToKeep = {};
        
        if (eternalMiners) {
            gameState.miners.forEach(miner => {
                minersToKeep[miner.id] = Math.floor(miner.owned * 0.1);
            });
        }
        
        // Сброс игры
        gameState.ores = 0;
        gameState.oresTotal = 0;
        gameState.oresPerSecond = 0;
        gameState.miningPower = 1;
        gameState.luck = gameState.unlockedPerks.includes('lucky_start') ? 50 : 100;
        
        // Сброс майнеров с учетом перков
        gameState.miners.forEach(miner => {
            miner.owned = eternalMiners ? minersToKeep[miner.id] || 0 : 0;
            miner.currentCost = miner.baseCost * Math.pow(miner.costMultiplier, miner.owned);
        });
        
        // Сброс улучшений (кроме особых)
        gameState.upgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.currentCost = upgrade.baseCost;
        });
        
        // Разблокировка руды с учетом перков
        gameState.unlockedOres = gameState.unlockedPerks.includes('unlock_all_ores') ? 
            Object.keys(oreTypes) : ['iron'];
        
        // Уведомление
        showNotification(`Перерождение успешно!`, `Вы получили ${points} очков перерождения.`, '#ff9800');
        playPrestigeSound();
        
        // Обновление интерфейса
        updateUI();
    }
}

// Новые звуковые эффекты
function playUnlockSound() {
    const sound = document.getElementById('unlock-sound');
    sound.currentTime = 0;
    sound.play();
}

function playPrestigeSound() {
    const sound = document.getElementById('prestige-sound');
    sound.currentTime = 0;
    sound.play();
}

// Запуск игры
window.onload = initGame;
