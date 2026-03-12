/**
 * XML WebUI Editor
 * Prosty i intuicyjny edytor plików XML
 * 
 * @author Senior Software Engineer
 * @version 1.0
 */

// ===== Stan aplikacji =====
const AppState = {
    xmlDocument: null,
    originalFileName: '',
    selectedNode: null,
    nodeMap: new Map() // Mapowanie uid -> węzeł XML
};

// ===== Inicjalizacja aplikacji =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Inicjalizuje aplikację i nasłuchiwacze zdarzeń
 */
function initializeApp() {
    console.log('=== initializeApp called ===');
    const fileInput = document.getElementById('file-input');
    const uploadArea = document.getElementById('upload-area');
    const uploadBtn = document.getElementById('upload-btn');
    
    console.log('fileInput element:', fileInput);
    console.log('uploadArea element:', uploadArea);
    console.log('uploadBtn element:', uploadBtn);

    if (!fileInput) {
        console.error('FILE INPUT NOT FOUND!');
        return;
    }
    
    if (!uploadArea) {
        console.error('UPLOAD AREA NOT FOUND!');
        return;
    }
    
    if (!uploadBtn) {
        console.error('UPLOAD BUTTON NOT FOUND!');
        return;
    }

    // Obsługa kliknięcia przycisku
    console.log('Adding click event listener to uploadBtn');
    uploadBtn.addEventListener('click', () => {
        console.log('Upload button clicked!');
        fileInput.click();
    });

    // Obsługa wyboru pliku
    console.log('Adding change event listener to fileInput');
    fileInput.addEventListener('change', handleFileSelect);

    // Obsługa drag & drop
    console.log('Adding drag & drop event listeners');
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    console.log('XML WebUI Editor initialized successfully');
}

// ===== Obsługa plików =====

/**
 * Obsługuje zdarzenie przeciągnięcia pliku nad obszarem uploadu
 */
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

/**
 * Obsługuje zdarzenie opuszczenia obszaru uploadu
 */
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Obsługuje zdarzenie upuszczenia pliku
 */
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (isValidXMLFile(file)) {
            readXMLFile(file);
        } else {
            showMessage('Proszę wybrać plik XML (.xml)', 'error');
        }
    }
}

/**
 * Obsługuje wybór pliku przez input
 */
function handleFileSelect(e) {
    console.log('handleFileSelect called', e);
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file && isValidXMLFile(file)) {
        console.log('File is valid XML, reading...');
        readXMLFile(file);
    } else {
        console.log('Invalid file');
        showMessage('Proszę wybrać prawidłowy plik XML', 'error');
    }
}

/**
 * Sprawdza czy plik jest prawidłowym plikiem XML
 */
function isValidXMLFile(file) {
    return file && file.name.toLowerCase().endsWith('.xml');
}

/**
 * Odczytuje zawartość pliku XML
 */
function readXMLFile(file) {
    console.log('readXMLFile called with:', file);
    AppState.originalFileName = file.name;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        console.log('File loaded, parsing...');
        try {
            const xmlText = e.target.result;
            console.log('XML text length:', xmlText.length);
            parseAndDisplayXML(xmlText);
            showMessage(`Plik "${file.name}" został wczytany pomyślnie`, 'success');
        } catch (error) {
            console.error('Error reading XML:', error);
            showMessage('Błąd wczytywania pliku XML: ' + error.message, 'error');
        }
    };
    
    reader.onerror = () => {
        console.error('FileReader error');
        showMessage('Błąd odczytu pliku', 'error');
    };
    
    console.log('Starting to read file...');
    reader.readAsText(file);
}

// ===== Parsowanie i wyświetlanie XML =====

/**
 * Parsuje XML i wyświetla w edytorze
 */
function parseAndDisplayXML(xmlText) {
    console.log('parseAndDisplayXML called');
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        console.log('XML parsed, checking for errors...');
        
        // Sprawdź czy wystąpiły błędy parsowania
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            console.error('Parser error found:', parserError);
            throw new Error('Nieprawidłowy format XML');
        }
        
        console.log('No parser errors, saving to AppState');
        AppState.xmlDocument = xmlDoc;
        AppState.nodeMap.clear();
        
        console.log('Switching to editor section');
        // Pokaż sekcję edytora
        document.getElementById('upload-section').style.display = 'none';
        document.getElementById('editor-section').style.display = 'block';
        
        console.log('Updating file info');
        // Wyświetl nawę pliku
        document.getElementById('file-name-display').textContent = AppState.originalFileName;
        
        console.log('Building preview');
        // Zbuduj podgląd formularza
        buildPreview();
        console.log('Preview built successfully');
        
    } catch (error) {
        console.error('Error parsing XML:', error);
        showMessage('Błąd parsowania XML: ' + error.message, 'error');
    }
}

