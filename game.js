// Основные переменные игры
let gameState = {
    ores: 0,
    oresTotal: 0,
    oresPerSecond: 0,
    prestigePoints: 0,
    prestigeBonus: 0,
    luck: 100,
    miners: [],
    upgrades: [],
    unlockedOres: ['iron'],
    weather: 'clear',
    timeOfDay: 'day',
    season: 'spring',
    lastUpdate: Date.now()
};

// Типы руды
const oreTypes = {
    iron: {
        name: "Железо",
        rarity: "common",
        baseValue: 1,
        color: "#9e9e9e",
        chance: 0.5,
        luckMultiplier: 1.0
    },
    copper: {
        name: "Медь",
        rarity: "common",
        baseValue: 1.5,
        color: "#b87333",
        chance: 0.4,
        luckMultiplier: 1.1
    },
    silver: {
        name: "Серебро",
        rarity: "uncommon",
        baseValue: 5,
        color: "#c0c0c0",
        chance: 0.2,
        unlockRequirement: 100,
        luckMultiplier: 1.3
    },
    gold: {
        name: "Золото",
        rarity: "uncommon",
        baseValue: 10,
        color: "#ffd700",
        chance: 0.15,
        unlockRequirement: 250,
        luckMultiplier: 1.5
    },
    platinum: {
        name: "Платина",
        rarity: "rare",
        baseValue: 25,
        color: "#e5e4e2",
        chance: 0.1,
        unlockRequirement: 500,
        luckMultiplier: 2.0
    },
    titanium: {
        name: "Титан",
        rarity: "rare",
        baseValue: 40,
        color: "#878681",
        chance: 0.07,
        unlockRequirement: 1000,
        luckMultiplier: 2.2
    },
    uranium: {
        name: "Уран",
        rarity: "epic",
        baseValue: 100,
        color: "#7cfc00",
        chance: 0.04,
        unlockRequirement: 2500,
        luckMultiplier: 3.0
    },
    palladium: {
        name: "Палладий",
        rarity: "epic",
        baseValue: 200,
        color: "#ceb180",
        chance: 0.025,
        unlockRequirement: 5000,
        luckMultiplier: 3.5
    },
    mythril: {
        name: "Мифрил",
        rarity: "legendary",
        baseValue: 500,
        color: "#4b8bff",
        chance: 0.015,
        unlockRequirement: 10000,
        luckMultiplier: 5.0
    },
    adamantite: {
        name: "Адамантит",
        rarity: "legendary",
        baseValue: 1000,
        color: "#ff4500",
        chance: 0.008,
        unlockRequirement: 20000,
        luckMultiplier: 7.0
    },
    unobtainium: {
        name: "Недостающий элемент",
        rarity: "mythic",
        baseValue: 5000,
        color: "#ff00ff",
        chance: 0.002,
        unlockRequirement: 50000,
        luckMultiplier: 10.0
    }
};

// Майнеры
const minersData = [
    {
        id: "basic_miner",
        name: "Базовый майнер",
        description: "Добывает 0.1 руды в секунду",
        baseCost: 10,
        baseProduction: 0.1,
        costMultiplier: 1.15,
        unlockRequirement: 0
    },
    {
        id: "advanced_miner",
        name: "Продвинутый майнер",
        description: "Добывает 0.5 руды в секунду",
        baseCost: 50,
        baseProduction: 0.5,
        costMultiplier: 1.2,
        unlockRequirement: 100
    },
    {
        id: "professional_miner",
        name: "Профессиональный майнер",
        description: "Добывает 2 руды в секунду",
        baseCost: 200,
        baseProduction: 2,
        costMultiplier: 1.25,
        unlockRequirement: 500
    },
    {
        id: "industrial_miner",
        name: "Промышленный майнер",
        description: "Добывает 10 руды в секунду",
        baseCost: 1000,
        baseProduction: 10,
        costMultiplier: 1.3,
        unlockRequirement: 2000
    },
    {
        id: "quantum_miner",
        name: "Квантовый майнер",
        description: "Добывает 50 руды в секунду",
        baseCost: 5000,
        baseProduction: 50,
        costMultiplier: 1.35,
        unlockRequirement: 10000
    },
    {
        id: "cosmic_miner",
        name: "Космический майнер",
        description: "Добывает 200 руды в секунду",
        baseCost: 20000,
        baseProduction: 200,
        costMultiplier: 1.4,
        unlockRequirement: 50000
    },
    {
        id: "singularity_miner",
        name: "Майнер сингулярности",
        description: "Добывает 1000 руды в секунду",
        baseCost: 100000,
        baseProduction: 1000,
        costMultiplier: 1.5,
        unlockRequirement: 200000
    }
];

