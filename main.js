// main.js - Women's College Basketball Props Table System
// 2 tables: Matchups, Game Odds
// No expandable rows, no prop odds table

import { injectStyles } from './styles/tableStyles.js';
import { WCBBMatchupsTable } from './tables/wcbbMatchups.js';
import { WCBBGameOddsTable } from './tables/wcbbGameOdds.js';
import { TabManager } from './components/tabManager.js';

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded - initializing women's college basketball table system");
    
    // Inject styles first
    injectStyles();
    
    // Find the existing wcbb-table element
    const existingTable = document.getElementById('wcbb-table');
    if (!existingTable) {
        console.log("No wcbb-table element found - cannot proceed");
        return;
    }

    console.log("Found wcbb-table element, creating structure...");

    try {
        createTableStructure(existingTable);
        
        const tableInstances = {
            table0: new WCBBMatchupsTable("#matchups-table"),
            table1: new WCBBGameOddsTable("#game-odds-table")
        };
        
        const tabManager = new TabManager(tableInstances);
        window.tabManager = tabManager;
        window.wcbbTables = tableInstances;
        
        console.log("Women's college basketball table system initialized successfully!");
        
    } catch (error) {
        console.error("Error initializing WCBB table system:", error);
    }
});

function createTableStructure(existingTable) {
    // Main wrapper
    const tabWrapper = document.createElement('div');
    tabWrapper.className = 'table-wrapper';
    tabWrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; width: 100%; margin: 0 auto;';
    
    // Tabs container with 2 buttons
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    tabsContainer.innerHTML = `
        <div class="tab-buttons">
            <button class="tab-button active" data-tab="table0">Matchups</button>
            <button class="tab-button" data-tab="table1">Game Odds</button>
        </div>
    `;
    
    // Tables container
    const tablesContainer = document.createElement('div');
    tablesContainer.className = 'tables-container';
    tablesContainer.style.cssText = 'width: 100%; position: relative;';
    
    // Table 0 - Matchups (active by default)
    const matchupsElement = document.createElement('div');
    matchupsElement.id = 'matchups-table';
    const table0Container = document.createElement('div');
    table0Container.className = 'table-container active-table';
    table0Container.id = 'table0-container';
    table0Container.style.cssText = 'width: 100%; display: block;';
    table0Container.appendChild(matchupsElement);
    tablesContainer.appendChild(table0Container);
  
    // Table 1 - Game Odds (inactive)
    const gameOddsElement = document.createElement('div');
    gameOddsElement.id = 'game-odds-table';
    const table1Container = document.createElement('div');
    table1Container.className = 'table-container inactive-table';
    table1Container.id = 'table1-container';
    table1Container.style.cssText = 'width: 100%; display: none;';
    table1Container.appendChild(gameOddsElement);
    tablesContainer.appendChild(table1Container);
    
    // Assemble
    tabWrapper.appendChild(tabsContainer);
    tabWrapper.appendChild(tablesContainer);
    
    // Insert into DOM
    if (existingTable.parentElement) {
        existingTable.parentElement.insertBefore(tabWrapper, existingTable);
        existingTable.style.display = 'none';
    } else {
        document.body.appendChild(tabWrapper);
    }
    
    console.log("Table structure created (2 tables)");
}