/**
 * Buduje podgląd formularza XML
 */
function buildPreview() {
    console.log('buildPreview called');
    const treeView = document.getElementById('tree-view');
    console.log('tree-view element:', treeView);
    treeView.innerHTML = '';
    
    const rootElement = AppState.xmlDocument.documentElement;
    console.log('Root element:', rootElement);
    
    // Przejdź przez wszystkie elementy i wyświetl je jako formularz
    processElementForPreview(rootElement, treeView);
    console.log('Preview built');
}

/**
 * Przetwarza element XML i tworzy podgląd formularza
 */
function processElementForPreview(element, container, path = '') {
    const currentPath = path ? `${path} > ${element.tagName}` : element.tagName;
    
    // Jeśli element ma dzieci, sprawdź czy są to elementy czy tekst
    const children = Array.from(element.children);
    const textContent = getNodeTextContent(element);
    
    if (children.length === 0 && textContent) {
        // Liść z wartością - wyświetl jako pole formularza
        createPreviewField(element, container, currentPath);
    } else if (children.length > 0) {
        // Element z dziećmi - sprawdź czy to sekcja czy pojedyncze pole
        const firstChild = children[0];
        const allChildrenSameTag = children.every(child => child.tagName === firstChild.tagName);
        
        if (allChildrenSameTag && children.length > 1) {
            // Lista powtarzających się elementów - traktuj jako sekcję
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'preview-section';
            
            const sectionTitle = document.createElement('div');
            sectionTitle.className = 'preview-section-title';
            sectionTitle.textContent = formatLabel(element.tagName);
            sectionDiv.appendChild(sectionTitle);
            
            children.forEach((child, index) => {
                const itemTitle = document.createElement('div');
                itemTitle.className = 'preview-section-title';
                itemTitle.style.fontSize = '15px';
                itemTitle.style.marginTop = '16px';
                itemTitle.textContent = `${formatLabel(child.tagName)} ${index + 1}`;
                sectionDiv.appendChild(itemTitle);
                
                processElementForPreview(child, sectionDiv, currentPath);
            });
            
            container.appendChild(sectionDiv);
        } else {
            // Różne dzieci - przetwórz każde
            if (path) {
                // Dodaj tytuł sekcji
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'preview-section';
                
                const sectionTitle = document.createElement('div');
                sectionTitle.className = 'preview-section-title';
                sectionTitle.textContent = formatLabel(element.tagName);
                sectionDiv.appendChild(sectionTitle);
                
                children.forEach(child => {
                    processElementForPreview(child, sectionDiv, currentPath);
                });
                
                container.appendChild(sectionDiv);
            } else {
                // Element główny - przetwórz dzieci bez dodatkowego tytułu
                children.forEach(child => {
                    processElementForPreview(child, container, currentPath);
                });
            }
        }
    }
    
    // Jeśli element ma atrybuty, wyświetl je też
    if (element.attributes && element.attributes.length > 0) {
        Array.from(element.attributes).forEach(attr => {
            createPreviewFieldForAttribute(element, attr, container, currentPath);
        });
    }
}

/**
 * Tworzy pole podglądu dla elementu
 */
function createPreviewField(element, container, path) {
    const uid = generateUID();
    AppState.nodeMap.set(uid, element);
    
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'preview-field';
    fieldDiv.dataset.uid = uid;
    fieldDiv.onclick = () => selectNode(uid);
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'preview-label';
    labelDiv.textContent = formatLabel(element.tagName);
    fieldDiv.appendChild(labelDiv);
    
    const valueDiv = document.createElement('div');
    valueDiv.className = 'preview-value';
    const textContent = getNodeTextContent(element);
    
    if (textContent) {
        if (textContent.length > 200) {
            valueDiv.classList.add('preview-value-code');
        }
        valueDiv.textContent = textContent;
    } else {
        valueDiv.textContent = '(pusta wartość)';
        valueDiv.classList.add('empty');
    }
    
    fieldDiv.appendChild(valueDiv);
    container.appendChild(fieldDiv);
}

/**
 * Tworzy pole podglądu dla atrybutu
 */