// Улучшения
const upgradesData = [
    {
        id: "pickaxe_upgrade",
        name: "Улучшение кирки",
        description: "Увеличивает добычу руды вручную на 50%",
        baseCost: 100,
        effect: { clickMultiplier: 0.5 },
        costMultiplier: 2,
        maxLevel: 10,
        unlockRequirement: 50
    },
    {
        id: "luck_upgrade",
        name: "Улучшение удачи",
        description: "Увеличивает шанс найти редкую руду на 5%",
        baseCost: 200,
        effect: { luckBonus: 5 },
        costMultiplier: 2.5,
        maxLevel: 10,
        unlockRequirement: 200
    },
    {
        id: "miner_efficiency",
        name: "Эффективность майнеров",
        description: "Увеличивает производство всех майнеров на 10%",
        baseCost: 500,
        effect: { minerMultiplier: 0.1 },
        costMultiplier: 3,
        maxLevel: 5,
        unlockRequirement: 1000
    },
    {
        id: "prestige_bonus",
        name: "Бонус перерождения",
        description: "Увеличивает бонус перерождения на 5%",
        baseCost: 1000,
        effect: { prestigeBonus: 5 },
        costMultiplier: 4,
        maxLevel: 5,
        unlockRequirement: 5000
    }
];

// Инициализация игры
function initGame() {
    // Загрузка сохранения
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
    
    // Настройка интерфейса
    setupUI();
    
    // Запуск игрового цикла
    setInterval(gameLoop, 1000);
    setInterval(saveGame, 30000); // Автосохранение каждые 30 секунд
    
    // Запуск погодного цикла
    setInterval(updateWeatherAndTime, 30000);
    
    // Обновление времени последнего обновления
    gameState.lastUpdate = Date.now();
}

// Настройка пользовательского интерфейса
function setupUI() {
    // Кнопка добычи
    document.getElementById('mine-button').addEventListener('click', mineOre);
    
    // Обновление отображения
    updateUI();
    
    // Создание элементов майнеров
    const minersList = document.getElementById('miners-list');
    gameState.miners.forEach(miner => {
        const minerElement = document.createElement('div');
        minerElement.className = 'miner';
        minerElement.id = `miner-${miner.id}`;
        minerElement.innerHTML = `
            <div class="miner-name">${miner.name}</div>
            <div class="miner-stats">${miner.description}</div>
            <div class="miner-cost">Цена: <span id="cost-${miner.id}">${formatNumber(miner.currentCost)}</span> руды</div>
            <button class="buy-button" id="buy-${miner.id}">Купить</button>
            <div class="miner-owned">Количество: <span id="owned-${miner.id}">0</span></div>
        `;
        minersList.appendChild(minerElement);
        
        document.getElementById(`buy-${miner.id}`).addEventListener('click', () => buyMiner(miner.id));
    });
    
    // Создание элементов улучшений
    const upgradesList = document.getElementById('upgrades-list');
    gameState.upgrades.forEach(upgrade => {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.id = `upgrade-${upgrade.id}`;
        upgradeElement.innerHTML = `
            <div class="upgrade-name">${upgrade.name} <span id="level-${upgrade.id}">0</span>/${upgrade.maxLevel}</div>
            <div class="upgrade-stats">${upgrade.description}</div>
            <div class="upgrade-cost">Цена: <span id="upgrade-cost-${upgrade.id}">${formatNumber(upgrade.currentCost)}</span> руды</div>
            <button class="buy-button" id="buy-upgrade-${upgrade.id}">Улучшить</button>
        `;
        upgradesList.appendChild(upgradeElement);
        
        document.getElementById(`buy-upgrade-${upgrade.id}`).addEventListener('click', () => buyUpgrade(upgrade.id));
    });
    
    // Кнопка перерождения
    document.getElementById('prestige-button').addEventListener('click', prestige);
}

// Игровой цикл
function gameLoop() {
    // Автоматическая добыча
    autoMine();
    
    // Проверка разблокировки контента
    checkUnlocks();
    
    // Обновление интерфейса
    updateUI();
    
    // Сохранение времени последнего обновления
    gameState.lastUpdate = Date.now();
}

// Ручная добыча руды
function mineOre() {
    // Базовое количество руды
    let oreGain = 1;
    
    // Применение улучшений кирки
    const pickaxeUpgrade = gameState.upgrades.find(u => u.id === 'pickaxe_upgrade');
    if (pickaxeUpgrade) {
        oreGain *= (1 + pickaxeUpgrade.level * pickaxeUpgrade.effect.clickMultiplier);
    }
    
    // Применение бонуса перерождения
    oreGain *= (1 + gameState.prestigeBonus / 100);
    
    // Шанс критического удара (5% базовый + улучшения удачи)
    let criticalChance = 0.05;
    const luckUpgrade = gameState.upgrades.find(u => u.id === 'luck_upgrade');
    if (luckUpgrade) {
        criticalChance += luckUpgrade.level * 0.01;
    }
    
    // Проверка на критический удар
    const isCritical = Math.random() < criticalChance;
    if (isCritical) {
        oreGain *= 5; // 5x при критическом ударе
        showCriticalHit();
    }
    
    // Определение типа руды
    const oreType = determineOreType(isCritical);
    
    // Добавление руды
    const actualOre = oreType.baseValue * oreGain;
    gameState.ores += actualOre;
    gameState.oresTotal += actualOre;
    
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

// Автоматическая добыча майнерами
function autoMine() {
    let totalProduction = 0;
    
    // Производство каждого майнера
    gameState.miners.forEach(miner => {
        if (miner.owned > 0) {
            let production = miner.baseProduction * miner.owned;
            
            // Применение улучшений эффективности
            const efficiencyUpgrade = gameState.upgrades.find(u => u.id === 'miner_efficiency');
            if (efficiencyUpgrade) {
                production *= (1 + efficiencyUpgrade.level * efficiencyUpgrade.effect.minerMultiplier);
            }
            
            // Применение бонуса перерождения
            production *= (1 + gameState.prestigeBonus / 100);
            
            totalProduction += production;
        }
    });
    
    // Добавление руды
    if (totalProduction > 0) {
        gameState.ores += totalProduction;
        gameState.oresTotal += totalProduction;
        gameState.oresPerSecond = totalProduction;
        
        // Логирование автоматической добычи (редко)
        if (Math.random() < 0.05) {
            const oreType = determineOreType(false);
            logOreMined(oreType, totalProduction / 10, false, true);
        }
    }
}

// Определение типа руды
function determineOreType(isCritical) {
    // Увеличение шансов при критическом ударе
    const luckMultiplier = isCritical ? 2 : 1;
    
    // Создание массива возможных руд с учетом шансов
    let possibleOres = [];
    for (const [id, ore] of Object.entries(oreTypes)) {
        if (gameState.unlockedOres.includes(id)) {
            const adjustedChance = ore.chance * luckMultiplier * (1 + gameState.luck / 100 * ore.luckMultiplier);
            possibleOres.push({ id, adjustedChance });
        }
    }
    
    // Сортировка по шансу (от меньшего к большему)
    possibleOres.sort((a, b) => a.adjustedChance - b.adjustedChance);
    
    // Выбор руды
    let random = Math.random();
    for (const ore of possibleOres) {
        if (random < ore.adjustedChance) {
            return oreTypes[ore.id];
        }
        random -= ore.adjustedChance;
    }
    
    // Если ничего не выбрано (маловероятно), вернуть железо
    return oreTypes.iron;
}

// Обновление удачи
function updateLuck(oreType) {
    // Базовое изменение удачи в зависимости от редкости руды
    let luckChange = 0;
    switch (oreType.rarity) {
        case 'common': luckChange = -1; break;
        case 'uncommon': luckChange = 0; break;
        case 'rare': luckChange = 2; break;
        case 'epic': luckChange = 5; break;
        case 'legendary': luckChange = 10; break;
        case 'mythic': luckChange = 20; break;
    }
    
    // Применение изменения с ограничениями
    gameState.luck = Math.max(0, Math.min(200, gameState.luck + luckChange));
}

// Покупка майнера
function buyMiner(minerId) {
    const miner = gameState.miners.find(m => m.id === minerId);
    
    if (miner && gameState.ores >= miner.currentCost) {
        gameState.ores -= miner.currentCost;
        miner.owned++;
        miner.currentCost = Math.floor(miner.baseCost * Math.pow(miner.costMultiplier, miner.owned));
        
        // Обновление интерфейса
        updateUI();
        playBuySound();
    }
}

// Покупка улучшения
function buyUpgrade(upgradeId) {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    
    if (upgrade && upgrade.level < upgrade.maxLevel && gameState.ores >= upgrade.currentCost) {
        gameState.ores -= upgrade.currentCost;
        upgrade.level++;
        
        // Применение эффекта
        if (upgrade.effect.prestigeBonus) {
            gameState.prestigeBonus += upgrade.effect.prestigeBonus;
        }
        
        // Обновление стоимости
        if (upgrade.level < upgrade.maxLevel) {
            upgrade.currentCost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));
        }
        
        // Обновление интерфейса
        updateUI();
        playBuySound();
    }
}