function createPreviewFieldForAttribute(element, attr, container, path) {
    const uid = generateUID();
    AppState.nodeMap.set(uid, { element, attribute: attr.name });
    
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'preview-field';
    fieldDiv.dataset.uid = uid;
    fieldDiv.onclick = () => selectNode(uid);
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'preview-label';
    labelDiv.textContent = `${formatLabel(element.tagName)} > ${attr.name}`;
    fieldDiv.appendChild(labelDiv);
    
    const valueDiv = document.createElement('div');
    valueDiv.className = 'preview-value';
    valueDiv.textContent = attr.value || '(pusta wartość)';
    if (!attr.value) valueDiv.classList.add('empty');
    
    fieldDiv.appendChild(valueDiv);
    container.appendChild(fieldDiv);
}

/**
 * Formatuje etykietę (zamienia camelCase, snake_case na czytelny tekst)
 */
function formatLabel(text) {
    // Usuń znaki specjalne
    text = text.replace(/[_-]/g, ' ');
    
    // Zamień camelCase na spacje
    text = text.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Pierwsza litera wielka
    text = text.charAt(0).toUpperCase() + text.slice(1);
    
    return text;
}

/**
 * Buduje widok drzewa XML (stara funkcja - backup)
 */
function buildTreeView() {
    console.log('buildTreeView called');
    const treeView = document.getElementById('tree-view');
    console.log('tree-view element:', treeView);
    treeView.innerHTML = '';
    
    const rootElement = AppState.xmlDocument.documentElement;
    console.log('Root element:', rootElement);
    const treeNode = createTreeNode(rootElement, 0);
    console.log('Tree node created:', treeNode);
    treeView.appendChild(treeNode);
    console.log('Tree node appended to treeView');
}

/**
 * Tworzy pojedynczy węzeł drzewa
 */
function createTreeNode(xmlNode, level, uid = generateUID()) {
    // Zapisz mapowanie
    AppState.nodeMap.set(uid, xmlNode);
    
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'tree-node';
    nodeDiv.dataset.uid = uid;
    nodeDiv.style.paddingLeft = `${level * 12}px`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'tree-node-header';
    
    // Sprawdź czy węzeł ma dzieci
    const hasChildren = xmlNode.children && xmlNode.children.length > 0;
    
    // Toggle dla rozwijania/zwijania
    if (hasChildren) {
        const toggle = document.createElement('span');
        toggle.className = 'tree-toggle';
        toggle.textContent = '▼';
        toggle.onclick = (e) => {
            e.stopPropagation();
            toggleNode(nodeDiv);
        };
        headerDiv.appendChild(toggle);
    } else {
        const spacer = document.createElement('span');
        spacer.className = 'tree-toggle';
        spacer.textContent = '•';
        headerDiv.appendChild(spacer);
    }
    
    // Nazwa tagu
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tree-tag';
    tagSpan.textContent = `<${xmlNode.tagName}>`;
    headerDiv.appendChild(tagSpan);
    
    // Wartość tekstowa (jeśli istnieje)
    const textContent = getNodeTextContent(xmlNode);
    if (textContent) {
        const valueSpan = document.createElement('span');
        valueSpan.className = 'tree-value';
        valueSpan.textContent = textContent.length > 50 
            ? textContent.substring(0, 50) + '...' 
            : textContent;
        headerDiv.appendChild(valueSpan);
    }
    
    // Obsługa kliknięcia - wybór węzła do edycji
    headerDiv.onclick = () => selectNode(uid);
    
    nodeDiv.appendChild(headerDiv);
    
    // Dzieci
    if (hasChildren) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'tree-children';
        
        Array.from(xmlNode.children).forEach(child => {
            const childNode = createTreeNode(child, level + 1, generateUID());
            childrenDiv.appendChild(childNode);
        });
        
        nodeDiv.appendChild(childrenDiv);
    }
    
    return nodeDiv;
}

/**
 * Pobiera tekstową zawartość węzła (bez białych znaków)
 */
function getNodeTextContent(node) {
    let text = '';
    for (let child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            text += child.nodeValue;
        }
    }
    return text.trim();
}

/**
 * Rozwijanie/zwijanie węzła
 */
function toggleNode(nodeDiv) {
    const childrenDiv = nodeDiv.querySelector('.tree-children');
    const toggle = nodeDiv.querySelector('.tree-toggle');
    
    if (childrenDiv) {
        childrenDiv.classList.toggle('collapsed');
        toggle.textContent = childrenDiv.classList.contains('collapsed') ? '▶' : '▼';
    }
}

/**
 * Generuje unikalny identyfikator
 */
function generateUID() {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ===== Edycja węzłów =====

/**
 * Wybiera węzeł do edycji
 */
function selectNode(uid) {
    // Usuń poprzednie zaznaczenie
    const previousSelected = document.querySelector('.preview-field.selected, .tree-node.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Zaznacz nowy węzeł
    const nodeDiv = document.querySelector(`[data-uid="${uid}"]`);
    if (nodeDiv) {
        nodeDiv.classList.add('selected');
        
        // Przewiń do elementu jeśli jest poza widokiem
        nodeDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Zapisz wybrany węzeł
    const nodeData = AppState.nodeMap.get(uid);
    AppState.selectedNode = {
        uid: uid,
        xmlNode: nodeData.element || nodeData, // Obsługa zarówno elementów jak i atrybutów
        attribute: nodeData.attribute || null
    };
    
    // Pokaż panel edycji
    displayEditPanel();
}

/**
 * Wyświetla panel edycji dla wybranego węzła
 */
function displayEditPanel() {
    const editPanel = document.getElementById('edit-panel');
    const xmlNode = AppState.selectedNode.xmlNode;
    const attribute = AppState.selectedNode.attribute;
    
    if (!xmlNode) {
        editPanel.innerHTML = '<p class="placeholder-message">Kliknij na element po lewej stronie, aby go edytować</p>';
        return;
    }
    
    editPanel.innerHTML = '';
    
    const form = document.createElement('div');
    form.className = 'edit-form';
    
    // Jeśli wybrano atrybut, pokaż tylko edycję atrybutu
    if (attribute) {
        const header = document.createElement('h3');
        header.textContent = `Edycja atrybutu: ${attribute}`;
        form.appendChild(header);
        
        const attrValue = xmlNode.getAttribute(attribute) || '';
        const attrGroup = createFormGroup(
            'Wartość:',
            'input',
            attrValue,
            (value) => {
                xmlNode.setAttribute(attribute, value);
                showMessage('Atrybut zaktualizowany', 'success');
                buildPreview(); // Odśwież podgląd
            }
        );
        form.appendChild(attrGroup);
        
        editPanel.appendChild(form);
        return;
    }
    
    // Nagłówek
    const header = document.createElement('h3');
    header.textContent = `Edycja: <${xmlNode.tagName}>`;
    form.appendChild(header);
    
    // Edycja zawartości tekstowej
    const textContent = getNodeTextContent(xmlNode);
    if (textContent || xmlNode.children.length === 0) {
        const textGroup = createFormGroup(
            'Zawartość:',
            'textarea',
            textContent,
            (value) => {
                updateNodeTextContent(xmlNode, value);
                buildPreview(); // Odśwież podgląd
            }
        );
        form.appendChild(textGroup);
    }
    
    // Edycja atrybutów
    if (xmlNode.attributes && xmlNode.attributes.length > 0) {
        const attrsHeader = document.createElement('h4');
        attrsHeader.textContent = 'Atrybuty:';
        attrsHeader.style.marginTop = '20px';
        form.appendChild(attrsHeader);
        
        const attrList = document.createElement('div');
        attrList.className = 'attribute-list';
        
        Array.from(xmlNode.attributes).forEach(attr => {
            const attrItem = createAttributeItem(xmlNode, attr.name, attr.value);
            attrList.appendChild(attrItem);
        });
        
        form.appendChild(attrList);
        
        // Przycisk dodawania atrybutu
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add';
        addBtn.textContent = '+ Dodaj Atrybut';
        addBtn.onclick = () => addNewAttribute(xmlNode, attrList);
        form.appendChild(addBtn);
    }
    
    editPanel.appendChild(form);
}

/**
 * Tworzy grupę formularza
 */
function createFormGroup(labelText, inputType, value, onChangeCallback) {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = labelText;
    group.appendChild(label);
    
    let input;
    if (inputType === 'textarea') {
        input = document.createElement('textarea');
        input.value = value || '';
    } else {
        input = document.createElement('input');
        input.type = inputType;
        input.value = value || '';
    }
    
    input.addEventListener('input', (e) => {
        onChangeCallback(e.target.value);
        showMessage('Zmiany zapisane', 'success');
    });
    
    group.appendChild(input);
    return group;
}

/**
 * Tworzy element atrybutu
 */
function createAttributeItem(xmlNode, attrName, attrValue) {
    const item = document.createElement('div');
    item.className = 'attribute-item';
    
    // Nazwa atrybutu
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = attrName;
    nameInput.placeholder = 'Nazwa';
    nameInput.addEventListener('input', (e) => {
        updateAttributeName(xmlNode, attrName, e.target.value);
    });
    
    // Wartość atrybutu
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = attrValue;
    valueInput.placeholder = 'Wartość';
    valueInput.addEventListener('input', (e) => {
        updateAttributeValue(xmlNode, attrName, e.target.value);
    });
    
    // Przycisk usunięcia
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.textContent = '✕';
    removeBtn.onclick = () => {
        xmlNode.removeAttribute(attrName);
        item.remove();
        buildPreview();
        showMessage('Atrybut usunięty', 'success');
    };
    
    item.appendChild(nameInput);
    item.appendChild(valueInput);
    item.appendChild(removeBtn);
    
    return item;
}

/**
 * Dodaje nowy atrybut
 */
function addNewAttribute(xmlNode, attrList) {
    const newAttrName = `nowy_atrybut_${Date.now()}`;
    xmlNode.setAttribute(newAttrName, '');
    
    const attrItem = createAttributeItem(xmlNode, newAttrName, '');
    attrList.appendChild(attrItem);
    
    buildPreview();
    showMessage('Nowy atrybut dodany', 'success');
}

/**
 * Aktualizuje zawartość tekstową węzła
 */
function updateNodeTextContent(xmlNode, newValue) {
    // Usuń wszystkie węzły tekstowe
    for (let i = xmlNode.childNodes.length - 1; i >= 0; i--) {
        if (xmlNode.childNodes[i].nodeType === Node.TEXT_NODE) {
            xmlNode.removeChild(xmlNode.childNodes[i]);
        }
    }
    
    // Dodaj nowy węzeł tekstowy
    if (newValue) {
        const textNode = AppState.xmlDocument.createTextNode(newValue);
        xmlNode.appendChild(textNode);
    }
    
    buildPreview();
}

/**
 * Aktualizuje nazwę atrybutu
 */
function updateAttributeName(xmlNode, oldName, newName) {
    if (oldName !== newName && newName) {
        const value = xmlNode.getAttribute(oldName);
        xmlNode.removeAttribute(oldName);
        xmlNode.setAttribute(newName, value);
        buildPreview();
        displayEditPanel();
        showMessage('Nazwa atrybutu zmieniona', 'success');
    }
}

/**
 * Aktualizuje wartość atrybutu
 */
function updateAttributeValue(xmlNode, attrName, newValue) {
    xmlNode.setAttribute(attrName, newValue);
    buildPreview();
    showMessage('Wartość atrybutu zmieniona', 'success');
}

// ===== Pobieranie pliku =====

/**
 * Pobiera zmodyfikowany plik XML
 */
function downloadXML() {
    try {
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(AppState.xmlDocument);
        
        // Formatuj XML (dodaj wcięcia)
        const formattedXML = formatXML(xmlString);
        
        // Utwórz blob i pobierz
        const blob = new Blob([formattedXML], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = AppState.originalFileName || 'edited.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        showMessage('Plik został pobrany pomyślnie', 'success');
    } catch (error) {
        console.error('Error downloading XML:', error);
        showMessage('Błąd pobierania pliku: ' + error.message, 'error');
    }
}

/**
 * Formatuje XML z wcięciami
 */
function formatXML(xml) {
    const PADDING = '  '; // 2 spacje
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;

    xml = xml.replace(reg, '$1\n$2$3');

    xml.split('\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        formatted += PADDING.repeat(pad) + node + '\n';
        pad += indent;
    });

    return formatted.trim();
}

// ===== Reset aplikacji =====

/**
 * Resetuje edytor do stanu początkowego
 */
function resetEditor() {
    AppState.xmlDocument = null;
    AppState.originalFileName = '';
    AppState.selectedNode = null;
    AppState.nodeMap.clear();
    
    document.getElementById('upload-section').style.display = 'block';
    document.getElementById('editor-section').style.display = 'none';
    document.getElementById('file-name-display').textContent = '';
    document.getElementById('file-input').value = '';
    
    showMessage('Edytor został zresetowany', 'info');
}

// ===== Komunikaty =====

/**
 * Wyświetla komunikat dla użytkownika
 */
function showMessage(text, type = 'info') {
    const container = document.getElementById('message-container');
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    container.appendChild(message);
    
    // Automatyczne usunięcie po 3 sekundach
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Dodaj animację do CSS (jeśli jeszcze nie ma)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