// Перерождение
function prestige() {
    if (gameState.oresTotal >= 1000) {
        // Расчет очков перерождения
        const points = Math.floor(Math.sqrt(gameState.oresTotal / 1000));
        
        // Обновление состояния
        gameState.prestigePoints += points;
        gameState.prestigeBonus += points;
        
        // Сброс игры
        gameState.ores = 0;
        gameState.oresTotal = 0;
        gameState.oresPerSecond = 0;
        gameState.luck = 100;
        
        // Сброс майнеров
        gameState.miners.forEach(miner => {
            miner.owned = 0;
            miner.currentCost = miner.baseCost;
        });
        
        // Сброс улучшений (кроме бонуса перерождения)
        gameState.upgrades.forEach(upgrade => {
            if (upgrade.id !== 'prestige_bonus') {
                upgrade.level = 0;
                upgrade.currentCost = upgrade.baseCost;
            }
        });
        
        // Разблокировка базового контента
        gameState.unlockedOres = ['iron'];
        
        // Уведомление
        showNotification(`Перерождение успешно!`, `Вы получили ${points} очков перерождения. Ваш бонус теперь: ${gameState.prestigeBonus}%`);
        
        // Обновление интерфейса
        updateUI();
    }
}

// Проверка разблокировки контента
function checkUnlocks() {
    // Разблокировка руды
    for (const [id, ore] of Object.entries(oreTypes)) {
        if (ore.unlockRequirement && !gameState.unlockedOres.includes(id) && gameState.oresTotal >= ore.unlockRequirement) {
            gameState.unlockedOres.push(id);
            showNotification(`Новая руда разблокирована!`, `${ore.name} теперь может быть найдена при добыче.`, ore.color);
        }
    }
    
    // Разблокировка майнеров
    gameState.miners.forEach(miner => {
        const element = document.getElementById(`miner-${miner.id}`);
        if (element) {
            if (gameState.oresTotal >= miner.unlockRequirement) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    });
    
    // Разблокировка улучшений
    gameState.upgrades.forEach(upgrade => {
        const element = document.getElementById(`upgrade-${upgrade.id}`);
        if (element) {
            if (gameState.oresTotal >= upgrade.unlockRequirement) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    });
}

// Обновление интерфейса
function updateUI() {
    // Основные показатели
    document.getElementById('ores-count').textContent = formatNumber(gameState.ores);
    document.getElementById('ores-per-second').textContent = formatNumber(gameState.oresPerSecond);
    document.getElementById('luck').textContent = `${Math.floor(gameState.luck)}%`;
    
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
    
    // Кнопка перерождения
    const prestigeButton = document.getElementById('prestige-button');
    prestigeButton.disabled = gameState.oresTotal < 1000;
    prestigeButton.textContent = `Перерождение (${Math.floor(gameState.oresTotal/1000)}/1000)`;
    document.getElementById('prestige-bonus').textContent = `Бонус перерождения: +${gameState.prestigeBonus}% к добыче`;
}

// Логирование добычи руды
function logOreMined(oreType, amount, isCritical = false, isAuto = false) {
    const logElement = document.getElementById('ores-log');
    const logEntry = document.createElement('div');
    logEntry.className = `ore-log-entry ${oreType.rarity}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    logEntry.innerHTML = `
        <span class="ore-name" style="color: ${oreType.color}">${oreType.name} ${isCritical ? '⭐' : ''} ${isAuto ? '⚙️' : ''}</span>
        <span class="ore-amount">+${formatNumber(amount)}</span>
        <span class="ore-time">${timeString}</span>
    `;
    
    logElement.insertBefore(logEntry, logElement.firstChild);
    
    // Ограничение количества записей
    if (logElement.children.length > 50) {
        logElement.removeChild(logElement.lastChild);
    }
}

// Обновление погоды и времени
function updateWeatherAndTime() {
    // Смена времени суток (50% шанс)
    if (Math.random() < 0.5) {
        gameState.timeOfDay = gameState.timeOfDay === 'day' ? 'night' : 'day';
        updateTimeOfDayEffects();
    }
    
    // Смена погоды (30% шанс)
    if (Math.random() < 0.3) {
        const weatherTypes = ['clear', 'rain', 'snow', 'sandstorm'];
        gameState.weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        updateWeatherEffects();
    }
    
    // Смена сезона (каждые 10 минут)
    if (Math.random() < 0.1) {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentIndex = seasons.indexOf(gameState.season);
        gameState.season = seasons[(currentIndex + 1) % seasons.length];
        updateSeasonEffects();
    }
}

// Обновление эффектов времени суток
function updateTimeOfDayEffects() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('day', 'night');
    gameContainer.classList.add(gameState.timeOfDay);
    
    // Удаление старых эффектов
    const oldEffects = document.querySelectorAll('.day-night-effect');
    oldEffects.forEach(effect => effect.remove());
    
    // Добавление новых эффектов
    const timeEffect = document.createElement('div');
    timeEffect.className = 'day-night-effect';
    timeEffect.classList.add(`${gameState.timeOfDay}-effect`);
    document.getElementById('weather-effects').appendChild(timeEffect);
}

// Обновление эффектов погоды
function updateWeatherEffects() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('clear', 'rain', 'snow', 'sandstorm');
    gameContainer.classList.add(gameState.weather);
    
    // Удаление старых эффектов
    const oldEffects = document.querySelectorAll('.weather-particle-effect');
    oldEffects.forEach(effect => effect.remove());
    
    // Добавление новых эффектов
    if (gameState.weather !== 'clear') {
        const weatherEffect = document.createElement('div');
        weatherEffect.className = `weather-particle-effect ${gameState.weather}-effect`;
        document.getElementById('weather-effects').appendChild(weatherEffect);
    }
}

// Обновление эффектов сезона
function updateSeasonEffects() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('spring', 'summer', 'autumn', 'winter');
    gameContainer.classList.add(gameState.season);
    
    // Удаление старых эффектов
    const oldEffects = document.querySelectorAll('.season-effect');
    oldEffects.forEach(effect => effect.remove());
    
    // Добавление новых эффектов
    const seasonEffect = document.createElement('div');
    seasonEffect.className = 'season-effect';
    document.getElementById('season-indicator').appendChild(seasonEffect);
    
    // Уведомление о смене сезона
    let seasonName;
    switch (gameState.season) {
        case 'spring': seasonName = 'Весна'; break;
        case 'summer': seasonName = 'Лето'; break;
        case 'autumn': seasonName = 'Осень'; break;
        case 'winter': seasonName = 'Зима'; break;
    }
    showNotification(`Смена сезона`, `Наступила ${seasonName.toLowerCase()}!`, '#4fc3f7');
}

// Показать критический удар
function showCriticalHit() {
    const criticalElement = document.getElementById('critical-hit');
    criticalElement.style.opacity = '1';
    criticalElement.style.animation = 'none';
    void criticalElement.offsetWidth; // Trigger reflow
    criticalElement.style.animation = 'criticalAnimation 1.5s ease-out';
    
    // Воспроизведение звука
    playCriticalSound();
}

// Анимация добычи
function animateMining() {
    const mineAnimation = document.getElementById('mine-animation');
    mineAnimation.style.transform = 'scale(0.95)';
    mineAnimation.style.transition = 'transform 0.1s';
    
    setTimeout(() => {
        mineAnimation.style.transform = 'scale(1)';
    }, 100);
}

// Показать уведомление
function showNotification(title, message, color = '#4fc3f7') {
    const notificationCenter = document.getElementById('notification-center');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.borderLeftColor = color;
    
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    notificationCenter.insertBefore(notification, notificationCenter.firstChild);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Воспроизведение звуков
function playMineSound(isCritical) {
    const sound = document.getElementById(isCritical ? 'critical-sound' : 'mine-sound');
    sound.currentTime = 0;
    sound.play();
}

function playCriticalSound() {
    const sound = document.getElementById('critical-sound');
    sound.currentTime = 0;
    sound.play();
}

function playBuySound() {
    const sound = document.getElementById('buy-sound');
    sound.currentTime = 0;
    sound.play();
}

// Форматирование чисел
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

// Сохранение игры
function saveGame() {
    localStorage.setItem('cosmicMinerSave', JSON.stringify(gameState));
    showNotification('Игра сохранена', 'Ваш прогресс был автоматически сохранен.', '#4caf50');
}

// Загрузка игры
function loadGame() {
    const save = localStorage.getItem('cosmicMinerSave');
    if (save) {
        const parsed = JSON.parse(save);
        Object.assign(gameState, parsed);
        showNotification('Игра загружена', 'Ваш прогресс был успешно загружен.', '#4caf50');
    }
}

// Запуск игры при загрузке страницы
window.onload = initGame;
